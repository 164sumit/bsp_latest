
import { User } from "@/lib/models/user.model";
import connectToDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password,name,userType } = await request.json();

    const bcrypt = require("bcrypt");
    console.log(email,password,name,userType);
    

    const hashedPassword = await bcrypt.hash(password, 10);

    // const client = await clientPromise;
    // const db = client.db();
    await connectToDB()
    const doesEmailExist = await User.findOne({ email: email });

    if (doesEmailExist) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    const createAccount = User
      .create({ email: email, password: hashedPassword,name:name,userType });

    return NextResponse.json({ success: "Account created" }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
