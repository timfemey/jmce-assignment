import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Course } from "../types/courseTypes";
import { Link } from "react-router-dom";

interface Props {
  course: Course;
  onCompareChange: (id: number, isSelected: boolean) => void;
  isCompareSelected: boolean;
  isCompareDisabled: boolean;
}

const CourseCard = ({
  course,
  onCompareChange,
  isCompareSelected,
  isCompareDisabled,
}: Props) => (
  <Card sx={{ position: "relative", overflow: "visible" }}>
    <CardContent>
      <Box
        component={Link}
        to={`/courses/${course.id}`}
        sx={{ textDecoration: "none", color: "inherit" }}
      >
        <Chip
          icon={<SchoolIcon />}
          label={course.university_name}
          color="primary"
          size="small"
          sx={{ mb: 1 }}
        />
        <Typography variant="h6" component="div" gutterBottom>
          {course.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            my: 1,
          }}
        >
          <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">
            {course.duration} &bull; {course.mode_of_study}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" noWrap>
          Explore modules like {course.modules[0]} and more...
        </Typography>
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={isCompareSelected}
            onChange={(e) => onCompareChange(course.id, e.target.checked)}
            disabled={isCompareDisabled && !isCompareSelected}
          />
        }
        label="Compare"
        sx={{ position: "absolute", top: 8, right: 8 }}
      />
    </CardContent>
  </Card>
);

export default CourseCard;
