"use client";
import { sensorDataArray } from "@/constants/temp";
import React, { useState } from "react";

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

const SensorDataTable: React.FC = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: {
      value: string;
      sensor: string;
    };
  }>({});
  //when sensor and region both came then make them as key for save the selectedoptions properly

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
    // setSelectedOptions({})
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
    // setSelectedOptions({})
  };

  const handleOptionChange = (index: number, value: string, sensor: string) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [index]: {
        value,
        sensor,
      },
    }));
  };

  const handleSave = (index: number) => {
    // Perform save operation for the selected option at the given index
    console.log(
      `Saving option ${selectedOptions[index]} for sensor at index ${index}`
    );
  };

  const filteredSensorData = sensorDataArray.filter((data) => {
    if (startTime && endTime) {
      return (
        data.value === 1 && data.start >= startTime && data.stop <= endTime
      );
    } else if (startTime) {
      return data.value === 1 && data.start >= startTime;
    } else if (endTime) {
      return data.value === 1 && data.stop <= endTime;
    } else {
      return data.value === 1;
    }
  });

  return (
    <div className="h-full  w-full   p-4 border-solid border-2 border-dc3  rounded-md">
      <h2 className="text-2xl font-bold mb-4">Sensor Data Table</h2>
      <div className="flex flex-row content-center place-content-center place-items-center gap-20 ">
        <div className="mb-4">
          <label htmlFor="startTime" className="block mb-2">
            Start Time:
          </label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={handleStartTimeChange}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endTime" className="block mb-2">
            End Time:
          </label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={handleEndTimeChange}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border-2  border-dc3 px-4 py-2">Sr. No.</th>
            <th className="border-2  border-dc3 px-4 py-2">Sensor Name</th>
            <th className="border-2  border-dc3 px-4 py-2">Measurement</th>
            <th className="border-2  border-dc3 px-4 py-2">Start Time</th>
            <th className="border-2  border-dc3 px-4 py-2">Field</th>
            <th className="border-2  border-dc3 px-4 py-2">Option</th>
            <th className="border-2  border-dc3 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredSensorData.map((data, index) => (
            <tr key={index} className="">
              <td className="border-2  border-dc3  px-4 py-2">{index + 1}</td>
              <td className="border-2 border-dc3 px-4 py-2">
                {data.sensor_name}
              </td>
              <td className="border-2 border-dc3 px-4 py-2">
                {data.measurement}
              </td>
              <td className="border-2 border-dc3 px-4 py-2">{data.start}</td>
              <td className="border-2 border-dc3 px-4 py-2">{data.field}</td>
              <td className="border-2 border-dc3 px-4 py-2">
                <select
                  value={
                    (selectedOptions[index]?.sensor === data.sensor_name &&
                      selectedOptions[index].value) ||
                    ""
                  }
                  onChange={(e) =>
                    handleOptionChange(index, e.target.value, data.sensor_name)
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">Select</option>
                  <option value="right">Right</option>
                  <option value="wrong">Wrong</option>
                </select>
              </td>
              <td className="border-2  border-dc3 px-4 py-2">
                {selectedOptions[index]?.sensor === data.sensor_name &&
                  selectedOptions[index]?.value !== "" && (
                    <button
                      onClick={() => handleSave(index)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorDataTable;
