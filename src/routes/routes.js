import express from "express";
import userRoutes from "./userRoutes.js";

const router = express.Router();

// Registra as rotas de usuários
router.use("/users", userRoutes);

export default router;
