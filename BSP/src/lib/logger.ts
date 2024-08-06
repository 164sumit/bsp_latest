import winston from 'winston';
// import  'winston-mongodb';
import { MongoDB } from 'winston-mongodb';
 

// Custom format to include owner field in each log entry
const addOwnerFormat = winston.format((info, opts) => {
  if (!info.metadata) {
    info.metadata = {};
  }
  info.metadata.owner = info.metadata.owner || 'default-owner'; // Set owner if not present
  return info;
})();

const logger = winston.createLogger({
  level: 'info', // Set your desired log level (e.g., 'info', 'debug', etc.)
  format: winston.format.combine(
    winston.format.timestamp(), // Add a timestamp to each log entry
    addOwnerFormat, // Add the custom owner format
    winston.format.json()
  ),
  defaultMeta: {
    metadata: {
      owner: 'default-owner', // Set your default owner value here
    }
  },
  transports: [
    new winston.transports.Console(), // Log to console (optional)
    new MongoDB({
      db: process.env.MONGODB_URI!, // MongoDB connection URL
      collection: 'logs', // Collection name
      dbName: 'nextAuth',
      options: { useUnifiedTopology: true }, // MongoDB options
    }),
    new winston.transports.File({ filename: 'combined.log' }), // Log to file
  ],
});

export { logger };
