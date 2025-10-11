import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Box,
  Paper,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Divider,
  Button,
  Alert,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaidIcon from "@mui/icons-material/Paid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getCourseById } from "../services/api";
import { Course } from "../types/courseTypes";

const CourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCourseById(id)
        .then((data) => setCourse(data))
        .catch((err) => {
          console.error("Failed to fetch course details:", err);
          setError("Could not load course details.");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!course) return <Alert severity="warning">Course not found.</Alert>;

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Back to Courses
      </Button>
      <Grid container spacing={4}>
        <Grid columnSpacing={{ xs: 12, md: 8 }}>
          <Chip
            icon={<SchoolIcon />}
            label={course.university_name}
            color="primary"
            sx={{ mb: 1 }}
          />
          <Typography variant="h3" component="h1" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {course.description}
          </Typography>

          <Divider sx={{ my: 3 }} />
          <Typography variant="h5" gutterBottom>
            Modules
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {course.modules.map((mod, index) => (
              <Chip key={index} label={mod} variant="outlined" />
            ))}
          </Box>
        </Grid>
        <Grid columnSpacing={{ xs: 12, md: 4 }}>
          <Box sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PaidIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="UK Fees"
                  secondary={`£${course.fees_uk?.toLocaleString()} / year`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PaidIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="International Fees"
                  secondary={`£${course.fees_international?.toLocaleString()} / year`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarMonthIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Duration" secondary={course.duration} />
              </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ pl: 2 }}>
              Requirements
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary={course.entry_requirements} />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CourseDetailsPage;
