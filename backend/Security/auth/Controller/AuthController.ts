import { Request, Response } from "express";
import User from "../../../User/Domain/UserModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { use } from "passport";
import { AuthService } from "../Service/AuthService";


export class AuthController{

    static async login (req:Request, res:Response):Promise<Response> {
        try{
            const {email, password} = req.body;
            const result = await AuthService.login(email, password);
            if(!result.token){
                return res.status(result.status).json({message:result.message});
            }
            const {token, user} = result;
            return res.status(result.status).json({message:result.message, token: result.token, user:result.user })

        }catch(error){
            return res.status(500).json({message:"Server error", error})
        }
    }

    static async register(req:Request, res:Response):Promise<Response> {
        try{
            const {name, email, password, pic} = req.body;
            const result = await AuthService.register(name,email, password,pic);
            if(result.status===400){
                return res.status(result.status).json({message:result.message});
            }
            return res.status(result.status).json({message:result.message, user: result.user})
        }catch(error){
            return res.status(500).json({message:"Server error", error})
        }
    }

    static async verify(req:Request, res:Response):Promise<Response> {
        try{
            const {email, code}=req.body;
            const result = await AuthService.verify(email,code);
            if(result.status === 404 || result.status===401){
                return res.status(result.status).json({message:result.message});
            }
            return res.status(result.status).json({message:result.message, user:result.user});

        }catch(error){
            return res.status(500).json({message:"Server error", error})

        }

    }

    static async reSend(req:Request, res:Response):Promise<Response>{
        try{
            const {email}=req.body;
            const result = await AuthService.reSend(email);
            if(result.status === 404){
                return res.status(result.status).json({message:result.message});
            }
            return res.status(result.status).json({message:result.message,user:result.user})

        }catch(error){
            return res.status(500).json({message:"Server error", error})
        }
    }
}