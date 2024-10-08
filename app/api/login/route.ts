import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { signupModel } from "@/models/signupModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const { email, password }: LoginRequest = await req.json();
  try {
    await dbConnect();
    const existingUser = await signupModel.findOne({ email });
    if (
      !existingUser ||
      !(await bcrypt.compare(password, existingUser.password))
    ) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET || "default_secret"
      //   {
      //     expiresIn: "1h",
      //   }
    );
    console.log(token);

    const response = NextResponse.json({ token }, { status: 200 });
    response.cookies.set("token", token, { httpOnly: true, sameSite: "lax" });

    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
