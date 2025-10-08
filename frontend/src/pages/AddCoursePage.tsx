import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CourseForm from "../components/CourseForm";
import { addCourse } from "../services/api";
import { CoursePayload } from "../types/courseTypes";
import { enqueueSnackbar } from "notistack";

const AddCoursePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: CoursePayload) => {
    try {
      await addCourse(data);
      enqueueSnackbar("Course added successfully!", { variant: "success" });
      navigate("/admin");
    } catch (error) {
      enqueueSnackbar("Failed to add course.", { variant: "error" });
      console.error("Failed to add course:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <CourseForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default AddCoursePage;
