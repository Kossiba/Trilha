import express from "express";
import {
  getSpeciesById,
  createSpecies,
  getAllSpecies,
  updateSpeciesById,
  deleteSpeciesById,
} from "../controllers/speciesController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Species:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID da espécie
 *         nomecientifico:
 *           type: string
 *           description: Nome científico da espécie
 *         nomepopular:
 *           type: string
 *           description: Nome popular da espécie
 *         descricao:
 *           type: string
 *           description: Descrição da espécie
 *         caracteristicas:
 *           type: string
 *           description: Características principais da espécie
 *         imgURL:
 *           type: string
 *           description: URL da imagem da espécie
 *       required:
 *         - nomecientifico
 *         - imgURL 
 */

/**
 * @swagger
 * /species:
 *   get:
 *     summary: Retorna todas as espécies
 *     tags: [Species]
 *     responses:
 *       200:
 *         description: Lista de espécies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Species'
 */

/**
 * @swagger
 * /species/{id}:
 *   get:
 *     summary: Retorna uma espécie pelo ID
 *     tags: [Species]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da espécie
 *     responses:
 *       200:
 *         description: Dados da espécie
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Species'
 *       404:
 *         description: Espécie não encontrada
 */

/**
 * @swagger
 * /species:
 *   post:
 *     summary: Cria uma nova espécie
 *     tags: [Species]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Species'
 *     responses:
 *       201:
 *         description: Espécie criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Species'
 *       400:
 *         description: Dados inválidos
 */

/**
 * @swagger
 * /species/{id}:
 *   put:
 *     summary: Atualiza as informações de uma espécie
 *     tags: [Species]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da espécie a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Species'
 *     responses:
 *       200:
 *         description: Espécie atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Species'
 *       500:
 *         description: Erro ao atualizar a espécie
 */

/**
 * @swagger
 * /species/{id}:
 *   delete:
 *     summary: Deleta uma espécie pelo ID
 *     tags: [Species]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da espécie a ser deletada
 *     responses:
 *       200:
 *         description: Espécie deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Espécie deletada com sucesso.
 *       500:
 *         description: Erro ao deletar a espécie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao deletar a espécie
 */

router.get("/", getAllSpecies);
router.get("/:id", getSpeciesById);
router.post("/", createSpecies);
router.put("/:id", updateSpeciesById);
router.delete("/:id", deleteSpeciesById);

export default router;
