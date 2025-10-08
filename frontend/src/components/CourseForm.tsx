import { useState, useEffect, FormEvent } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { CoursePayload } from "../types/courseTypes";

interface Props {
  onSubmit: (data: CoursePayload) => void;
  initialData?: CoursePayload;
  isEditing?: boolean;
}

const CourseForm = ({ onSubmit, initialData, isEditing = false }: Props) => {
  const [formData, setFormData] = useState<CoursePayload>({
    title: "",
    university: "",
    duration: "",
    location: "",
    fees: 0,
    description: "",
    entryRequirements: [],
    modules: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "fees" ? Number(value) : value,
    }));
  };

  // Handle array fields like modules
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        {isEditing ? "Edit Course" : "Add New Course"}
      </Typography>
      <Grid container spacing={2}>
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
        <Grid columnSpacing={{ xs: 12, sm: 6 }}>
          <TextField
            name="university"
            label="University"
            value={formData.university}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid columnSpacing={{ xs: 12, sm: 6 }}>
          <TextField
            name="duration"
            label="Duration"
            value={formData.duration}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid columnSpacing={{ xs: 12, sm: 6 }}>
          <TextField
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid columnSpacing={{ xs: 12 }}>
          <TextField
            name="fees"
            label="Fees (Yearly)"
            type="number"
            value={formData.fees}
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
            name="modules"
            label="Modules (comma separated)"
            helperText="e.g. Module 1, Module 2"
            value={formData.modules.join(", ")}
            onChange={handleArrayChange}
            fullWidth
          />
        </Grid>

        <Grid columnSpacing={{ xs: 12 }}>
          <TextField
            name="entryRequirements"
            label="Requirements (comma separated)"
            helperText="e.g. Requirement 1, Requirement 2"
            value={formData.entryRequirements.join(", ")}
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
