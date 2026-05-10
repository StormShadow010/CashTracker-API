import { Router } from "express";
import { ExpensesController } from "./expenses.controller";
import { validate } from "../../middlewares/validate.middleware";
import { authenticate } from "../../middlewares/auth.middleware";
import { createExpenseSchema, updateExpenseSchema } from "./expenses.schema";

const router = Router();
const expensesController = new ExpensesController();

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Gestión de gastos por presupuesto
 */

/**
 * @swagger
 * /expenses:
 *   get:
 *     summary: Listar todos los gastos del usuario
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de gastos
 *       401:
 *         description: No autorizado
 */
router.get("/", authenticate, expensesController.findAll);

/**
 * @swagger
 * /expenses/budget/{budgetId}:
 *   get:
 *     summary: Listar gastos por presupuesto
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: budgetId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de gastos del presupuesto
 *       404:
 *         description: Presupuesto no encontrado
 */
router.get("/budget/:budgetId", authenticate, expensesController.findByBudget);

/**
 * @swagger
 * /expenses/{id}:
 *   get:
 *     summary: Obtener gasto por ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gasto encontrado
 *       404:
 *         description: Gasto no encontrado
 */
router.get("/:id", authenticate, expensesController.findById);

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Registrar nuevo gasto
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [description, amount, date, budgetId, categoryId]
 *             properties:
 *               description:
 *                 type: string
 *                 example: Almuerzo restaurante
 *               amount:
 *                 type: number
 *                 example: 25000
 *               date:
 *                 type: string
 *                 example: '2025-05-10'
 *               budgetId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gasto registrado
 *       400:
 *         description: Error de validación
 */
router.post(
  "/",
  authenticate,
  validate(createExpenseSchema),
  expensesController.create,
);

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Actualizar gasto
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gasto actualizado
 *       404:
 *         description: Gasto no encontrado
 */
router.put(
  "/:id",
  authenticate,
  validate(updateExpenseSchema),
  expensesController.update,
);

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Eliminar gasto
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gasto eliminado
 *       403:
 *         description: No tienes permiso
 */
router.delete("/:id", authenticate, expensesController.delete);

export default router;
