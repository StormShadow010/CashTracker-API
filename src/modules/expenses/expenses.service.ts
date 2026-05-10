import { ExpensesRepository } from "./expenses.repository";
import { CreateExpenseInput, UpdateExpenseInput } from "./expenses.schema";
import { IExpense } from "./expenses.model";
import { ApiError } from "../../utils/ApiError";

export class ExpensesService {
  private repository: ExpensesRepository;

  constructor() {
    this.repository = new ExpensesRepository();
  }

  async findAll(userId: string): Promise<IExpense[]> {
    return this.repository.findAll(userId);
  }

  async findByBudget(budgetId: string, userId: string): Promise<IExpense[]> {
    return this.repository.findByBudget(budgetId, userId);
  }

  async findById(id: string, userId: string): Promise<IExpense> {
    const expense = await this.repository.findById(id);
    if (!expense) throw ApiError.notFound("Gasto no encontrado");

    if (expense.userId.toString() !== userId) {
      throw ApiError.forbidden("No tienes permiso para ver este gasto");
    }

    return expense;
  }

  async create(input: CreateExpenseInput, userId: string): Promise<IExpense> {
    return this.repository.create({ ...input, userId });
  }

  async update(
    id: string,
    input: UpdateExpenseInput,
    userId: string,
  ): Promise<IExpense> {
    const expense = await this.repository.findById(id);
    if (!expense) throw ApiError.notFound("Gasto no encontrado");

    if (expense.userId.toString() !== userId) {
      throw ApiError.forbidden("No tienes permiso para actualizar este gasto");
    }

    const updated = await this.repository.update(id, input);
    if (!updated) throw ApiError.notFound("Gasto no encontrado");
    return updated;
  }

  async delete(id: string, userId: string): Promise<void> {
    const expense = await this.repository.findById(id);
    if (!expense) throw ApiError.notFound("Gasto no encontrado");

    if (expense.userId.toString() !== userId) {
      throw ApiError.forbidden("No tienes permiso para eliminar este gasto");
    }

    await this.repository.delete(id);
  }
}
