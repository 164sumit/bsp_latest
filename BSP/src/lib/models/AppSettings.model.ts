import mongoose, { Document } from 'mongoose';
import { IAppSettings, ProfileType } from '../interfaces/IAppSettings';
// import { IAppSettings, ProfileType } from '../interfaces/IAppSettings';



// Create the schema
const AppSettingsSchema = new mongoose.Schema<IAppSettings>({
  currentProfile: {
    type: String,
    enum: ['10mm', '12mm', '16mm', '20mm', '40mm'] as ProfileType[],
    default: '10mm'
  }
});

// Create and export the model
const AppSettings = mongoose.models.AppSettings as mongoose.Model<IAppSettings> || 
  mongoose.model<IAppSettings>('AppSettings', AppSettingsSchema);

export default AppSettings;