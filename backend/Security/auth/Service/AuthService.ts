
import { UserRepository } from "../../../User/Infrastructure/UserRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class AuthService {

    private static JWT_SECRET = process.env.JWT_SECRET as string; 
    private static generateToken (userID: string):string {
        return jwt.sign({id:userID}, AuthService.JWT_SECRET, {expiresIn:"1h"} );
    }

    private static generateVerificationCode():string {
        return Math.floor(100000 + Math.random() *900000).toString();
    }

    static async login(email:string, password:string): Promise<{status:number,message:string, token?:string, user?:any}> {
        const user = await UserRepository.getUser(email);
        if(!user){
            return {status:404,
                message:"User not found "}
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return {
                status:401,
                message:"Incorrect credentials, maybe the password is not correct"}
        }
        const token = AuthService.generateToken(user._id.toString()) 
        return {
            status:200,
            message:"Login successfully",
            token,
            user:{
                id:user._id,email:user.email
            }
        }

    }

    static async register(name:string, email:string, password:string, pic:string):Promise<{status:number, message:string, user?:any}>{
        const existingUser = await UserRepository.getUser(email);
        if(existingUser){
            return{
                status:400,
                message:"User already exists"
            }
        }
        
        const code = this.generateVerificationCode();
        const newUser = await UserRepository.createUser({
            name,
            email,
            password:password,
            pic,
            isAdmin:false,
            isVerified:false,
            verifiedCode:code
        });
        return{
            status:201,
            message:"User created successfully",
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                pic:newUser.email,
                verificationCode:newUser.verifiedCode
            }
        }
    }

    static async verify(email:string, code:string):Promise<{status:number, message:string, user?:any}>{
        const user = await UserRepository.getUser(email);
        if(!user){
            return {
                status:404,
                message:"User not found"
            }
        }
        if(user.verifiedCode !== code){
            return{
                status:401,
                message:"The verification code does not coincide."
            }
        }
        user.isVerified =true;
        const userSaved = await UserRepository.saveUser(user);
        return {
            status:201,
            message:"User verified",
            user:{
                id:userSaved._id,
                email:userSaved.email,
                name:userSaved.name
            }
        }

    }

    static async reSend(email:string):Promise<{status:number, message:string, user?:any}>{
        const userFound = await UserRepository.getUser(email);
        if(!userFound){
            return{
                status:404,
                message:"User not found"
            }
        }
        const verifiedCode = this.generateVerificationCode();
        userFound.verifiedCode = verifiedCode;
        const user = await UserRepository.saveUser(userFound);
        return {
            status:200,
            message:"Send verification code to the email provided",
            user:{
                id:user._id,
                email:user.email,
                name:user.name,
                pic:user.pic,
                verificationCode:user.verifiedCode
            }
        } 
    }
}