import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError";

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // ── Zod validation errors ─────────────────────────────────────────────────
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Error de validación",
      errors: err.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
    return;
  }

  // ── Errores operacionales ─────────────────────────────────────────────────
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // ── Error de MongoDB duplicate key ────────────────────────────────────────
  if (err instanceof Error && (err as any).code === 11000) {
    res.status(409).json({
      success: false,
      message: "El recurso ya existe",
    });
    return;
  }

  // ── Error genérico ────────────────────────────────────────────────────────
  console.error("❌ Error no controlado:", err);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
};
