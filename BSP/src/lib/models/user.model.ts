import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        // Add validation for email format if needed
      },
      password: {
        type: String,
        required: true,
        // You might want to hash the password before saving it
      },
      userType: {
        type: String,
        enum: ['admin', 'poweruser', 'normal'],
        default: 'normal',
      },
  
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;
