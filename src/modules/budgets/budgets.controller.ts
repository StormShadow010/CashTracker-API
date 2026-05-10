import { Request, Response, NextFunction } from "express";
import { BudgetsService } from "./budgets.service";
import { CreateBudgetInput, UpdateBudgetInput } from "./budgets.schema";

export class BudgetsController {
  private service: BudgetsService;

  constructor() {
    this.service = new BudgetsService();
  }

  // GET /api/v1/budgets
  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const budgets = await this.service.findAll(req.user!.userId);
      res.status(200).json({
        success: true,
        data: budgets,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/budgets/:id
  findById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const budget = await this.service.findById(
        req.params.id,
        req.user!.userId,
      );
      res.status(200).json({
        success: true,
        data: budget,
      });
    } catch (error) {
      next(error);
    }
  };

  // POST /api/v1/budgets
  create = async (
    req: Request<{}, {}, CreateBudgetInput>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const budget = await this.service.create(req.body, req.user!.userId);
      res.status(201).json({
        success: true,
        message: "Presupuesto creado correctamente",
        data: budget,
      });
    } catch (error) {
      next(error);
    }
  };

  // PUT /api/v1/budgets/:id
  update = async (
    req: Request<{ id: string }, {}, UpdateBudgetInput>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const budget = await this.service.update(
        req.params.id,
        req.body,
        req.user!.userId,
      );
      res.status(200).json({
        success: true,
        message: "Presupuesto actualizado correctamente",
        data: budget,
      });
    } catch (error) {
      next(error);
    }
  };

  // DELETE /api/v1/budgets/:id
  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.service.delete(req.params.id, req.user!.userId);
      res.status(200).json({
        success: true,
        message: "Presupuesto eliminado correctamente",
      });
    } catch (error) {
      next(error);
    }
  };
}
