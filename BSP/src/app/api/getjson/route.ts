// app/api/getjson/route.ts

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Log the received data
    console.log('Received data:', JSON.stringify(data, null, 2));

    // Save the data to a file
    const filePath = path.join(process.cwd(), 'public', 'regionMap.json');
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: 'Data received and saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}