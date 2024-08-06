import mongoose, { Schema, Document } from "mongoose";
import { ISensorRegionWeight } from "../interfaces/sensor";
const sensorRegionWeightSchema = new Schema<ISensorRegionWeight>({
    regionName: { type: String, required: true },
    weight: { type: Number, required: true, default: 1 },
    workingStatus: { type: Boolean, required: true, default: true },
    Sensor_ID: { type: String, required: true },
  });
  
  // Virtual populate to link SensorRegionWeight to Sensor
  sensorRegionWeightSchema.virtual('sensor', {
    ref: 'Sensor',
    localField: 'Sensor_ID',
    foreignField: 'Sensor_ID',
    justOne: true
  });
  
  // Ensure virtual fields are included in toJSON and toObject
  sensorRegionWeightSchema.set('toJSON', { virtuals: true });
  sensorRegionWeightSchema.set('toObject', { virtuals: true });
// Create and export the SensorRegionWeight model
export const SensorRegionWeight = mongoose.models.SensorRegionWeight || mongoose.model<ISensorRegionWeight>('SensorRegionWeight', sensorRegionWeightSchema);
