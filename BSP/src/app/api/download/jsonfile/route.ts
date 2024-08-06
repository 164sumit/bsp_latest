
import { Sensor } from "@/lib/models/sensor.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await connectToDB()
    const sensors =  await Sensor.find({ regions: { $exists: true, $ne: [] } }, { Sensor_ID: 1, weight: 1,_id:0 ,Tagnames:1});
    interface SensorData {
      ["sensor"]: string;
      "weight": number;
    }
    const sensorObject =[]
  for (const sensor of sensors) {
    sensorObject.push({
      ["sensor"]: `${sensor.Sensor_ID}_${sensor.Tagnames}`,
      ["weight"]: sensor.weight
    }) 
    console.log({
      ["sensor"]: `${sensor.Sensor_ID}_${sensor.Tagnames}`,
      ["weight"]: sensor.weight
    });
    
  }

  console.log(sensorObject);
  
    
  return NextResponse.json({success:true,sensorObject}, { status: 200 })
 
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
