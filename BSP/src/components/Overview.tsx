"use client"
import { sensorDataArray } from '@/constants/temp';
import React, { useState } from 'react';

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
    alarm: boolean;
}

const Overview: React.FC = () => {
    

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [showTrueAlarms, setShowTrueAlarms] = useState(false);

    const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartTime(e.target.value);
    };

    const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndTime(e.target.value);
    };

    const handleToggleTrueAlarms = () => {
        setShowTrueAlarms(prevState => !prevState);
    };

    const filteredSensorData = sensorDataArray.filter(data => {
        if (showTrueAlarms) {
            return (
                data.value === 1 &&
                data.alarm &&
                ((startTime && data.start >= startTime) || !startTime) &&
                ((endTime && data.stop <= endTime) || !endTime)
            );
        } else {
            return (
                data.value === 1 &&
                ((startTime && data.start >= startTime) || !startTime) &&
                ((endTime && data.stop <= endTime) || !endTime)
            );
        }
    });

    return (
        <div className="container  p-4">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
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
            <div className="mb-4">
                <button
                    onClick={handleToggleTrueAlarms}
                    className={`px-4 py-2 rounded ${
                        showTrueAlarms ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                    }`}
                >
                    {showTrueAlarms ? 'Show All Signals' : 'Show True Alarms'}
                </button>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border-2  border-dc3 px-4 py-2">Sr. No.</th>
                        <th className="border-2  border-dc3 px-4 py-2">Sensor Name</th>
                        <th className="border-2  border-dc3 px-4 py-2">Measurement</th>
                        <th className="border-2  border-dc3 px-4 py-2">Start Time</th>
                        <th className="border-2  border-dc3 px-4 py-2">End Time</th>
                        <th className="border-2  border-dc3 px-4 py-2">Field</th>
                        <th className="border-2  border-dc3 px-4 py-2">Alarm</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSensorData.map((data, index) => (
                        <tr
                            key={index}
                            className={`${
                                data.alarm ? 'bg-red-200' : 'bg-gray-100'
                            }`}
                        >
                            <td className="border-2  border-dc3  px-4 py-2">{index + 1}</td>
                            <td className="border-2  border-dc3  px-4 py-2">
                                {data.sensor_name}
                                {data.alarm && (
                                    <span className="text-red-500 ml-1">&#9733;</span>
                                )}
                            </td>
                            <td className="border-2  border-dc3  px-4 py-2">{data.measurement}</td>
                            <td className="border-2  border-dc3  px-4 py-2">{data.start}</td>
                            <td className="border-2  border-dc3  px-4 py-2">{data.stop}</td>
                            <td className="border-2  border-dc3  px-4 py-2">{data.field}</td>
                            <td className="border-2  border-dc3  px-4 py-2">
                                {data.alarm ? 'True' : 'False'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Overview;