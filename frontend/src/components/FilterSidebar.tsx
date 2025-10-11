import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { getUniversities } from "../services/api";
import { University } from "../types/courseTypes";
import { enqueueSnackbar } from "notistack";

interface Props {
  filters: { duration: string; mode: string; universityId: string };
  onFilterChange: (name: string, value: string) => void;
}

const FilterSidebar = ({ filters, onFilterChange }: Props) => {
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await getUniversities();
        setUniversities(data);
      } catch (error) {
        enqueueSnackbar("Failed to fetch universities", { variant: "error" });
        console.error("Failed to fetch universities", error);
      }
    };
    fetchUniversities();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    onFilterChange(event.target.name, event.target.value);
  };

  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        height: "fit-content",
        width: "50dvw",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>University</InputLabel>
        <Select
          name="universityId"
          value={filters.universityId}
          label="University"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>All Universities</em>
          </MenuItem>
          {universities.map((uni) => (
            <MenuItem key={uni.id} value={String(uni.id)}>
              {uni.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Duration</InputLabel>
        <Select
          name="duration"
          value={filters.duration}
          label="Duration"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Any</em>
          </MenuItem>
          <MenuItem value="1 year">1 Year</MenuItem>
          <MenuItem value="2 years">2 Years</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Mode of Study</InputLabel>
        <Select
          name="mode"
          value={filters.mode}
          label="Mode of Study"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Any</em>
          </MenuItem>
          <MenuItem value="Full-time">Full-time</MenuItem>
          <MenuItem value="Part-time">Part-time</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterSidebar;
