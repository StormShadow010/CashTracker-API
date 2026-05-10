import { CategoryModel, ICategory } from "./categories.model";
import { CreateCategoryInput, UpdateCategoryInput } from "./categories.schema";

export class CategoriesRepository {
  async findAll(userId: string): Promise<ICategory[]> {
    return CategoryModel.find({ userId });
  }

  async findById(id: string): Promise<ICategory | null> {
    return CategoryModel.findById(id);
  }

  async findByNameAndUser(
    name: string,
    userId: string,
  ): Promise<ICategory | null> {
    return CategoryModel.findOne({ name, userId });
  }

  async create(
    data: CreateCategoryInput & { userId: string },
  ): Promise<ICategory> {
    return CategoryModel.create(data);
  }

  async update(
    id: string,
    data: UpdateCategoryInput,
  ): Promise<ICategory | null> {
    return CategoryModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<void> {
    await CategoryModel.findByIdAndDelete(id);
  }
}
