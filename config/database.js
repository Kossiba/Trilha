import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import defineUserModel from "../models/user.js"; // Função que define o modelo User

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "postgres",
  port: process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

// Define o modelo User
const User = defineUserModel(sequelize);

export { sequelize, User }; // Exporta a instância do Sequelize e o modelo User
