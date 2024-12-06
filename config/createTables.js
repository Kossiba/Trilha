import { sequelize } from "./database.js"; // Importa a instância do Sequelize corretamente

const createTables = async () => {
  try {
    // Sincroniza as tabelas registradas no Sequelize
    await sequelize.sync({ force: false }); // `force: true` recria as tabelas, mas apaga dados
    console.log("Tabelas criadas com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabelas:", error);
  }
};

export default createTables;
