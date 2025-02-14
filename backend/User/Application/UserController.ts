import { Request, Response } from "express";
import User, { IUser} from "../../User/Domain/UserModel"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class UserController {
    private static JWT_SECRET = process.env.JWT_SECRET as string;

    private static generateToken(userId: string):   string {
        return jwt.sign({id: userId}, UserController.JWT_SECRET, {expiresIn: "1h"});
    }
    
    static async register(req: Request, res: Response): Promise<Response>{
        try{
                
        }
    }
}