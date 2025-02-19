
import Chat from "../Domain/ChatModel"
export class ChatRepository{

    static async findChatById(chatId:string){
        const chat = await Chat.findById(chatId);
        return chat;
    }

    static saveChat(chatToSave:any){
        const chat = new Chat(chatToSave);
        chat.save();
        return chat;
    }

    static async findByIdAndUpdate(ChatId:string, userId:string){
        const chat = await Chat.findByIdAndUpdate(
            ChatId,
            {
                $push:{users:userId}
            },
            {
                new:true,
            }
        ).populate("users", "-password")
        .populate("groupAdmin", "-password")
        return chat;
    };

    static async removeFromChatGroup(chatId:string, userId:string){
        const chat = await Chat.findByIdAndUpdate(
            chatId,{
                $pull:{users:userId}
            },
            {
                new:true,
            }
        ).populate("users", "-password")
        .populate("groupAdmin", "-password")
        return chat;
    }

    static async findByChatIdAndChangedName(ChatId:string, newName:string){
        const chat = await Chat.findByIdAndUpdate(
            ChatId,{
                chatName:newName,
            },{
                new:true,
            }
        ).populate("users", "-password")
        .populate("groupAdmin", "-password");
        return chat;
    }
    
    static async createGroupChat(nChatName:string, nUsers:any, nGroupAdmin:any){
        const groupChat = await Chat.create({
            chatName:nChatName,
            users:nUsers,
            isGroupChat:true,
            groupAdmin:nGroupAdmin,
        })
        return groupChat;
    }

    static async populateGroupChat(chatId:string){
        const fullGroupChat = await Chat.findOne({_id:chatId})
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        return fullGroupChat;
    }

    static async getAllChatsForUser(userId:string){
        const chats = await Chat.find({users:{
            $elemMatch:{$eq:userId}
                }
            }
        ).populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({updateAt:-1})
        return chats;
    }

    static async findChatByUsers(userId1:string, userId2:string){
        const chats = await Chat.find({
            isGroupChat:false,
            $and:[
                {users:{ $elemMatch:{$eq:userId1}}},
                {users:{ $elemMatch:{$eq:userId2}}}
            ]
        })
            .populate("users", "-password")
            .populate("latestMessage")
        return chats;
    }
    static async createChat(chatData:any){
        const chat = await   Chat.create(chatData);
        return chat;
    }


    static async populateCreatedChat(chatId:string){
        const chat = await Chat.findOne({

            _id:chatId
        }).populate(
            "users", "-password"
        );
    }
}