import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

const routesPath = isDev
  ? path.join(__dirname, "../modules/**/*.routes.ts")
  : path.join(__dirname, "modules/**/*.routes.js");

const options: swaggerJsdoc.Options = {
  failOnErrors: false,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Cash Tracker API",
      version: "1.0.0",
      description: "API REST para gestión de presupuestos y gastos personales",
    },
    servers: [
      {
        url: "https://cashtracker-api.onrender.com/api/v1",
        description: "Producción — Render",
      },
      {
        url: "http://localhost:5000/api/v1",
        description: "Desarrollo — Local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Ingresa el token JWT obtenido en /auth/login",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [routesPath],
};

export const swaggerSpec = swaggerJsdoc(options);
