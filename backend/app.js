import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { sequelize } from "./config/database.js";
import createTables from "./config/createTables.js";
import routes from "./routes/routes.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(routes);
app.use("/static", express.static(path.join(__dirname, "public")));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Função para conectar ao banco e inicializar o servidor
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados foi bem-sucedida!");

    // Cria as tabelas
    await createTables();

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar ou sincronizar com o banco de dados:", error);
  }
};

connectDatabase();
