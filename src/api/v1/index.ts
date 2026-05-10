import { Router } from "express";
import authRouter from "../../modules/auth/auth.routes";
import usersRouter from "../../modules/users/users.routes";
//import BudgetRouter from "../../modules/budget/budget.routes";
//import ExpenseRouter from "../../modules/expense/expense.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
//router.use("/budget", BudgetRouter);
//router.use("/budget/:budgetId/expense", ExpenseRouter);

export default router;
