import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Box,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FilterSidebar from "../components/FilterSidebar";
import CourseCard from "../components/CourseCard";
import { getCourses } from "../services/api";
import { Course } from "../types/courseTypes";
import { enqueueSnackbar } from "notistack";

const CourseDashboardPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    duration: "",
    mode: "",
    universityId: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const data = await getCourses(filters);
        setCourses(data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch data", { variant: "error" });
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    const debounceFetch = setTimeout(fetchCourses, 300);
    return () => clearTimeout(debounceFetch);
  }, [filters]);

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompareChange = (id: number, isSelected: boolean) => {
    setCompareList((prev) =>
      isSelected ? [...prev, id] : prev.filter((courseId) => courseId !== id)
    );
  };

  const handleStartComparison = () => {
    if (compareList.length > 1) {
      navigate(`/compare?ids=${compareList.join(",")}`);
    }
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h3" align="center" gutterBottom>
        MSc Course Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid columnSpacing={{ xs: 12, md: 3 }}>
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Grid>
        <Grid columnSpacing={{ xs: 12, md: 9 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <TextField
              fullWidth
              label="Search by course title..."
              variant="outlined"
              onChange={(e) => handleFilterChange("search", e.target.value)}
              sx={{ maxWidth: 500 }}
            />
            <Button
              variant="contained"
              onClick={handleStartComparison}
              disabled={compareList.length < 2}
            >
              Compare ({compareList.length})
            </Button>
          </Box>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          ) : courses.length === 0 ? (
            <Alert severity="info">
              No courses found matching your criteria.
            </Alert>
          ) : (
            <Grid container spacing={3}>
              {courses.map((course) => (
                <Grid key={course.id} columnSpacing={{ xs: 12, sm: 6, lg: 4 }}>
                  <CourseCard
                    course={course}
                    onCompareChange={handleCompareChange}
                    isCompareSelected={compareList.includes(course.id)}
                    isCompareDisabled={compareList.length >= 3}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CourseDashboardPage;
