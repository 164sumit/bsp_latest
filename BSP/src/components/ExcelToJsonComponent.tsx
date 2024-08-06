// ExcelToJsonComponent.tsx
"use client"
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from './ui/button';
import { addSensorsToDatabase } from '@/actions/sensor.action';

const ExcelToJsonComponent: React.FC = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(json);
        console.log(json);
        
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const prepareSensorData = (data: any[]) => {
    return data.map((sensor) => ({
      Sensor_ID: sensor.Sensor_ID.slice(1, -1), // Extract sensor ID (remove brackets)
      Tagnames: sensor.Tagnames,
      weight: 1, // Assuming weight is always 1, adjust if needed
    }));
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <Button
        onClick={async () => {
          console.log("Add region button clicked", jsonData);

          // Prepare sensor data for database
          const sensorData = prepareSensorData(jsonData);

          await addSensorsToDatabase(sensorData);
        }}
      >
        add sensors to db
      </Button>
      {jsonData.length > 0 ? (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      ) : (
        <p>No file selected.</p>
      )}
    </div>
  );
};

export default ExcelToJsonComponent;
