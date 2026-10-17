import { createToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import type { RegisterInput } from "@/types/auth";


export async function POST(request: Request) {
    try {
        const body: RegisterInput = await request.json();

        const {name, email, password} = body;

        if(!email || !name || !password){
            return NextResponse.json({
                success: false,
                message: "All filelds are required",
            },
            {
                status: 400
            });
        }


        await connectDB();

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if(existingUser){
            return NextResponse.json({
                success: false,
                message: "User already exists"
            },
            {
                status: 400
            });
        }

        const hashedPassword = await hashPassword(password);
        
        const user = await User.create({
            name, 
            email: email.toLowerCase(),
            password: hashPassword,
            role: "user"
        })
        
        const token = createToken({
            userId: user._id.toString(),
            role: user.role,
        })

        const response = NextResponse.json({
            success: true,
            message: "User registered successfully",
            user:{
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: token
        },{
            status: 201
        })


        response.cookies.set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("REGISTER_ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}