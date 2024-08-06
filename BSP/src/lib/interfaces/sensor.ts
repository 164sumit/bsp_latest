
import mongoose from "mongoose";


export interface ISensor extends Document {
    Sensor_ID: string; // Unique identifier for the sensor
    Tagname: string; // Array of tags associated with the sensor
}

export interface IRegion extends Document {
    regionName: string; // Name of the region (e.g., "Entrance", "Central", "Exit")
}

export interface ISensorRegionWeight extends Document {
    regionName: string;
    weight: number;
    workingStatus: boolean;
    Sensor_ID: string;
  }
