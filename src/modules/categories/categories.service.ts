import { CategoriesRepository } from "./categories.repository";
import { CreateCategoryInput, UpdateCategoryInput } from "./categories.schema";
import { ICategory } from "./categories.model";
import { ApiError } from "../../utils/ApiError";

export class CategoriesService {
  private repository: CategoriesRepository;

  constructor() {
    this.repository = new CategoriesRepository();
  }

  async findAll(userId: string): Promise<ICategory[]> {
    return this.repository.findAll(userId);
  }

  async findById(id: string, userId: string): Promise<ICategory> {
    const category = await this.repository.findById(id);
    if (!category) throw ApiError.notFound("Categoría no encontrada");

    // Solo el dueño puede verla
    if (category.userId.toString() !== userId) {
      throw ApiError.forbidden("No tienes permiso para ver esta categoría");
    }

    return category;
  }

  async create(input: CreateCategoryInput, userId: string): Promise<ICategory> {
    // Verificar que no exista una categoría con el mismo nombre para este usuario
    const existing = await this.repository.findByNameAndUser(
      input.name,
      userId,
    );
    if (existing)
      throw ApiError.conflict("Ya tienes una categoría con ese nombre");

    return this.repository.create({ ...input, userId });
  }

  async update(
    id: string,
    input: UpdateCategoryInput,
    userId: string,
  ): Promise<ICategory> {
    const category = await this.repository.findById(id);
    if (!category) throw ApiError.notFound("Categoría no encontrada");

    // Solo el dueño puede actualizarla
    if (category.userId.toString() !== userId) {
      throw ApiError.forbidden(
        "No tienes permiso para actualizar esta categoría",
      );
    }

    // Si cambia el nombre verificar que no exista otro igual
    if (input.name && input.name !== category.name) {
      const existing = await this.repository.findByNameAndUser(
        input.name,
        userId,
      );
      if (existing)
        throw ApiError.conflict("Ya tienes una categoría con ese nombre");
    }

    const updated = await this.repository.update(id, input);
    if (!updated) throw ApiError.notFound("Categoría no encontrada");
    return updated;
  }

  async delete(id: string, userId: string): Promise<void> {
    const category = await this.repository.findById(id);
    if (!category) throw ApiError.notFound("Categoría no encontrada");

    // Solo el dueño puede eliminarla
    if (category.userId.toString() !== userId) {
      throw ApiError.forbidden(
        "No tienes permiso para eliminar esta categoría",
      );
    }

    await this.repository.delete(id);
  }
}
