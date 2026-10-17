import jwt  from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export interface AuthTokenPayload {
    userId: string;
    role: "admin" | "user";
}

export function createToken(payload: AuthTokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "7d",
    })
}

export function verifyToken(token: string): AuthTokenPayload {
    return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
}