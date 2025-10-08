import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Pagination,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import CourseCard from "../components/CourseCard";
import { getCourses } from "../services/api";
import { Course } from "../types/courseTypes";
import { enqueueSnackbar } from "notistack";

const CourseListPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchForCourse, setsearchForCourse] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = searchForCourse
          ? await getCourses(page, searchTerm, "")
          : await getCourses(page, "", searchTerm);
        setCourses(data.courses);
        setTotalPages(data.totalPages);
      } catch (error) {
        enqueueSnackbar("Failed to fetch courses from Server", {
          variant: "error",
        });
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(() => {
      fetchCourses();
    }, 500);

    return () => clearTimeout(debounceFetch);
  }, [page, searchTerm]);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        University Courses
      </Typography>
      <TextField
        fullWidth
        label={
          searchForCourse
            ? "Search for a course..."
            : "Filter Search for a University..."
        }
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />
      <Button
        onClick={(e) => {
          e.preventDefault();
          setsearchForCourse(!searchForCourse);
        }}
      >
        Switch to Search for {searchForCourse ? "University" : "Course"}
      </Button>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={4}>
            {courses.map((course) => (
              <Grid key={course.id} columnSpacing={{ xs: 12, sm: 6, md: 4 }}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default CourseListPage;
