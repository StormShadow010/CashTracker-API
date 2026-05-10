import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string({ error: "El nombre es requerido" })
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar 50 caracteres")
    .trim(),

  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "El color debe ser un hex válido ej: #FF5733")
    .optional()
    .default("#6366F1"),

  icon: z
    .string()
    .max(10, "El icono no puede superar 10 caracteres")
    .optional()
    .default("📦"),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
