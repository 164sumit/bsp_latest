import { Document } from "mongoose";

// Define the possible profile values
export type ProfileType = '10mm' | '12mm' | '16mm' | '20mm' | '40mm';

// Interface for the AppSettings document
export interface IAppSettings extends Document {
  currentProfile: ProfileType;
}