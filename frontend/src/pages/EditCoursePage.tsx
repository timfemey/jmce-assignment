import { useState, useEffect } from "react";
import { Container, CircularProgress, Typography, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import CourseForm from "../components/CourseForm";
import { getCourseById, updateCourse } from "../services/api";
import { Course, CoursePayload } from "../types/courseTypes";

const EditCoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getCourseById(id)
        .then((data) => setCourse(data))
        .catch((err) => {
          enqueueSnackbar("Failed to fetch course details for editing", {
            variant: "error",
          });
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (data: CoursePayload) => {
    if (id) {
      try {
        await updateCourse(id, data);
        enqueueSnackbar("Course updated successfully!", { variant: "success" });
        navigate("/admin");
      } catch (error) {
        enqueueSnackbar("Failed to update course.", { variant: "error" });
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (!course) return <Alert severity="error">Course not found.</Alert>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <CourseForm
        onSubmit={handleSubmit}
        initialData={course}
        isEditing={true}
      />
    </Container>
  );
};

export default EditCoursePage;
