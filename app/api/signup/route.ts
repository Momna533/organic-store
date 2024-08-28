import { signupModel } from "@/models/signupModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server"; // Import this for the `req` parameter type
import dbConnect from '@/lib/mongoose'

interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

interface DeleteRequest {
    id: string;
}

export async function GET() {
    try {
      await dbConnect();
        const users = await signupModel.find({});
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error(error); // Added logging for better debugging
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { name, email, password }: SignupRequest = await req.json();

    try {
      await dbConnect();

        const existingUser = await signupModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        }
        const newUser = await signupModel.create({ name, email, password });
        newUser.save(); // Save is redundant here as `create` already saves the document
  
        return NextResponse.json({ newUser }, { status: 201 });
    } catch (error) {
        console.error(error); // Added logging for better debugging
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { id }: DeleteRequest = await req.json();
    try {
        const user = await signupModel.findByIdAndDelete(id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error(error); // Added logging for better debugging
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
