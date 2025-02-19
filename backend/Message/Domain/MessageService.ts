import { ChatRepository } from "../../Chat/Infrastructure/ChatRepository";
import { MessageRepository } from "../Infrastructure/MessageRepository";

export class MessageService {
    static async GetAllMMessagesForByChatId(chatId:string):Promise<{status:number, message:string, messages:any[]}>{
        const chat = await ChatRepository.findChatById(chatId);
        if(!chat){
            return {
                status:404,
                message:"Chat not found",
                messages:[],
            }
        }
        const messages = await MessageRepository.findByChatId(chatId);
        return {
            status:200,
            message:"Messages retrieved successfully",
            messages,
        }

    }

    static async createMessage(chatId:string, content:string):Promise<{status:number, message:string, messages:any}>{
        const chat = await ChatRepository.findChatById(chatId);
        if(!chat){
            return {
                status:404,
                message:"Chat not found",
                messages:[],
            }
        }
        if(content.trim() === ""){
            return {
                status:400,
                message:"Message content cannot be empty",
                messages:[],
            }
        }
        
        const messageResponse = await MessageRepository.createMessage({
            chat:chatId,
            content,
        });

        const fullMessage = await MessageRepository.populateMessage(messageResponse._id);
        return {
            status:200,
            message:"Message created successfully",
            messages:fullMessage,
        }
    }
}