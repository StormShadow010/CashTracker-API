import { BudgetModel, IBudget } from "./budgets.model";
import { CreateBudgetInput, UpdateBudgetInput } from "./budgets.schema";

export class BudgetsRepository {
  async findAll(userId: string): Promise<IBudget[]> {
    return BudgetModel.find({ userId });
  }

  async findById(id: string): Promise<IBudget | null> {
    return BudgetModel.findById(id);
  }

  async create(data: CreateBudgetInput & { userId: string }): Promise<IBudget> {
    return BudgetModel.create(data);
  }

  async update(id: string, data: UpdateBudgetInput): Promise<IBudget | null> {
    return BudgetModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await BudgetModel.findByIdAndDelete(id);
  }
}
