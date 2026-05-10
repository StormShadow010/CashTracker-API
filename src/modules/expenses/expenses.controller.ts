import { Request, Response, NextFunction } from "express";
import { ExpensesService } from "./expenses.service";
import { CreateExpenseInput, UpdateExpenseInput } from "./expenses.schema";

export class ExpensesController {
  private service: ExpensesService;

  constructor() {
    this.service = new ExpensesService();
  }

  // GET /api/v1/expenses
  findAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const expenses = await this.service.findAll(req.user!.userId);
      res.status(200).json({
        success: true,
        data: expenses,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/expenses/budget/:budgetId
  findByBudget = async (
    req: Request<{ budgetId: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const expenses = await this.service.findByBudget(
        req.params.budgetId,
        req.user!.userId,
      );
      res.status(200).json({
        success: true,
        data: expenses,
      });
    } catch (error) {
      next(error);
    }
  };

  // GET /api/v1/expenses/:id
  findById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const expense = await this.service.findById(
        req.params.id,
        req.user!.userId,
      );
      res.status(200).json({
        success: true,
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  };

  // POST /api/v1/expenses
  create = async (
    req: Request<{}, {}, CreateExpenseInput>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const expense = await this.service.create(req.body, req.user!.userId);
      res.status(201).json({
        success: true,
        message: "Gasto registrado correctamente",
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  };

  // PUT /api/v1/expenses/:id
  update = async (
    req: Request<{ id: string }, {}, UpdateExpenseInput>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const expense = await this.service.update(
        req.params.id,
        req.body,
        req.user!.userId,
      );
      res.status(200).json({
        success: true,
        message: "Gasto actualizado correctamente",
        data: expense,
      });
    } catch (error) {
      next(error);
    }
  };

  // DELETE /api/v1/expenses/:id
  delete = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await this.service.delete(req.params.id, req.user!.userId);
      res.status(200).json({
        success: true,
        message: "Gasto eliminado correctamente",
      });
    } catch (error) {
      next(error);
    }
  };
}
