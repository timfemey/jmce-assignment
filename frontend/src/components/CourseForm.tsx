import { useState, useEffect, FormEvent } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  Course,
  CoursePayload,
  Department,
  University,
} from "../types/courseTypes";
import { getUniversities, getDepartmentsByUniversity } from "../services/api";
import { enqueueSnackbar } from "notistack";

interface Props {
  onSubmit: (data: CoursePayload) => void;
  initialData?: Course;
  isEditing?: boolean;
}

const CourseForm = ({ onSubmit, initialData, isEditing = false }: Props) => {
  const [formData, setFormData] = useState<CoursePayload>({
    title: "",
    duration: "",
    mode_of_study: "Full-time",
    description: "",
    fees_uk: 0,
    fees_international: 0,
    entry_requirements: "",
    modules: [],
    department_id: 0,
    level: "MSc",
  });

  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoadingDepts, setIsLoadingDepts] = useState(false);

  useEffect(() => {
    getUniversities().then(setUniversities);
  }, []);

  useEffect(() => {
    if (isEditing && initialData) {
      const { university_id, ...coursePayload } = initialData;
      setFormData(coursePayload as CoursePayload);
      setSelectedUniversityId(String(university_id));
    }
  }, [isEditing, initialData]);

  useEffect(() => {
    if (selectedUniversityId) {
      setIsLoadingDepts(true);
      getDepartmentsByUniversity(selectedUniversityId)
        .then(setDepartments)
        .finally(() => setIsLoadingDepts(false));
    } else {
      setDepartments([]);
    }
  }, [selectedUniversityId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]:
        name === "fees_uk" || name === "fees_international"
          ? Number(value)
          : value,
    }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "university") {
      setSelectedUniversityId(value);

      setFormData((prev) => ({ ...prev, department_id: 0 }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name == "department_id" ? Number(value) : value,
      }));
    }
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.department_id === 0) {
      enqueueSnackbar("Please select a department.", { variant: "info" });
      return;
    }
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        {isEditing ? "Edit Course" : "Add New Course"}
      </Typography>
      <Grid container spacing={3}>
        <Grid columnSpacing={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth required>
            <InputLabel>University</InputLabel>
            <Select
              name="university"
              value={selectedUniversityId}
              label="University"
              onChange={handleSelectChange}
            >
              {universities.map((uni) => (
                <MenuItem key={uni.id} value={String(uni.id)}>
                  {uni.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid columnSpacing={{ xs: 12, sm: 6 }} width={"200px"}>
          <FormControl
            fullWidth
            required
            disabled={!selectedUniversityId || isLoadingDepts}
          >
            <InputLabel>Department</InputLabel>
            <Select
              name="department_id"
              value={formData.department_id || ""}
              label="Department"
              onChange={handleSelectChange}
            >
              {isLoadingDepts ? (
                <MenuItem value="">
                  <CircularProgress size={20} />
                </MenuItem>
              ) : (
                departments.map((dept) => (
                  <MenuItem key={dept.id} value={String(dept.id)}>
                    {dept.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid columnSpacing={{ xs: 12, sm: 6 }}>
          <TextField
            name="title"
            label="Course Title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid columnSpacing={{ xs: 12, sm: 4 }}>
          <TextField
            name="level"
            label="Level"
            value={formData.level}
            onChange={handleChange}
            fullWidth
            required
            disabled
          />
        </Grid>

        <Grid columnSpacing={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth required>
            <InputLabel>Duration</InputLabel>
            <Select
              name="duration"
              value={formData.duration}
              label="Duration"
              onChange={handleSelectChange}
            >
              <MenuItem value={"1 year"}>{"1 year"}</MenuItem>
              <MenuItem value={"2 years"}>{"2 years"}</MenuItem>
              <MenuItem value={"3 years"}>{"3 years"}</MenuItem>
              <MenuItem value={"4 years"}>{"4 years"}</MenuItem>
              <MenuItem value={"5 years"}>{"5 years"}</MenuItem>
              <MenuItem value={"6 years"}>{"6 years"}</MenuItem>
              <MenuItem value={"7 years"}>{"7 years"}</MenuItem>
            </Select>
          </FormControl>
          {/* <TextField
            name="duration"
            label="Duration"
            value={formData.duration}
            onChange={handleChange}
            fullWidth
          /> */}
        </Grid>
        <Grid columnSpacing={{ xs: 12, sm: 6 }} width={"200px"}>
          <FormControl fullWidth required>
            <InputLabel>Mode of Study</InputLabel>
            <Select
              name="mode_of_study"
              value={formData.mode_of_study}
              label="Mode of Study"
              onChange={handleSelectChange}
            >
              <MenuItem value={"Full-time"}>{"Full-time"}</MenuItem>
              <MenuItem value={"Part-time"}>{"Part-time"}</MenuItem>
            </Select>
          </FormControl>
          {/* <TextField
            name="mode_of_study"
            label="Mode of Study"
            value={formData.mode_of_study}
            onChange={handleChange}
            fullWidth
          /> */}
        </Grid>
        <Grid columnSpacing={{ xs: 12, sm: 6 }}>
          <TextField
            name="fees_uk"
            label="UK Fees"
            type="number"
            value={formData.fees_uk}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid columnSpacing={{ xs: 12 }}>
          <TextField
            name="fees_international"
            label="International Fees"
            type="number"
            value={formData.fees_international}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid columnSpacing={{ xs: 12 }}>
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        <Grid columnSpacing={{ xs: 12 }}>
          <TextField
            name="entry_requirements"
            label="Entry Requirements"
            value={formData.entry_requirements}
            onChange={handleChange}
            multiline
            rows={2}
            fullWidth
          />
        </Grid>
        <Grid columnSpacing={{ xs: 12 }}>
          <TextField
            name="modules"
            label="Modules (comma separated)"
            helperText="e.g. Module 1, Module 2"
            value={formData.modules.join(", ")}
            onChange={handleArrayChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        {isEditing ? "Update Course" : "Create Course"}
      </Button>
    </Box>
  );
};

export default CourseForm;
