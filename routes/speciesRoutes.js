import express from "express";
import { getSpeciesById, createSpecies} from  "../controllers/speciesController.js"

const router = express.Router();

router.get("/:id", getSpeciesById);
router.post("/", createSpecies);

export default router;