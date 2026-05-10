import { ExpenseModel, IExpense } from "./expenses.model";
import { CreateExpenseInput, UpdateExpenseInput } from "./expenses.schema";

export class ExpensesRepository {
  async findAll(userId: string): Promise<IExpense[]> {
    return ExpenseModel.find({ userId })
      .populate("categoryId", "name color icon")
      .populate("budgetId", "name amount");
  }

  async findByBudget(budgetId: string, userId: string): Promise<IExpense[]> {
    return ExpenseModel.find({ budgetId, userId }).populate(
      "categoryId",
      "name color icon",
    );
  }

  async findById(id: string): Promise<IExpense | null> {
    return ExpenseModel.findById(id)
      .populate("categoryId", "name color icon")
      .populate("budgetId", "name amount");
  }

  async create(
    data: CreateExpenseInput & { userId: string },
  ): Promise<IExpense> {
    return ExpenseModel.create(data);
  }

  async update(id: string, data: UpdateExpenseInput): Promise<IExpense | null> {
    return ExpenseModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await ExpenseModel.findByIdAndDelete(id);
  }

  async deleteByBudget(budgetId: string): Promise<void> {
    await ExpenseModel.deleteMany({ budgetId });
  }
}
