import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../configs/config";

type CustomJwtPayload = {
    userId?: string
} & (string | JwtPayload)

export const createJwtToken = (payload: any) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: 30, algorithm: 'HS256' });
}

export const verifyJwtToken = (token: string) => {
    try {
        const payload: CustomJwtPayload = jwt.verify(token, JWT_SECRET);
        return payload.userId;
    }
    catch (err) {
        return;
    }
}