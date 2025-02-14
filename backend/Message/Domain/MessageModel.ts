import { mongoose } from "../../db/db";

const messageSchema = new mongoose.Schema(
    {
        sender:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
        content:{type:String, required:true, trim:true},
        chat : {type:mongoose.Schema.Types.ObjectId, ref:'Chat', required:true},
        readBy:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}]
    },
    {timestamps:true}
);

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;

