import mongoose, { Document, Schema } from 'mongoose';

export interface ILog extends Document {
  timestamp: Date;
  level: string;
  message: string;
  meta: {
    owner: string;
  };
}

const LogSchema = new Schema({
  timestamp: { type: Date, required: true },
  level: { type: String, required: true },
  message: { type: String, required: true },
  meta: {
    owner: { type: String, required: true },
  },
});
export const Log =  mongoose.models.Log ||  mongoose.model('Log', LogSchema);



// export { Log, ILog };
