import { ChatService } from "../Domain/ChatService";
import { Request, Response } from "express";
export class ChatController {
    static async addToGroup (req:Request, res:Response):Promise<Response>{
        try{
            const {chatId, userId} = req.body;
            const result = await ChatService.addToGroup(chatId, userId);
            return res.status(result.status).json({message:result.message
                , chat:result.chat})    
            }
        catch(error){
            console.log("Error to add to group")
            throw new Error(error.message)
        }
    }

    static async removeFromGroup(req:Request, res:Response):Promise<Response>{
        try{
            const {chatId, userId} = req.body;
            const result = await ChatService.removeFromGroup(chatId, userId);
            return res.status(result.status).json({message:result.message, chat:result.chat})
        }catch(error){
            console.log("Error to remove from group")
            throw new Error(error.message)
        }
    }

    static async changeName(req:Request, res:Response):Promise<Response>{
        try{
            const {chatId, newName} = req.body;
            const result = await ChatService.changeChatName(chatId, newName);
            return res.status(result.status).json({message:result.message, chat:result.chat})
        }catch(error){
            console.log("Error to change name")
            throw new Error(error.message)
        }
    }

    static async createChatGroup(req:Request, res:Response):Promise<Response>{
        try{
            const {chatName, users, groupAdmin} = req.body;
            const result = await ChatService.createNewChatGroup(chatName, users, groupAdmin);
            return res.status(result.status).json({message:result.message, chat:result.chat})
        }catch(error){
            console.log("Error to create chat group")
            throw new Error(error.message)
        }
    }

    static async getAllChatForUser(req:Request, res:Response):Promise<Response>{
        try{
            const userId = req.params.userId;
            const result = await ChatService.getAllChatForUser(userId);
            return res.status(result.status).json({message:result.message, chat:result.chat})
        }
        catch(error){
            console.log("Error to get all chat for user")
            throw new Error(error.message)
        }
    }

    static async createOneToOneChat(req:Request, res:Response):Promise<Response>{
        try{
            const {userId1, userId2} = req.body;
            const result = await ChatService.createOneToOneChat(userId1, userId2);
            return res.status(result.status).json({message:result.message, chat:result.chat})
        }catch(error){
            console.log("Error to create one to one chat")
            throw new Error(error.message)
        }
    }
}