import dbConnect from "@/lib/mongoose";
import { productsModel } from "@/models/productsModel";
import { NextResponse } from "next/server";

export async function GET (){
    try {
        await dbConnect();
        const products = await productsModel.find({});   
        console.log(products);    // Debugging purposes     
        return NextResponse.json({ products }, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error); 
        return NextResponse.json({ message: "Server error while fetching users" }, { status: 500 });
    }
}