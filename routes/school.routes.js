import express from "express";
import { addSchool,
         listSchools } from "../controllers/school.controller.js";

const router = express.Router();

router.post("/add-school", addSchool)
router.get("/list-schools", listSchools)

export default router;