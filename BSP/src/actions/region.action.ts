"use server";
import { Region } from "@/lib/models/region.model";
import { Sensor } from "@/lib/models/sensor.model";
import { SensorRegionWeight } from "@/lib/models/sensorRegionWeight.model";
import connectToDB from "@/lib/mongoose";
//get all regions list
export const getallregions = async () => {
  try {
    await connectToDB();
    const regions = await Region.find({}, { regionName: 1, _id: 0 });
    console.log(regions);
    return JSON.stringify(regions);
  } catch (error) {
    console.log(error);
    return null;
  }
};

//inital setup adding region into db
export const addRegionsToDatabase = async (data: any) => {
  try {
    // Connect to your MongoDB database
    await connectToDB();
    for (const regionName in data) {
      const newRegion = new Region({
        regionName,
      });
      await newRegion.save();

      console.log(`Added region: ${newRegion}`);
    }

    console.log("All regions added successfully!");
  } catch (error) {
    console.error(error);
  }
};
//get all regions for a sensor by sensor_id
export const getRegionsForSensorId = async (Sensor_ID: string) => {
  try {
    console.log(Sensor_ID);

    await connectToDB();
    const res = await SensorRegionWeight.find(
      { Sensor_ID }
    );
    console.log(res);
    return JSON.stringify(res);
  } catch (error) {
    console.log(error);
  }
};
// get all sensors of a region
export const getRegionsensors1 = async (regionName: string) => {
  try {
    await connectToDB();

    // Query SensorRegionWeight and populate the related Sensor's Tagname
    const results = await SensorRegionWeight.find({ regionName })
      .populate("sensor", "Tagname")
      .exec();

    return JSON.stringify(results);
  } catch (error) {
    console.log(error);
  }
};
export const getRegionsensors = async (regionName: string) => {
  try {
    await connectToDB();

    // Query SensorRegionWeight and populate the related Sensor's Tagname
    const results = await SensorRegionWeight.find({ regionName })
      .populate("sensor", "Tagname")
      .exec();
    console.log(results);

    const transformedResults = results
      .filter((result) => result.sensor !== null)
      .map((result) => ({
        Sensor_ID: result.Sensor_ID,
        Tagname: result.sensor?.Tagname,
        weight: result.weight,
      }));

    return JSON.stringify(transformedResults);
  } catch (error) {
    console.log(error);
  }
};
