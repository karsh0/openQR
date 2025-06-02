import { NextFunction, Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";
require('dotenv').config();

export function authMiddleware(req:Request ,res:Response ,next:NextFunction){
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    try{
        //@ts-ignore
        const decoded = jwt.decode(token, process.env.JWT_AUTH_KEY , { algorithms: ["RS256"] });
        console.log('in middleware')

        if(decoded?.sub){
            req.userId = decoded.sub
            next()
    }
    }
    catch(e){
        res.status(403).json({
            message:"error in middleware"
        })
    }
  
}