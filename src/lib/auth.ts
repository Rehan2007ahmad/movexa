import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

const secretKey: string = JWT_SECRET;

export interface AuthTokenPayload {
    userId: string;
    role: "admin" | "user";
}

export function createToken(payload: AuthTokenPayload): string {
    return jwt.sign(payload, secretKey, {
        expiresIn: "7d",
    });
}

export function verifyToken(token: string): AuthTokenPayload {
    return jwt.verify(token, secretKey) as unknown as AuthTokenPayload;
}


export function getTokenFromRequest(request: NextRequest): string | null {
    const cookieToken = request.cookies.get("auth_token")?.value;
    if (cookieToken) return cookieToken;

    const authHeader = request.headers.get("authorization") || request.headers.get("Authorization");
    if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
        return authHeader.substring(7).trim();
    }

    return null;
}


export function requireAuth(request: NextRequest): NextResponse | null {
    const token = getTokenFromRequest(request);
    if (!token) {
        return NextResponse.json(
            { success: false, message: "Unauthorized: Authentication required" },
            { status: 401 }
        );
    }

    try {
        verifyToken(token);
        return null;
    } catch {
        return NextResponse.json(
            { success: false, message: "Unauthorized: Invalid or expired session token" },
            { status: 401 }
        );
    }
}


export function requireAdmin(request: NextRequest): NextResponse | null {
    const authError = requireAuth(request);
    if (authError) return authError;

    const token = getTokenFromRequest(request);
    if (!token) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const payload = verifyToken(token);
        if (payload.role !== "admin") {
            return NextResponse.json(
                { success: false, message: "Forbidden: Administrator privileges required" },
                { status: 403 }
            );
        }
        return null;
    } catch {
        return NextResponse.json(
            { success: false, message: "Unauthorized: Invalid session" },
            { status: 401 }
        );
    }
}


export function getAuthPayload(request: NextRequest): AuthTokenPayload | null {
    const token = getTokenFromRequest(request);
    if (!token) return null;
    try {
        return verifyToken(token);
    } catch {
        return null;
    }
}