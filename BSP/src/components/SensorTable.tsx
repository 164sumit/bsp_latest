// Import necessary hooks and components from React and Next.js
"use client"
import { sensorDataArray1 } from '@/constants/temp';
import { useState, useEffect } from 'react';

// Define the SensorData type
interface SensorData {
    result: string;
    table: number;
    start: string;
    stop: string;
    time: string;
    value: number;
    field: string;
    measurement: string;
    sensor_name: string;
}

// Example data array
const sensorDataArray: SensorData[] = [
    { result: "_result", table: 0, start: "2023-11-07T11:58:16Z", stop: "2023-11-07T14:58:16Z", time: "2023-11-07T14:58:22.772Z", value: 1, field: "sensor-reading", measurement: "CVAH_11_anomaly_score", sensor_name: "predicted_cobble" },
    { result: "_result", table: 1, start: "2023-11-08T09:10:00Z", stop: "2023-11-08T10:30:00Z", time: "2023-11-08T10:00:00.000Z", value: 0, field: "temperature", measurement: "HVAC_02_temp", sensor_name: "HVAC_system" },
    { result: "_result", table: 2, start: "2023-11-09T08:15:24Z", stop: "2023-11-09T12:15:24Z", time: "2023-11-09T11:15:24.345Z", value: 1, field: "humidity", measurement: "Room_11_humidity", sensor_name: "environment_sensor" },
    // Add more entries as needed
];

// Define the component
const SensorTable = () => {
    // State to hold filtered data
    const [filteredData, setFilteredData] = useState<SensorData[]>([]);

    useEffect(() => {
        // Filter the data to show only entries with value equal to 1
        const dataWithOne = sensorDataArray1.filter(sensor => sensor.value === 1);
        setFilteredData(dataWithOne);
    }, []);

    return (
        <div>
            <h1>Sensor Data Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>Sensor Name</th>
                        <th>Measurement</th>
                        <th>Start Time</th>
                        <th>Field</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((sensor, index) => (
                        <tr key={index}>
                            <td>{sensor.sensor_name}</td>
                            <td>{sensor.measurement}</td>
                            <td>{sensor.start}</td>
                            <td>{sensor.field}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SensorTable;