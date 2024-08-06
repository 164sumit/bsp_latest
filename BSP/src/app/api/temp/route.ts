
import { Sensor } from "@/lib/models/sensor.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  
  
    
  return NextResponse.json({success:true}, { status: 400 })
 
  
}
