
import User, {IUser} from "../../User/Domain/UserModel"
export class UserRepository {

    static async getUser(email:string) : Promise<IUser  |null>{
        const user = await User.findOne({email});
        return user;
    }

    static async saveUser(userToSave:IUser):Promise<IUser>{
        const user = await userToSave.save();
        return user;
    }
    static async createUser(userData:Partial<IUser>):Promise<IUser>{
        const user = new User(userData);
        await user.save();
        return user;
    }

    static async getUserById(id:string):Promise<IUser | null>{
        const user = await User.findById(id);
        return user;
    }
    public static async getAllUsers(search?:string, excludedIds?:string):Promise<IUser[]>{
        const keyword = search ? {
            $or:[
                {name:{$regex:search, $options:"i"}},
                {email:{$regex:search, $options:"i"}}
            ]
        }:{};
        const users = await User.find(keyword).find({_id:{ $ne:excludedIds}});
        return users;
    }
    static async populateLatestMessage(chats:any){
        const results = await User.populate(chats,{
            path:"latestMessage.sender",
            select:"name pic email",
        });
        return results;
    }
}