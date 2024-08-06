// pages/api/logs.ts
import fs from 'fs';
// import * as fs from 'fs/promises';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export  async function GET(req: Request,) {
  try {
    const logFilePath = path.join(process.cwd(), 'combined.log');
    const logData = fs.readFileSync('combined.log');
    console.log(logData);
    
    // const logData = await fs.promises.readFile(logFilePath, 'utf-8');

    // Parse the log data if needed (e.g., split by lines, etc.)
    // For now, we'll return the entire log content as-is.
    
    return NextResponse.json({},{ status: 200 })
    // res.status(200).json({ logData });
  } catch (error) {
    console.error('Error reading log file:', error);
    // res.status(500).json({ error: 'Internal server error' });
    return NextResponse.json({error},{ status: 200 })
  }
}
