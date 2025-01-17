import express from "express";
import { getAllUsers, login, createUser, deleteUser, updateUser, sendResetPasswordEmail } from "../controllers/userController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do usuário
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *         resetPasswordToken:
 *           type: STRING
 *           description: token para resetar senha
 *         resetPasswordExpires:
 *           type: DATE
 *           description: tempo de validade do token
 *       required:
 *         - name
 *         - email
 *         - password
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Realiza login de um usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: Email ou nome do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *             required:
 *               - login
 *               - password
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", login);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Email já cadastrado
 */
router.post("/", createUser);

/**
 * @swagger
 * /users/excluir/{id}:
 *   delete:
 *     summary: Exclui um usuário pelo ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário a ser excluído
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 */

router.delete("/excluirUsuario/:id", deleteUser);

/**
 * @swagger
 * /alterar/{id}:
 *   put:
 *     summary: Atualiza as informações de um usuário
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário a ser atualizado
 *       - in: body
 *         name: body
 *         required: true
 *         description: Dados do usuário a serem atualizados
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Nome do usuário
 *               example: João Silva
 *             email:
 *               type: string
 *               description: E-mail do usuário
 *               example: joao.silva@example.com
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário não encontrado
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erro ao atualizar usuário
 *                 error:
 *                   type: string
 */

router.put("/users/:id", updateUser);

/**
 * @swagger
 * /users/sendResetPasswordEmail:
 *   post:
 *     summary: Envia um email para redefinição de senha
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Email enviado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.post("/sendResetPasswordEmail", sendResetPasswordEmail);

export default router;
