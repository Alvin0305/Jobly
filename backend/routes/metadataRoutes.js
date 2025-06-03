import express from "express";
import {
  createCodingLanguage,
  createInterest,
  createLanguage,
  createQualification,
  createSkill,
  getCodingLanguages,
  getCodingLanguagesOfUser,
  getDomains,
  getInterestsOfUser,
  getLanguages,
  getLanguagesOfUser,
  getQualifications,
  getQualificationsOfUser,
  getSkillsOfUser,
} from "../controllers/metdataController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/domain", getDomains);
router.get("/codinglanguage", getCodingLanguages);
router.get("/language",getLanguages);
router.get("/qualification", getQualifications);

router.post("/interest/:id",protect, createInterest);
router.post("/skill/:id",protect, createSkill);
router.post("/codinglanguage/:id", createCodingLanguage);
router.post("/language/:id",protect, createLanguage);
router.post("/qualification/:id",protect, createQualification);

router.get("/interest/:id", protect,getInterestsOfUser);
router.get("/skill/:id",protect, getSkillsOfUser);
router.get("/codinglanguage/:id", getCodingLanguagesOfUser);
router.get("/language/:id",protect, getLanguagesOfUser);
router.get("/qualification/:id", getQualificationsOfUser);

export default router;
