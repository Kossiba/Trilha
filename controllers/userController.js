import { User } from "../config/database.js";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET;
const SECRET_KEY = secretKey;

// Faz um SELECT * na tabela Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
};

//Realiza login
export const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ message: "Insira login e senha" });
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: login }, { name: login }],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const tokenData = { id: user.id, username: user.name };
    const token = jwt.sign(tokenData, SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return res.status(500).json({ message: "Erro interno no servidor" });
  }
};

// Cria um usuário na tabela Users
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};
