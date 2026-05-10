import { BudgetsRepository } from "./budgets.repository";
import { CreateBudgetInput, UpdateBudgetInput } from "./budgets.schema";
import { IBudget } from "./budgets.model";
import { ApiError } from "../../utils/ApiError";

export class BudgetsService {
  private repository: BudgetsRepository;

  constructor() {
    this.repository = new BudgetsRepository();
  }

  async findAll(userId: string): Promise<IBudget[]> {
    return this.repository.findAll(userId);
  }

  async findById(id: string, userId: string): Promise<IBudget> {
    const budget = await this.repository.findById(id);
    if (!budget) throw ApiError.notFound("Presupuesto no encontrado");

    if (budget.userId.toString() !== userId) {
      throw ApiError.forbidden("No tienes permiso para ver este presupuesto");
    }

    return budget;
  }

  async create(input: CreateBudgetInput, userId: string): Promise<IBudget> {
    return this.repository.create({ ...input, userId });
  }

  async update(
    id: string,
    input: UpdateBudgetInput,
    userId: string,
  ): Promise<IBudget> {
    const budget = await this.repository.findById(id);
    if (!budget) throw ApiError.notFound("Presupuesto no encontrado");

    if (budget.userId.toString() !== userId) {
      throw ApiError.forbidden(
        "No tienes permiso para actualizar este presupuesto",
      );
    }

    const updated = await this.repository.update(id, input);
    if (!updated) throw ApiError.notFound("Presupuesto no encontrado");
    return updated;
  }

  async delete(id: string, userId: string): Promise<void> {
    const budget = await this.repository.findById(id);
    if (!budget) throw ApiError.notFound("Presupuesto no encontrado");

    if (budget.userId.toString() !== userId) {
      throw ApiError.forbidden(
        "No tienes permiso para eliminar este presupuesto",
      );
    }

    await this.repository.delete(id);
  }
}
