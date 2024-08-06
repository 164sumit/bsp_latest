

import mongoose, { Document, Schema } from 'mongoose';
import { IRegion } from '../interfaces/sensor';




// Create the Region schema
const regionSchema = new Schema<IRegion>({
    regionName: { type: String, required: true, unique: true }, // Make regionName unique for efficient lookups
  });


export const Region =  mongoose.models.Region ||  mongoose.model('Region', regionSchema);
