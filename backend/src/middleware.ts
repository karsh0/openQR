import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'

export default function middleware(req:Request ,res:Response ,next:NextFunction){
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "Token not found" });
        return;
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtPayload;
        
        if (verified.username) {
            req.username = verified.username; 
            next();
            return;
        }
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }

    res.status(403).json({ message: "Authorization failed" });
}