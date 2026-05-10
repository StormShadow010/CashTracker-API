import { Schema, model, Document, Types } from "mongoose";

export interface IBudget extends Document {
  name: string;
  amount: number;
  startDate: Date;
  endDate: Date;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const budgetSchema = new Schema<IBudget>(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [100, "El nombre no puede superar 100 caracteres"],
    },
    amount: {
      type: Number,
      required: [true, "El monto es requerido"],
      min: [0, "El monto debe ser mayor a 0"],
    },
    startDate: {
      type: Date,
      required: [true, "La fecha de inicio es requerida"],
    },
    endDate: {
      type: Date,
      required: [true, "La fecha de fin es requerida"],
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

budgetSchema.index({ userId: 1 });

export const BudgetModel = model<IBudget>("Budget", budgetSchema);
