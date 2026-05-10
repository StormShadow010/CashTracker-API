import { z } from "zod";

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre no puede superar 80 caracteres")
    .trim()
    .optional(),

  email: z
    .email("El email no tiene un formato válido")
    .toLowerCase()
    .trim()
    .optional(),

  isActive: z.boolean().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string({ error: "La contraseña actual es requerida" })
    .min(1, "La contraseña actual es requerida"),

  newPassword: z
    .string({ error: "La nueva contraseña es requerida" })
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(64, "La contraseña no puede superar 64 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
    ),
});

export const changeRoleSchema = z.object({
  role: z.enum(["admin", "user"], { error: "El rol debe ser admin o user" }),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type ChangeRoleInput = z.infer<typeof changeRoleSchema>;
