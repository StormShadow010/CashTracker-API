import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import v1Routes from "./api/v1/index";
import { errorMiddleware } from "./middlewares/error.middleware";

export const app = express();

// ── Seguridad ────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors());
// ── Parsers y logging ─────────────────────────────────────────────────────────
app.use(express.json());
app.use(compression());
app.use(morgan("dev"));
// ── Swagger ───────────────────────────────────────────────────────────────────
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  }),
);
// ── V1 API Routes ─────────────────────────────────────────────────────────
app.use("/api/v1", v1Routes);
// ── Health check ──────────────────────────────────────────────────────────────
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Cash Tracker API funcionando correctamente 🚀",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});
// ── Error handler ─────────────────────────────────────────────────────────────
app.use(errorMiddleware);
