import { UsersRepository } from "./users.repository";
import {
  UpdateUserInput,
  ChangePasswordInput,
  ChangeRoleInput,
} from "./users.schema";
import { hashPassword, comparePassword } from "../../utils/hash";
import { ApiError } from "../../utils/ApiError";
import { IUser } from "./users.model";

export class UsersService {
  private repository: UsersRepository;

  constructor() {
    this.repository = new UsersRepository();
  }

  async findAll(): Promise<IUser[]> {
    return this.repository.findAll();
  }

  async findById(
    id: string,
    requestingUser: { userId: string; role: string },
  ): Promise<IUser> {
    const user = await this.repository.findById(id);
    if (!user) throw ApiError.notFound("Usuario no encontrado");

    // Solo el admin o el mismo usuario pueden ver el perfil
    if (requestingUser.role !== "admin" && requestingUser.userId !== id) {
      throw ApiError.forbidden("No tienes permiso para ver este usuario");
    }

    return user;
  }
  async update(
    id: string,
    input: UpdateUserInput,
    requestingUser: { userId: string; role: string },
  ): Promise<IUser> {
    const user = await this.repository.findById(id);
    if (!user) throw ApiError.notFound("Usuario no encontrado");

    // Solo el admin o el mismo usuario pueden actualizar
    if (requestingUser.role !== "admin" && requestingUser.userId !== id) {
      throw ApiError.forbidden(
        "No tienes permiso para actualizar este usuario",
      );
    }

    if (input.email && input.email !== user.email) {
      const existing = await this.repository.findByEmail(input.email);
      if (existing) throw ApiError.conflict("El email ya está en uso");
    }

    const updated = await this.repository.update(id, input);
    if (!updated) throw ApiError.notFound("Usuario no encontrado");
    return updated;
  }

  async changePassword(id: string, input: ChangePasswordInput): Promise<void> {
    // Buscar usuario con password
    const user = await this.repository.findByIdWithPassword(id);
    if (!user) throw ApiError.notFound("Usuario no encontrado");

    // Verificar contraseña actual
    const isValid = await comparePassword(input.currentPassword, user.password);
    if (!isValid)
      throw ApiError.unauthorized("La contraseña actual es incorrecta");

    // Hashear y guardar nueva contraseña
    const hashed = await hashPassword(input.newPassword);
    await this.repository.changePassword(id, hashed);
  }

  async changeRole(id: string, input: ChangeRoleInput): Promise<IUser> {
    const user = await this.repository.findById(id);
    if (!user) throw ApiError.notFound("Usuario no encontrado");

    const updated = await this.repository.changeRole(id, input.role);
    if (!updated) throw ApiError.notFound("Usuario no encontrado");
    return updated;
  }

  async delete(
    id: string,
    requestingUser: { userId: string; role: string },
  ): Promise<void> {
    const user = await this.repository.findById(id);
    if (!user) throw ApiError.notFound("Usuario no encontrado");

    // Solo el admin puede eliminar
    if (requestingUser.role !== "admin") {
      throw ApiError.forbidden("No tienes permiso para eliminar usuarios");
    }

    // El admin no puede eliminarse a sí mismo
    if (requestingUser.userId === id) {
      throw ApiError.badRequest("No puedes eliminarte a ti mismo");
    }

    await this.repository.delete(id);
  }
}
