import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";
import { getCourseById } from "../services/api";
import { Course } from "../types/courseTypes";

const ComparePage = () => {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = searchParams.get("ids")?.split(",");
    if (ids) {
      const fetchCourses = async () => {
        setLoading(true);
        const coursePromises = ids.map((id) => getCourseById(id));
        const courseResults = await Promise.all(coursePromises);
        setCourses(courseResults);
        setLoading(false);
      };
      fetchCourses();
    }
  }, [searchParams]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Course Comparison
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Feature</TableCell>
              {courses.map((course) => (
                <TableCell key={course.id} sx={{ fontWeight: "bold" }}>
                  {course.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>University</TableCell>
              {courses.map((c) => (
                <TableCell key={c.id}>{c.university_name}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Duration</TableCell>
              {courses.map((c) => (
                <TableCell key={c.id}>{c.duration}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Mode of Study</TableCell>
              {courses.map((c) => (
                <TableCell key={c.id}>{c.mode_of_study}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>UK Fees</TableCell>
              {courses.map((c) => (
                <TableCell key={c.id}>£{c.fees_uk?.toLocaleString()}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>International Fees</TableCell>
              {courses.map((c) => (
                <TableCell key={c.id}>
                  £{c.fees_international?.toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Modules</TableCell>
              {courses.map((c) => (
                <TableCell key={c.id} sx={{ verticalAlign: "top" }}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {c.modules.map((mod) => (
                      <Chip key={mod} label={mod} size="small" />
                    ))}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ComparePage;
