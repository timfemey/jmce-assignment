import { Router } from "express";
import {
  getCourses,
  getCourseById,
  addCourse,
  updateCourse,
} from "../controllers/courseController.js";

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/", addCourse);
router.put("/:id", updateCourse);

export default router;
