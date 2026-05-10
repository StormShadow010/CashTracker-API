import { Router } from "express";
import { CategoriesController } from "./categories.controller";
import { validate } from "../../middlewares/validate.middleware";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./categories.schema";

const router = Router();
const categoriesController = new CategoriesController();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestión de categorías por usuario
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Listar categorías del usuario autenticado
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías
 *       401:
 *         description: No autorizado
 */
router.get("/", authenticate, categoriesController.findAll);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtener categoría por ID
 *     tags: [Categories]
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
 *         description: Categoría encontrada
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/:id", authenticate, categoriesController.findById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear nueva categoría
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alimentación
 *               color:
 *                 type: string
 *                 example: '#FF5733'
 *               icon:
 *                 type: string
 *                 example: 🍔
 *     responses:
 *       201:
 *         description: Categoría creada
 *       409:
 *         description: Ya existe una categoría con ese nombre
 */
router.post(
  "/",
  authenticate,
  validate(createCategorySchema),
  categoriesController.create,
);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Actualizar categoría
 *     tags: [Categories]
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
 *               color:
 *                 type: string
 *               icon:
 *                 type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       404:
 *         description: Categoría no encontrada
 */
router.put(
  "/:id",
  authenticate,
  validate(updateCategorySchema),
  categoriesController.update,
);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar categoría
 *     tags: [Categories]
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
 *         description: Categoría eliminada
 *       403:
 *         description: No tienes permiso
 */
router.delete("/:id", authenticate, categoriesController.delete);

export default router;
