import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { RegisterInput, LoginInput } from "./auth.schema";

export class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
  }

  // POST /api/v1/auth/register
  register = async (
    req: Request<{}, {}, RegisterInput>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.service.register(req.body);
      res.status(201).json({
        success: true,
        message: "Usuario registrado correctamente",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // POST /api/v1/auth/login
  login = async (
    req: Request<{}, {}, LoginInput>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.service.login(req.body);
      res.status(200).json({
        success: true,
        message: "Login exitoso",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/auth/me
  me = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      res.status(200).json({
        success: true,
        data: req.user,
      });
    } catch (error) {
      next(error);
    }
  };
  registerAdmin = async (
    req: Request<{}, {}, RegisterInput>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.service.registerAdmin(req.body);
      res.status(201).json({
        success: true,
        message: "Administrador creado correctamente",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
