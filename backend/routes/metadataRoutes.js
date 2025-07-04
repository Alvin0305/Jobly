import express from "express";
import {
  createCodingLanguage,
  createDescription,
  createDomains,
  createInterest,
  createJobDetails,
  createLanguage,
  createQualification,
  createSkill,
  createWorkExperience,
  getCodingLanguages,
  getCodingLanguagesOfUser,
  getDescription,
  getDomains,
  getInterestsOfUser,
  getJobDetails,
  getLanguages,
  getLanguagesOfUser,
  getQualifications,
  getQualificationsOfUser,
  getSkillsOfUser,
  getWorkExperience,
  createDomain,
  updateQual,
  deleteQual,
  updateSkill,
  deleteSkill,
  updateInterest,
  deleteInterest,
  updateWorkExp,
} from "../controllers/metdataController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/domain", getDomains);
router.get("/codinglanguage", getCodingLanguages);
router.get("/language", getLanguages);
router.get("/qualification", getQualifications);

router.post("/domain", protect, createDomains);
router.post("/interest/:id", protect, createInterest);
router.post("/skill/:id", protect, createSkill);
router.post("/codinglanguage/:id", protect, createCodingLanguage);
router.post("/language/:id", protect, createLanguage);
router.post("/qualification/:id", protect, createQualification);

router.get("/interest/:id", protect, getInterestsOfUser);
router.get("/skill/:id", protect, getSkillsOfUser);
router.get("/codinglanguage/:id", protect, getCodingLanguagesOfUser);
router.get("/language/:id", protect, getLanguagesOfUser);
router.get("/qualification/:id", protect, getQualificationsOfUser);

router.put("/qualification/:id", protect, updateQual);
router.put("/skill/:id", protect, updateSkill);
router.put("/interest/:id", protect, updateInterest);

router.delete("/qualification", protect, deleteQual);
router.delete("/skill", protect, deleteSkill);
router.delete("/interest", protect, deleteInterest);

router.post("/domain", protect, createDomain);

router.post("/description/:id", protect, createDescription);
router.get("/description/:id", protect, getDescription);

router.post("/workexperience/:id", protect, createWorkExperience); // only for employee
router.get("/workexperience/:id", protect, getWorkExperience);
router.put("/workexperience/:id", protect, updateWorkExp);

router.post("/jobdetails/:id", protect, createJobDetails); // for employer -> only company, designation, location
router.get("/jobdetails/:id", protect, getJobDetails);

export default router;
