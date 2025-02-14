import {mongoose} from "../../db/db";
import {Document} from "mongoose";

const bcrypt = require('bcrypt');

export interface IUser extends Document {
    _id:string,
    name: string;
    email: string;
    password: string;
    pic: string;
    isAdmin: Boolean;
    isVerified: Boolean;
    verifiedCode?: string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name:{type:String, required:true},
        email:{type:String, unique:true, required:true},
        password:{type:String, required:true},
        pic:{
            type:String,
            required:true,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
        isAdmin:{
            type:Boolean,
            required:true,
            default:false
        },
        isVerified:{
            type:Boolean,
            required:true,
            default:false
        },
        verifiedCode:{
            type:String,
            required:true
        }
    },
    {timestamps:true}
);

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})
export default mongoose.model<IUser>('User', userSchema);

