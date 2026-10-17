import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import User from "@/models/User";


export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("auth_token")?.value;

        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Not authenticated",
                },
                { status: 401 }
            );
        }

        const payload = verifyToken(token);

        await connectDB();

        const user = await User.findById(payload.userId);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'User fetched successfully',
            data: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Invalid or expired session",
            },
            { status: 401 }
        );

    }
}