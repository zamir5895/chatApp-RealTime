import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../User/Infrastructure/UserRepository";

export interface AuthRequest extends Request {
    user?: any;
}

export const authMildware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({message: "No token, authorization denied"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        const user = await UserRepository.getUser(decoded.id);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({msg: "Token is not valid"});
    }
}