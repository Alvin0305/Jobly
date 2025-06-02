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

const router = express.Router();

router.post("/", protect, createJob);
router.delete("/:id", protect, deleteJob);
router.get("/:id", protect, getJobById);
router.get("/employer/:id", protect, getJobsCreatedByEmployer);
router.get("/empoyee/:id", protect, getJobsForEmployee);
router.get("/interested/:id", protect, getInterestedEmployees);
router.get("/selected/:id", protect, getSelectedEmployeesForJob);
router.post("/interested/:id", protect, addEmployeeToInterested);
router.post("/select/:id", protect, selectEmployeeForJob);
router.patch("/:id", markJobAsFilled);

export default router;
