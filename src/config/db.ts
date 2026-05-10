import mongoose from "mongoose";
import { env } from "./env";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri, { dbName: env.mongoDbName });
    console.log(`MongoDB conectado: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Error al conectar MongoDB:", error);
    process.exit(1);
  }
};

export const getDB = (): mongoose.Connection => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error("Database not connected");
  }
  return mongoose.connection;
};
