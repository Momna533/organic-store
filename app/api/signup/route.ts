import bcrypt  from 'bcryptjs';
import { signupModel } from "@/models/signupModel";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server"; 
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
        console.error("Error fetching users:", error); 
        return NextResponse.json({ message: "Server error while fetching users" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { name, email, password }: SignupRequest = await req.json();
        console.log(email,password);


        const existingUser = await signupModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Email already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await signupModel.create({ name, email, password: hashedPassword });
        return NextResponse.json({ newUser }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error); 
        return NextResponse.json({ message: "Server error while creating user" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();
        const { id }: DeleteRequest = await req.json();

        const user = await signupModel.findByIdAndDelete(id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully", user }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error); 
        return NextResponse.json({ message: "Server error while deleting user" }, { status: 500 });
    }
}
