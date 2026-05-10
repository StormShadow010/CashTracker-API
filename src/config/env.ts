import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/cashtracker",
  mongoDbName: process.env.MONGO_DB_NAME || "cashtracker",
  jwtSecret: process.env.JWT_SECRET || "default_secret_cambiame",
  jwtExpiration: process.env.JWT_EXPIRES_IN || "7d",
  nodeEnv: process.env.NODE_ENV || "development",
};
