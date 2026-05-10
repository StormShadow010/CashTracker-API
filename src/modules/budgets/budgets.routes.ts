import { Router } from "express";
import { BudgetsController } from "./budgets.controller";
import { validate } from "../../middlewares/validate.middleware";
import { authenticate } from "../../middlewares/auth.middleware";
import { createBudgetSchema, updateBudgetSchema } from "./budgets.schema";

const router = Router();
const budgetsController = new BudgetsController();

/**
 * @swagger
 * tags:
 *   name: Budgets
 *   description: Gestión de presupuestos por usuario
 */

/**
 * @swagger
 * /budgets:
 *   get:
 *     summary: Listar presupuestos del usuario autenticado
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de presupuestos
 *       401:
 *         description: No autorizado
 */
router.get("/", authenticate, budgetsController.findAll);

/**
 * @swagger
 * /budgets/{id}:
 *   get:
 *     summary: Obtener presupuesto por ID
 *     tags: [Budgets]
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
 *         description: Presupuesto encontrado
 *       404:
 *         description: Presupuesto no encontrado
 */
router.get("/:id", authenticate, budgetsController.findById);

/**
 * @swagger
 * /budgets:
 *   post:
 *     summary: Crear nuevo presupuesto
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, amount, startDate, endDate]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mayo 2025
 *               amount:
 *                 type: number
 *                 example: 2000000
 *               startDate:
 *                 type: string
 *                 example: '2025-05-01'
 *               endDate:
 *                 type: string
 *                 example: '2025-05-31'
 *     responses:
 *       201:
 *         description: Presupuesto creado
 *       400:
 *         description: Error de validación
 */
router.post(
  "/",
  authenticate,
  validate(createBudgetSchema),
  budgetsController.create,
);

/**
 * @swagger
 * /budgets/{id}:
 *   put:
 *     summary: Actualizar presupuesto
 *     tags: [Budgets]
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
 *               name:
 *                 type: string
 *               amount:
 *                 type: number
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Presupuesto actualizado
 *       404:
 *         description: Presupuesto no encontrado
 */
router.put(
  "/:id",
  authenticate,
  validate(updateBudgetSchema),
  budgetsController.update,
);

/**
 * @swagger
 * /budgets/{id}:
 *   delete:
 *     summary: Eliminar presupuesto
 *     tags: [Budgets]
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
 *         description: Presupuesto eliminado
 *       403:
 *         description: No tienes permiso
 */
router.delete("/:id", authenticate, budgetsController.delete);

export default router;
