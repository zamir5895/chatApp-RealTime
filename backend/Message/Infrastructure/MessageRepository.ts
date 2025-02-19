import path from "path";
import Message from "../Domain/MessageModel"
export class MessageRepository {
    static  async findByChatId(chatId:string){
        const messages = await Message.find({
            chat:chatId
        }).populate("sender","name pic email")
        .populate("chat");
        return messages;
    }

    static async createMessage(messageData : any){
        const message = await Message.create(messageData);
        return message;
    }

    static async populateMessage(messageId:string){
        var message = await Message.findById(messageId)
        message = await message.populate("sender","name pic email").execPopulate();
        message = await message.populate("chat").execPopulate();
        message = await message.populate(message, {
            path : "Chat.users",
            select : "name pic email",    
        });
        return message;
    }


}