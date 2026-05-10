import { Schema, model, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  color: string;
  icon: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede superar 50 caracteres"],
    },
    color: {
      type: String,
      default: "#6366F1",
    },
    icon: {
      type: String,
      default: "📦",
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

categorySchema.index({ userId: 1 });
categorySchema.index({ name: 1, userId: 1 }, { unique: true });

export const CategoryModel = model<ICategory>("Category", categorySchema);
