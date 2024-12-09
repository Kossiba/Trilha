import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("Species", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nomePopular: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bioma: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    habitat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    altura: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    diametro: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    longevidade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Urlimage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },{
    tableName: "Species",
    timestamps: true, 
  });
};