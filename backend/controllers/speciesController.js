import { Species } from "../config/database.js";

export const getAllSpecies = async (req, res) => {
  try {
    const species = await Species.findAll();
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: "Error:", error });
  }
};
export const getSpeciesById = async (req, res) => {
  const { id } = req.params;

  try {
    const species = await Species.findByPk(id);
    if (!species) {
      return res.status(404).json({ error: "Especie não econtrada." });
    }
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: "Erro: ", error });
  }
};

export const createSpecies = async (req, res) => {
  try {
    const { nomecientifico, nomepopular, descricao, caracteristicas, imgURL } =
      req.body;

    const newSpecies = await Species.create({
      nomecientifico,
      nomepopular,
      descricao,
      caracteristicas,
      imgURL,
    });
    res.status(200).json(newSpecies);
  } catch (error) {
    res.status(500).json({ message: "Erro ", error });
  }
};

export const updateSpeciesById = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomecientifico, nomepopular, descricao, caracteristicas, imgURL } =
      req.body;

    const updateSpecies = await Species.update(
      { nomecientifico, nomepopular, descricao, caracteristicas, imgURL },
      { where: { id } }
    );
    res.status(200).json(updateSpecies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar a espécie", error: error.message });
  }
};

export const deleteSpeciesById = async (req, res) => {
  try {
    const { id } = req.params;

    await Species.destroy({ where: { id } });
    res.status(200).json({ message: "Espécie deletada com sucesso." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar a espécie", error: error.message });
  }
};
