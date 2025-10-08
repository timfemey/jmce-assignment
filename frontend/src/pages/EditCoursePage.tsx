import { useState, useEffect } from "react";
import { Container, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CourseForm from "../components/CourseForm";
import { getCourseById, updateCourse } from "../services/api";
import { CoursePayload } from "../types/courseTypes";
import { enqueueSnackbar } from "notistack";

const EditCoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<CoursePayload | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getCourseById(id)
        .then((data) => setCourse(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (data: CoursePayload) => {
    if (id) {
      try {
        await updateCourse(id, data);
        enqueueSnackbar(`Updated Course ${id} successfully`, {
          variant: "success",
        });
        navigate("/admin");
      } catch (error) {
        enqueueSnackbar("Failed to update course", { variant: "error" });
        console.error("Failed to update course:", error);
      }
    }
  };

  if (loading) return <CircularProgress />;
  if (!course) return <Typography>Course not found.</Typography>;

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
