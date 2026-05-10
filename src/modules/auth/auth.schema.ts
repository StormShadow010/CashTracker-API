import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ error: "El nombre es requerido" })
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre no puede superar 80 caracteres")
    .trim(),

  email: z.email("El email no tiene un formato válido").toLowerCase().trim(),

  password: z
    .string({ error: "La contraseña es requerida" })
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(64, "La contraseña no puede superar 64 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
    ),
});

export const loginSchema = z.object({
  email: z.email("El email no tiene un formato válido").toLowerCase().trim(),

  password: z
    .string({ error: "La contraseña es requerida" })
    .min(1, "La contraseña es requerida"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
