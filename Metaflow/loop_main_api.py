###################################################################################################################
####################### file to call the main loop.py file which contains metaflow code ###########################
#### this file reads data from the csv file and triggers a function call for each minute of data retrieved ########
############ also saves data for that minute in parquer format ###################################################
###################################################################################################################




from flask import Flask, request, jsonify
import pandas as pd
import subprocess
import time
import os
import argparse
import json
from flask_cors import CORS

# Set Metaflow environment variables
#os.environ["METAFLOW_SERVICE_URL"] = "http://localhost:8080"
#os.environ["METAFLOW_DEFAULT_METADATA"] = "service"
"""
# Read your data into a DataFrame (replace this with your actual data loading logic)
from datetime import datetime
d_parser = lambda x : datetime.strptime(x,"%d.%m.%Y %H:%M:%S.%f")
# Read your data into a DataFrame (replace this with your actual data loading logic)
df = pd.read_csv('/data2/naman/metaflow/00.24.56_01.24.56.txt', sep='\t', parse_dates=['Time'], date_parser=d_parser)
#df.set_index('Time', inplace=True)
print(df.head())
"""

app = Flask(__name__)
CORS(app)


def save_to_parquet(df, timestamp):
    date_str = timestamp.strftime("%Y-%m-%d")
    time_str = timestamp.strftime("%H:%M:%S")
    hour_str = timestamp.strftime("%H")
    minute_str = timestamp.strftime("%M")
    
    directory = os.path.join("iba_data", date_str, hour_str)
    if not os.path.exists(directory):
        os.makedirs(directory)
        
    file_name = f"{time_str}.parquet"
    file_path = os.path.join(directory, file_name)
    df.to_parquet(file_path)
    print(f"Parquet file created successfully at {file_path}")


