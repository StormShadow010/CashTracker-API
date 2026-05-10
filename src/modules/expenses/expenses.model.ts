import { Schema, model, Document, Types } from "mongoose";

export interface IExpense extends Document {
  description: string;
  amount: number;
  date: Date;
  budgetId: Types.ObjectId;
  categoryId: Types.ObjectId;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new Schema<IExpense>(
  {
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
      trim: true,
      minlength: [2, "La descripción debe tener al menos 2 caracteres"],
      maxlength: [200, "La descripción no puede superar 200 caracteres"],
    },
    amount: {
      type: Number,
      required: [true, "El monto es requerido"],
      min: [0, "El monto debe ser mayor a 0"],
    },
    date: {
      type: Date,
      required: [true, "La fecha es requerida"],
    },
    budgetId: {
      type: Schema.Types.ObjectId,
      ref: "Budget",
      required: [true, "El presupuesto es requerido"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "La categoría es requerida"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El usuario es requerido"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

expenseSchema.index({ userId: 1 });
expenseSchema.index({ budgetId: 1 });

export const ExpenseModel = model<IExpense>("Expense", expenseSchema);
