
import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    if(mongoose.connections&& mongoose.connections[0].readyState) return;
    const {connection}=await mongoose.connect(
        process.env.MONGODB_URI as string,
        {
            dbName:"nextAuth",
        }
        
    )
  

    console.log("connected to database");
  } catch (error) {
    console.log(error);
    
  }
};

export default connectToDB;
