import { Request, Response, NextFunction } from "express";
import { CategoriesService } from "./categories.service";
import { CreateCategoryInput, UpdateCategoryInput } from "./categories.schema";

export class CategoriesController {
  private service: CategoriesService;

  constructor() {
    this.service = new CategoriesService();
  }

  // GET /api/v1/categories
  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const categories = await this.service.findAll(req.user!.userId);
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/categories/:id
  findById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const category = await this.service.findById(
        req.params.id,
        req.user!.userId,
      );
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  // POST /api/v1/categories
  create = async (
    req: Request<{}, {}, CreateCategoryInput>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const category = await this.service.create(req.body, req.user!.userId);
      res.status(201).json({
        success: true,
        message: "Categoría creada correctamente",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  // PUT /api/v1/categories/:id
  update = async (
    req: Request<{ id: string }, {}, UpdateCategoryInput>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const category = await this.service.update(
        req.params.id,
        req.body,
        req.user!.userId,
      );
      res.status(200).json({
        success: true,
        message: "Categoría actualizada correctamente",
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  // DELETE /api/v1/categories/:id
  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.service.delete(req.params.id, req.user!.userId);
      res.status(200).json({
        success: true,
        message: "Categoría eliminada correctamente",
      });
    } catch (error) {
      next(error);
    }
  };
}
