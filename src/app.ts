import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import v1Routes from "./api/v1/index";

export const app = express();

// ── Seguridad ────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors());
// ── Parsers y logging ─────────────────────────────────────────────────────────
app.use(express.json());
app.use(compression());
app.use(morgan("dev"));
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
