import { z } from "zod";

export const createBudgetSchema = z
  .object({
    name: z
      .string({ error: "El nombre es requerido" })
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(100, "El nombre no puede superar 100 caracteres")
      .trim(),

    amount: z
      .number({ error: "El monto es requerido" })
      .positive("El monto debe ser mayor a 0"),

    startDate: z
      .string({ error: "La fecha de inicio es requerida" })
      .transform((val) => new Date(val)),

    endDate: z
      .string({ error: "La fecha de fin es requerida" })
      .transform((val) => new Date(val)),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "La fecha de fin debe ser mayor a la fecha de inicio",
    path: ["endDate"],
  });

export const updateBudgetSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar 100 caracteres")
    .trim()
    .optional(),

  amount: z.number().positive("El monto debe ser mayor a 0").optional(),

  startDate: z
    .string()
    .transform((val) => new Date(val))
    .optional(),

  endDate: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
});

export type CreateBudgetInput = z.infer<typeof createBudgetSchema>;
export type UpdateBudgetInput = z.infer<typeof updateBudgetSchema>;
