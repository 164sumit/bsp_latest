"use client"
import React, { useState } from 'react';
import { Parser } from 'pickleparser'; // Assuming pickleparser is a valid TypeScript module
import { Button } from './ui/button';
import { addRegionsToDatabase } from '@/actions/region.action';
import { addsensortoregions } from '@/actions/sensor.action';

// interface PickleData {
//   // Define the structure of your unpickled data here
//   // This will help with type safety and code completion
// }

export const PickleToJsonConverter=()=> {
  const [json, setJson] = useState(null);
  const prepareSensorData = (data: any[]) => {
    return data.map((sensor) => ({
      Sensor_ID: sensor.Sensor_ID.slice(1, -1), // Extract sensor ID (remove brackets)
      Tagnames: sensor.Tagnames,
      weight: 1, // Assuming weight is always 1, adjust if needed
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result instanceof ArrayBuffer) {
          const buffer = new Uint8Array(e.target.result);
          const parser = new Parser();
          try {
            const result:any = parser.parse(buffer);
            setJson(result);
          } catch (error) {
            console.error('Error parsing pickle data:', error);
            // Handle parsing errors gracefully (e.g., display an error message)
          }
        } else {
          console.error('Unexpected file content type');
          // Handle unexpected file content type (e.g., display an error message)
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".pickle" />
      <Button onClick={async()=>{
            console.log("Add sensor regions button clicked")
            if(json){

              await addsensortoregions(json)
            }
        }}>add sensorregion</Button>
      <Button onClick={async()=>{
            console.log("Add all region button clicked")
            await addRegionsToDatabase(json)
            // await Addregion()
        }}>add all region</Button>
      {json && (
        <div>
          <h3>Converted JSON:</h3>
          <pre>{JSON.stringify(json, null, 2)}</pre>
        </div>
      )}
      
    </div>
  );
}

// export default PickleToJsonConverter;
