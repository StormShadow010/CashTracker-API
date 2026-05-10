import { z } from "zod";

export const createExpenseSchema = z.object({
  description: z
    .string({ error: "La descripción es requerida" })
    .min(2, "La descripción debe tener al menos 2 caracteres")
    .max(200, "La descripción no puede superar 200 caracteres")
    .trim(),

  amount: z
    .number({ error: "El monto es requerido" })
    .positive("El monto debe ser mayor a 0"),

  date: z
    .string({ error: "La fecha es requerida" })
    .transform((val) => new Date(val)),

  budgetId: z
    .string({ error: "El presupuesto es requerido" })
    .min(1, "El presupuesto es requerido"),

  categoryId: z
    .string({ error: "La categoría es requerida" })
    .min(1, "La categoría es requerida"),
});

export const updateExpenseSchema = z.object({
  description: z
    .string()
    .min(2, "La descripción debe tener al menos 2 caracteres")
    .max(200, "La descripción no puede superar 200 caracteres")
    .trim()
    .optional(),

  amount: z.number().positive("El monto debe ser mayor a 0").optional(),

  date: z
    .string()
    .transform((val) => new Date(val))
    .optional(),

  categoryId: z.string().optional(),
});

export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
