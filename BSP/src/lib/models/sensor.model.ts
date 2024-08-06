// sensor.ts

import mongoose, { Document, Schema } from 'mongoose';
import { ISensor } from '../interfaces/sensor';

// Define the Sensor interface


// Create the Sensor schema
const sensorSchema = new Schema<ISensor>({
  Sensor_ID: { type: String, required: true, unique: true },
  Tagname: { type: String, required: true },
});

// Create and export the Sensor model
export const Sensor = mongoose.models.Sensor || mongoose.model('Sensor', sensorSchema);