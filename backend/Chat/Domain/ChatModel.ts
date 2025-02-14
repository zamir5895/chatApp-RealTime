import { use } from "passport";
import { mongoose } from "../../db/db";

const chatModel = new mongoose.Schema(
    {
        chatName:{type:String, trim:true},
        isGroupChat:{type:Boolean, required:true},
        users:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
        latestMessage:
        {
            type:mongoose.Schema.Types.ObjectId, 
            ref:'Message'
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },

    },
    {timestamps:true}
);

const Chat = mongoose.model('Chat', chatModel);
module.exports = Chat;