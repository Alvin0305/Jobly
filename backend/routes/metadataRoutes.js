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

const router = express.Router();

router.get("/domain", getDomains);
router.get("/codinglanguage", getCodingLanguages);
router.get("/language", getLanguages);
router.get("/qualification", getQualifications);

router.post("/interest/:id", createInterest);
router.post("/skill/:id", createSkill);
router.post("/codinglanguage/:id", createCodingLanguage);
router.post("/language/:id", createLanguage);
router.post("/qualification/:id", createQualification);

router.get("/interest/:id", getInterestsOfUser);
router.get("/skill/:id", getSkillsOfUser);
router.get("/codinglanguage/:id", getCodingLanguagesOfUser);
router.get("/language/:id", getLanguagesOfUser);
router.get("/qualification/:id", getQualificationsOfUser);

export default router;
