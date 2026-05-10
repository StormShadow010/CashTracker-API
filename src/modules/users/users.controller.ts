import { Request, Response, NextFunction } from "express";
import { UsersService } from "./users.service";
import {
  UpdateUserInput,
  ChangePasswordInput,
  ChangeRoleInput,
} from "./users.schema";

export class UsersController {
  private service: UsersService;

  constructor() {
    this.service = new UsersService();
  }

  // GET /api/v1/users
  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const users = await this.service.findAll();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/users/:id
  findById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await this.service.findById(req.params.id, req.user!);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  // PUT /api/v1/users/:id
  update = async (
    req: Request<{ id: string }, {}, UpdateUserInput>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await this.service.update(
        req.params.id,
        req.body,
        req.user!,
      );
      res.status(200).json({
        success: true,
        message: "Usuario actualizado correctamente",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  // PATCH /api/v1/users/:id/password
  changePassword = async (
    req: Request<{ id: string }, {}, ChangePasswordInput>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.service.changePassword(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Contraseña actualizada correctamente",
      });
    } catch (error) {
      next(error);
    }
  };

  // PATCH /api/v1/users/:id/role
  changeRole = async (
    req: Request<{ id: string }, {}, ChangeRoleInput>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await this.service.changeRole(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Rol actualizado correctamente",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  // DELETE /api/v1/users/:id
  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.service.delete(req.params.id, req.user!);
      res.status(200).json({
        success: true,
        message: "Usuario eliminado correctamente",
      });
    } catch (error) {
      next(error);
    }
  };
}
