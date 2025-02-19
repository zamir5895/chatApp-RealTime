import { UserRepository } from "../../User/Infrastructure/UserRepository";
import { ChatRepository } from "../Infrastructure/ChatRepository";

export class ChatService{
    static async addToGroup(chatId:string, userId:string): Promise<{status:number, message:string, chat:any}>{
        const chatAdded = await ChatRepository.findByIdAndUpdate(chatId, userId);
        if(!chatAdded){
            return {
                status:404,
                message:"Chat not found",
                chat:undefined,
            }
        }
        return {
            status:200,
            message:"User added to chat",
            chat:chatAdded,
        }

    }
    static async removeFromGroup(chatId:string, userId:string):Promise<{status:number, message:string, chat:any}>{
       const chatRemoved = await ChatRepository.removeFromChatGroup(chatId, userId);
       if(!chatRemoved){
           return {
               status:404,
               message:"Chat not found",
               chat:undefined,
           }
       }
       return {
              status:200,
              message:"User removed from chat",
              chat:chatRemoved,
       }

    }

    static async changeChatName(chatId:string, newName:string):Promise<{status:number, message:string, chat:any}>{
        const chatChanged = await ChatRepository.findByChatIdAndChangedName(chatId, newName);
        if(!chatChanged){
            return {
                status:404,
                message:"Chat not found",
                chat:undefined,
            }
        }
        return {
            status:200,
            message:"Chat name changed",
            chat:chatChanged,
        }
    }

    static async createNewChatGroup(chatName:string, users:any, groupAdmin:any):Promise<{status:number, message:string, chat:any}>{
        if(users.length < 2 ){
            return {
                status:400,
                message:"Group chat must have at least 2 users",
                chat:undefined,
            }
        }
        const groupChat = await ChatRepository.createGroupChat(chatName, users, groupAdmin);
        const fullGroupChat = await ChatRepository.populateGroupChat(groupChat._id);
        return {
            status:200,
            message:"Group chat created",
            chat:fullGroupChat,
        }
    }

    static async getAllChatForUser(userId:string):Promise<{status:number, message:string, chat:any[]}>{
        const user = await UserRepository.getUserById(userId);
        if(!user){
            return {
                status:404,
                message:"User not found",
                chat:[],
            }
        }

        let allChats = await ChatRepository.getAllChatsForUser(userId);
        allChats = await UserRepository.populateLatestMessage(allChats) as any;
        return {
            status:200,
            message:"Chats retrieved",
            chat:allChats,
        }
    }

    static async createOneToOneChat(userId1:string, userId2:string):Promise<{status:number, message:string, chat:any}>{
        const user1 = await UserRepository.getUserById(userId1);
        const user2 = await UserRepository.getUserById(userId2);
        if(!user1 || user2){
            return {
                status:400,
                message:"Bad request one of the user si not found",
                chat:undefined
            }
        }
        var chatResponse = await ChatRepository.findChatByUsers(userId1, userId2) as any;
        chatResponse = await UserRepository.populateLatestMessage(chatResponse);
        if(chatResponse>0){
            return {
                status:201,
                message:"chat find for the users",
                chat:chatResponse,
            }
        }else{
            var chatData = {
                chatName:"sender",
                isGroupChat:false,
                users:[
                    userId1,
                    userId2
                ],
            };
            const createdChat = await ChatRepository.createChat(chatData);
            const fullCHat = await ChatRepository.populateCreatedChat(createdChat._id);
            return {
                status:200,
                message:"Chat created",
                chat:fullCHat,
            }
        }
    }
}