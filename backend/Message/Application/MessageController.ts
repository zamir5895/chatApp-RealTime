import { MessageService } from "../Domain/MessageService";
import { Request, Response } from "express";
export class MessageController {
    static async getMessagesByChatId(req:Request, res:Response):Promise<Response>{
        try{
            const chatId = req.body
            const messages = await MessageService.GetAllMMessagesForByChatId(chatId);
            return res.status(messages.status).json({message:messages.message, messages:messages.messages});
        }catch(error){
            console.log("Error to get messages by chat id")
            throw new Error(error.message);
        }
    }

    static async createMessage(req:Request, res:Response):Promise<Response>{
        try{
            const {chatId, content} = req.body;
            const result = await MessageService.createMessage(chatId, content);
            return res.status(result.status).json({message:result.message, messages:result.messages});
        }catch(error){
            console.log("Error to create message")
            throw new Error(error.message);
        }
    }
}