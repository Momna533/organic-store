import { loginModel } from "@/models/loginModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server"; // Import this for the `req` parameter type
import dbConnect from '@/lib/mongoose'
import { signupModel } from "@/models/signupModel";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


interface loginRequest {
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    const {  email, password }: loginRequest = await req.json();

    try {
      await dbConnect();
      const signupUsers = await signupModel.find({});

      const existingUser = signupUsers.find(
        (user) => user.email === email && user.password === password
      );

    
        if (!existingUser) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }
        const token = jwt.sign({ userId: existingUser.id }, "secret_key", {
            expiresIn: "1h",
          });
      
  
        return NextResponse.json({ token }, { status: 201 });
    } catch (error) {
        console.error(error); // Added logging for better debugging
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

