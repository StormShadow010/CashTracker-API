import { AuthRepository } from "./auth.repository";
import { RegisterInput, LoginInput } from "./auth.schema";
import { hashPassword, comparePassword } from "../../utils/hash";
import { signToken } from "../../utils/jwt";
import { ApiError } from "../../utils/ApiError";

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
  };
}

export class AuthService {
  private repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    // 1. Verificar que el email no exista
    const existing = await this.repository.findByEmailWithoutPassword(
      input.email,
    );
    if (existing) {
      throw ApiError.conflict("Ya existe una cuenta con ese email");
    }

    // 2. Hashear contraseña
    const hashedPassword = await hashPassword(input.password);

    // 3. Crear usuario
    const user = await this.repository.create({
      ...input,
      password: hashedPassword,
    });

    // 4. Generar token
    const token = signToken({
      userId: String(user._id),
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    // 1. Buscar usuario por email
    const user = await this.repository.findByEmail(input.email);

    // Mismo mensaje para evitar user enumeration
    if (!user) {
      throw ApiError.unauthorized("Credenciales inválidas");
    }

    // 2. Verificar contraseña
    const isValid = await comparePassword(input.password, user.password);
    if (!isValid) {
      throw ApiError.unauthorized("Credenciales inválidas");
    }

    // 3. Verificar cuenta activa
    if (!user.isActive) {
      throw ApiError.forbidden("Cuenta desactivada. Contacta al administrador");
    }

    // 4. Generar token
    const token = signToken({
      userId: String(user._id),
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
  async registerAdmin(input: RegisterInput): Promise<AuthResponse> {
    const exists = await this.repository.adminExists();
    if (exists) throw ApiError.conflict("Ya existe un administrador");

    const existing = await this.repository.findByEmailWithoutPassword(
      input.email,
    );
    if (existing) throw ApiError.conflict("Ya existe una cuenta con ese email");

    const hashedPassword = await hashPassword(input.password);
    const user = await this.repository.create({
      ...input,
      password: hashedPassword,
      role: "admin",
    });

    const token = signToken({
      userId: String(user._id),
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
