import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import courseRoutes from "./routes/courseRoutes.js";
import helmet from "helmet";
import {
  getDepartmentsByUniversity,
  getUniversities,
} from "./controllers/courseController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/courses", courseRoutes);
app.get("/universities", getUniversities);
app.get("/universities/:universityId/departments", getDepartmentsByUniversity);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
