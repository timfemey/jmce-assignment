import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Course } from "../types/courseTypes";

interface Props {
  course: Course;
}

const CourseCard = ({ course }: Props) => (
  <Card
    sx={{
      height: "100%",
      width: "80dvw",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <CardContent sx={{ flexGrow: 1 }}>
      <Chip
        label={course.university}
        color="primary"
        size="small"
        sx={{ mb: 1 }}
      />
      <Typography gutterBottom variant="h5" component="div">
        {course.title}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        color="text.secondary"
        sx={{ my: 2 }}
      >
        <LocationOnIcon fontSize="small" />{" "}
        <Typography variant="body2">{course.location}</Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        color="text.secondary"
      >
        <CalendarMonthIcon fontSize="small" />{" "}
        <Typography variant="body2">{course.duration}</Typography>
      </Stack>
    </CardContent>
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h6" color="primary">
        N{course.fees.toLocaleString()}
      </Typography>
      <Button
        component={Link}
        to={`/courses/${course.id}`}
        variant="contained"
        size="small"
      >
        Details
      </Button>
    </Box>
  </Card>
);

export default CourseCard;
