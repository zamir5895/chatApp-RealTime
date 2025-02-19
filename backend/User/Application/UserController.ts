import { Request, Response } from "express";
import { UserService } from "../Domain/UserService";

export class UserController {
    static async getAllUsers(req:Request, res:Response):Promise<Response>{
        const search = req.query.search as string;
        const excludedId = (req.user as any)? (req.user as any)._id : undefined;
        const result = await UserService.getAllUsers(search, excludedId);
        return res.status(result.status).json({message:result.message, users:result.users});
    }
}   