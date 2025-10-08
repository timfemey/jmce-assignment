import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getCourses, deleteCourse } from "../services/api";
import { Course } from "../types/courseTypes";
import { enqueueSnackbar } from "notistack";

const AdminDashboardPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCoursesData = async () => {
    try {
      const data = await getCourses(page, "", "");
      setCourses(data.courses);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError("Failed to fetch courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoursesData();
  }, [page]);

  useEffect(() => {
    if (error.length > 1) {
      enqueueSnackbar(error, { variant: "error" });
    }
  }, [error.length]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(String(id));
        setCourses(courses.filter((course) => course.id !== id));
      } catch (err) {
        setError("Failed to delete course.");
      }
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Paper sx={{ p: 3, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">Manage Courses</Typography>
        <Button
          component={Link}
          to="/admin/add"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add New Course
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>University</TableCell>
              <TableCell>Fees</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id} hover>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.university}</TableCell>
                <TableCell>N{course.fees.toLocaleString()}</TableCell>
                <TableCell align="right">
                  <IconButton
                    component={Link}
                    to={`/admin/edit/${course.id}`}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(course.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Paper>
  );
};

export default AdminDashboardPage;
