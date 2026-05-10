import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { swaggerSpec } from "./config/swagger";
import v1Routes from "./api/v1/index";
import { errorMiddleware } from "./middlewares/error.middleware";

export const app = express();

// ── Seguridad ────────────────────────────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
);
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
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
app.get("/api/swagger-debug", (_req, res) => {
  res.json(swaggerSpec);
});
app.get("/api/swagger-debug2", (_req, res) => {
  const distPath = path.join(process.cwd(), "dist/modules");
  try {
    const files = fs.readdirSync(distPath, { recursive: true }) as string[];
    const routes = files.filter((f: string) => f.includes("routes"));
    res.json({ distPath, routes });
  } catch (err) {
    res.json({ error: String(err), distPath });
  }
});
// ── Error handler ─────────────────────────────────────────────────────────────
app.use(errorMiddleware);
