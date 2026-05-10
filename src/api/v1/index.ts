import { Router } from "express";
import authRouter from "../../modules/auth/auth.routes";
import usersRouter from "../../modules/users/users.routes";
import categoriesRouter from "../../modules/categories/categories.routes";
import budgetsRouter from "../../modules/budgets/budgets.routes";
import expensesRouter from "../../modules/expenses/expenses.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/budgets", budgetsRouter);
router.use("/expenses", expensesRouter);

export default router;
