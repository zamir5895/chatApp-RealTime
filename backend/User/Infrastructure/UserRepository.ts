
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



}