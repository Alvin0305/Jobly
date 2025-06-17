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
import { createDescription, createJobDetails,  createWorkExperienceFunction, getDescription, getJobDetails, getWorkExperienceFunction } from "../models/metadata.js";

const router = express.Router();

router.get("/domain", getDomains);
router.get("/codinglanguage", getCodingLanguages);
router.get("/language",getLanguages);
router.get("/qualification", getQualifications);

router.post("/interest/:id",protect, createInterest);
router.post("/skill/:id",protect, createSkill);
router.post("/codinglanguage/:id",protect, createCodingLanguage);
router.post("/language/:id",protect, createLanguage);
router.post("/qualification/:id",protect, createQualification);

router.get("/interest/:id", protect,getInterestsOfUser);
router.get("/skill/:id",protect, getSkillsOfUser);
router.get("/codinglanguage/:id",protect, getCodingLanguagesOfUser);
router.get("/language/:id",protect, getLanguagesOfUser);
router.get("/qualification/:id",protect, getQualificationsOfUser);

router.post("/decription/:id",protect, createDescription);
router.get("/description/:id",protect,getDescription);

router.post("/workexperience/:id",protect,createWorkExperienceFunction); // only for employee
router.get("/workexperience/:id",protect,getWorkExperienceFunction);
// router.put("/workexperience/:id",protect,)

router.post("/jobdetails/:id",protect,createJobDetails);   // for employer -> only company, designation, location 
router.get("/jobdetails/:id",protect,getJobDetails);

export default router;
