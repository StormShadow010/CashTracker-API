import { UserModel, IUser } from "./users.model";
import { UpdateUserInput } from "./users.schema";

export class UsersRepository {
  async findAll(): Promise<IUser[]> {
    return UserModel.find({ isActive: true });
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  async findByIdWithPassword(id: string): Promise<IUser | null> {
    return UserModel.findById(id).select("+password");
  }

  async update(id: string, data: UpdateUserInput): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async changePassword(id: string, hashedPassword: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { password: hashedPassword });
  }

  async changeRole(id: string, role: "admin" | "user"): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, { role }, { new: true });
  }

  async delete(id: string): Promise<void> {
    await UserModel.findByIdAndUpdate(id, { isActive: false });
  }
}
