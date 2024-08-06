
'use server'
import { AuthError, CredentialsSignin } from "next-auth";

import { auth, signIn, signOut } from "@/auth";
import { User } from "@/lib/models/user.model";
import connectToDB from "@/lib/mongoose";
import { logger } from "@/lib/logger";

// import { signIn, signOut } from "@/auth";

export const signInWithGoogle = async () => {
    await signIn("google");
}

export const signinWithGitHub = async () => {
    await signIn("github");
}

export const signout = async () => {
    await signOut();
}

export const signInWithCreds = async (email: string, password: string, redirect: boolean = false) =>  {
    try {
        
       await signIn("credentials", {
            email,
            password,
        })
       
    } catch (error) {
      if(error instanceof AuthError){
        console.log(Date.now(),error.cause?.err?.message);
        
        return {error:error.cause?.err?.message}
        // switch(error.type){
        //   case "CredentialsSignin":
        //   default:
        //     return {error:"something went wrong"}
        // }
      }
      throw error
    }

}





interface User {
  name: string;
  email: string;
  password: string;
  userType: string;
}

export async function registerUser(formData:User): Promise<any> {
  const bcrypt = require("bcrypt");
  try {
    await connectToDB()
    console.log("register request->",formData);
    const user= await User.findOne({email:formData.email});
    if(user){
      return {
        success:false,
        message:"user already exist with this email"
      }
    }
    const hashedPassword = await bcrypt.hash(formData.password, 10);
    const newuser=new User({...formData,password:hashedPassword});
    await newuser.save();
    const session = await auth();
    const user1 = session?.user;
    logger.info(`New user: ${user.email} registration successfully`,{ metadata: { owner: user1?.email } })

    return {
      success:true,
      message:"user created successfuly"
    }
    
    
  } catch (error) {
    return{
      success:false,
      message:"something went wrong"
    }

  } 
}