import { UserRepository } from "../Infrastructure/UserRepository";
import { IUser } from "../Domain/UserModel";

export class UserService {
    public static async getAllUsers(search?: string, excludeUserId?: string): Promise<{ status: number, message: string, users?: IUser[] }> {
        const users = await UserRepository.getAllUsers(search, excludeUserId);
        return { status: 200, message: "Users retrieved successfully", users };
    }
}