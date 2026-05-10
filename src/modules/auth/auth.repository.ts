import { UserModel, IUser } from "./auth.model";
import { RegisterInput } from "./auth.schema";

export class AuthRepository {
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email, isActive: true }).select("+password");
  }

  async findByEmailWithoutPassword(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }

  async create(
    data: RegisterInput & { password: string; role?: "admin" | "user" },
  ): Promise<IUser> {
    return UserModel.create(data);
  }

  async adminExists(): Promise<boolean> {
    const count = await UserModel.countDocuments({ role: "admin" });
    return count > 0;
  }
}
