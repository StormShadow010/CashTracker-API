import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayload } from "../utils/jwt";
import { ApiError } from "../utils/ApiError";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export class AuthMiddleware {
  authenticate = (req: Request, _res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(ApiError.unauthorized("Token no proporcionado"));
    }

    const token = authHeader.split(" ")[1];

    try {
      req.user = verifyToken(token);
      next();
    } catch (err) {
      next(err);
    }
  };

  requireAdmin = (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(ApiError.unauthorized());
    }

    if (req.user.role !== "admin") {
      return next(ApiError.forbidden("Se requiere rol de administrador"));
    }

    next();
  };
}

// Instancia lista para usar en las rutas
const authMiddleware = new AuthMiddleware();

export const authenticate = authMiddleware.authenticate;
export const requireAdmin = authMiddleware.requireAdmin;