# Function to call the Metaflow workflow for a batch of data
def call_workflow(file_path, profile):
    print("Calling subprocess...")
    try:
        profile_config = f"regions_info_{profile}.json"
        print("data path name: ", file_path)
        print("profile config file name: ", profile_config)
        time.sleep(20)
        subprocess.run(["python", "./loop.py", "run", "--data_path", file_path, "--config", profile_config], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Command failed with exit code: {e.returncode}")
    print("Subprocess completed.")




#sample payload for update sensor weights
""""
{
    "CVR_L1": [
        {"sensor": "[9.226]_Ghost Rolling", "weight": 13},
        {"sensor": "[12:44]_Master speed percentage", "weight": 23},
        {"sensor": "[1:17]_L1_PR1_ActSpeed", "weight": 15},
        // Add more sensors as needed
    ],
    "CVR_L2": [
        {"sensor": "[9.226]_Ghost Rolling", "weight": 13},
        {"sensor": "[12:44]_Master speed percentage", "weight": 23},
        // Add more sensors as needed
    ],
    // Add more regions as needed
}

"""""

# Endpoint to update sensor weights
@app.route('/api/update-sensor-weights', methods=['POST'])
def update_sensor_weights():

    with open('./sensor_data_weights.json', 'r') as f:
        sensor_data = json.load(f)

    data = request.json
    
    # Validate the incoming JSON structure
    if not isinstance(data, dict):
        return jsonify({'error': 'Invalid JSON format'}), 400
    
    # Iterate over each region and update sensor weights
    for region, sensors in data.items():
        if region not in sensor_data:
            return jsonify({'error': f'Region "{region}" not found in sensor data'}), 404
        
        for updated_sensor in sensors:
            sensor_name = updated_sensor.get('sensor')
            new_weight = updated_sensor.get('weight')

            # Find the sensor in the sensor_data and update its weight for the region
            sensor_found = False
            for sensor in sensor_data[region]:
                if sensor['sensor'] == sensor_name:
                    sensor['weight'] = new_weight
                    sensor_found = True
                    break
            
            if not sensor_found:
                return jsonify({'error': f'Sensor "{sensor_name}" not found in region "{region}"'}), 404

    # Save updated data back to JSON file
    with open('./sensor_data_weights.json', 'w') as f:
        json.dump(sensor_data, f, indent=4)

    return jsonify({'message': 'Sensor weights updated successfully'}), 200


#payload for remove sensor from one or multiple regions
"""
{
    "sensor": "[9.226]_Ghost Rolling",
    "regions": ["CVR_L1", "CVR_L2"]
}
"""

# Endpoint to remove sensor from multiple regions
@app.route('/api/remove-sensor', methods=['POST'])
def remove_sensor_from_regions():

    with open('./sensor_data_weights.json', 'r') as f:
        sensor_data = json.load(f)

    data = request.json
    print(data)
    
    # Validate the incoming JSON structure
    if not isinstance(data, dict):
        return jsonify({'error': 'Invalid JSON format'}), 400
    
    sensor_name = data.get('sensor')
    regions_to_remove = data.get('regions', [])

    if not sensor_name:
        return jsonify({'error': 'Sensor name is required'}), 400

    if not regions_to_remove:
        return jsonify({'error': 'At least one region must be specified'}), 400

    # Iterate over each region and remove the sensor if found
    for region in regions_to_remove:
        if region in sensor_data:
            # Find the sensor and remove it from the region
            updated_sensors = [sensor for sensor in sensor_data[region] if sensor['sensor'] != sensor_name]
            sensor_data[region] = updated_sensors

    # Save updated data back to JSON file
    with open('./sensor_data_weights.json', 'w') as f:
        json.dump(sensor_data, f, indent=4)

    return jsonify({'message': f'Sensor "{sensor_name}" removed from specified regions'}), 200


#payload for add signal in multiple regions
"""
{
    "signal": "[9.226]_Ghost Rolling",
    "regions": {
        "CVR_L1": 15,
        "CVR_L2": 18,
    }
}
"""
# Endpoint to add a signal to multiple regions with different weights
@app.route('/api/add-signal', methods=['POST'])
def add_signal_to_regions():

    with open('./sensor_data_weights.json', 'r') as f:
        sensor_data = json.load(f)

    data = request.json
    
    # Validate the incoming JSON structure
    if not isinstance(data, dict):
        return jsonify({'error': 'Invalid JSON format'}), 400
    
    signal_name = data.get('signal')
    regions_weights = data.get('regions', {})

    if not signal_name:
        return jsonify({'error': 'Signal name is required'}), 400

    if not regions_weights:
        return jsonify({'error': 'At least one region with weight must be specified'}), 400

    # Add the signal to each specified region with the given weight
    for region, weight in regions_weights.items():
        if region not in sensor_data:
            sensor_data[region] = []

        # Check if the signal already exists in the region, if not, add it
        signal_exists = any(signal['sensor'] == signal_name for signal in sensor_data[region])
        if not signal_exists:
            sensor_data[region].append({'sensor': signal_name, 'weight': weight})
        else:
            return jsonify({'error': f'Signal "{signal_name}" already exists in region "{region}"'}), 400

    # Save updated data back to JSON file
    with open('./sensor_data_weights.json', 'w') as f:
        json.dump(sensor_data, f, indent=4)

    return jsonify({'message': f'Signal "{signal_name}" added to specified regions with respective weights'}), 200



@app.route('/api/profile', methods=['POST'])
def run_metaflow():
    data = request.get_json()
    profile = data.get('profile')
    print(profile)
    if profile not in ['10mm', '12mm', '16mm', '20mm', '40mm']:
        return jsonify({'error': 'Invalid profile value'}), 400
    
    start_time = time.time()
    count = 0

    from datetime import datetime
    d_parser = lambda x : datetime.strptime(x,"%Y-%m-%d %H:%M:%S")
    df = pd.read_csv('./iba_data.txt', sep=',', parse_dates=['i_time'], date_parser=d_parser)
    
    
    tagnames_df = pd.read_excel("./Finalised_region_combined_tagnames.xlsx")
    mapping_dict = dict(zip(tagnames_df['Tagnames'], tagnames_df['Sensor_ID']))

    while True:
        # Fetch data from PostgreSQL
        batch_df = df[:60]
        batch_df.rename(columns={'i_time': 'Time'}, inplace=True)
        batch_df.drop(columns=['local_time'], inplace=True)
        batch_df.set_index('Time', inplace=True)
        batch_df.rename(columns=mapping_dict, inplace=True)
        batch_df['[9:17]'] = batch_df['[9:16]']
        batch_df.replace({'f': 0, 't': 1}, inplace=True)

        if 'index' in df.columns:
            batch_df.drop(['index'], axis=1, inplace=True)
        
        # If there is no new data, wait for some time before trying again
        if batch_df.empty:
            print("No new data found. Waiting for 1 minute...")
            time.sleep(60)
            count += 1
            if count == 2:
                break
            continue
        
        #print(batch_df)
        #print("In while loop...", df.head())
        timestamp = batch_df.index[0]
        save_to_parquet(batch_df, timestamp)

        # Write the minute data to a temporary CSV file
        file_path = 'temp_data.csv'
        batch_df.to_csv(file_path, index=True)

        # Call the workflow for the batch
        call_workflow(file_path, profile)

        df = df[60:]
        if len(df)<60:
            break

    end_time = time.time()
    total_time = end_time - start_time
    print(f"Total time taken: {total_time} seconds")
    return jsonify({'message': 'Metaflow script executed successfully'})

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)


#####################################################################################
### command to run the file: python3 loop_main.py --profile 16mm ####################
### command to run the file: python3 loop_main.py --profile 20mm ####################
### command to run the file: python3 loop_main.py --profile 12mm ####################
### command to run the file: python3 loop_main.py --profile 10mm ####################
#####################################################################################
