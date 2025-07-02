import express from "express";
import {
  addEmployeeToInterested,
  createJob,
  deleteJob,
  getInterestedEmployees,
  getJobById,
  getJobsCreatedByEmployer,
  getJobsForEmployee,
  getSelectedEmployeesForJob,
  markJobAsFilled,
  selectEmployeeForJob,
} from "../controllers/jobController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import { uploadJobImages } from "../controllers/uploadController.js";

const router = express.Router();

const maxUploadCount = 5;

router.post("/", protect, createJob);
router.delete("/:id", protect, deleteJob);
router.get("/employee", protect, getJobsForEmployee);
router.get("/employer", protect, getJobsCreatedByEmployer);
router.get("/:id", protect, getJobById);


router.get("/interested/:id", protect, getInterestedEmployees);
router.get("/selected/:id", protect, getSelectedEmployeesForJob);
router.post("/:id/interested", protect, addEmployeeToInterested);
router.post("/select/:id", protect, selectEmployeeForJob);
router.patch("/:id", markJobAsFilled);
// make sure the key value being based is images not image
router.post("/upload", upload.array("images", maxUploadCount), uploadJobImages);

export default router;
