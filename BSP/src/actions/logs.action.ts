"use server"
import { ILog, Log } from '@/lib/models/log.model';
import connectToDB from '@/lib/mongoose';
import fs from 'fs/promises';

export const getlogs = async () => {
    try {
        // Read the content of the combined.log file
        const logContent = await fs.readFile('combined.log', 'utf-8');
        
        // Split the log content by lines
        const logLines = logContent.split('\n').filter(line => line.trim() !== '');
        
        // Parse each line as JSON and create an array of log entries
        const logEntries = logLines.map(line => JSON.parse(line));
        
        console.log(logEntries);
        return logEntries;
    } catch (error) {
        console.error('Error reading log file:', error);
        throw new Error('Error reading log file');
    }
}
interface arguments{
    owner: string, startDate?: Date, endDate?: Date
}
export const  fetchLogs=async({owner, startDate, endDate}:arguments)=>{
    try {
      await connectToDB();
  
      // Create a query object
      const query: any = {};
  
      // Add owner to the query if it's not 'all'
      if (owner !== 'all') {
        query['metadata.owner'] = owner;
      }
  
      // Add date range to the query
      if (startDate && endDate) {
        query.timestamp = {
          $gte: startDate,
          $lt: endDate,
        };
      } else if (startDate) {
        query.timestamp = {
          $gte: startDate,
        };
      } else if (endDate) {
        query.timestamp = {
          $lt: endDate,
        };
      }
  
      // Fetch the logs
      const logs: ILog[] = await Log.find(query).exec();
      console.log(logs);
      
      return JSON.stringify(logs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } 
  }
