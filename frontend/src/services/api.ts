import axios from "axios";
import {
  Course,
  CoursePayload,
  Department,
  University,
} from "../types/courseTypes";

const BASE_URL = "http://localhost:5000";
const API_URL = BASE_URL + "/courses";

export const getCourses = async (filters: {
  search?: string;
  duration?: string;
  mode?: string;
  universityId?: string;
}): Promise<Course[]> => {
  const response = await axios.get(`${API_URL}`, {
    params: filters,
  });
  return response.data;
};

export const getCourseById = async (id: string): Promise<Course> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addCourse = async (courseData: CoursePayload): Promise<Course> => {
  const response = await axios.post(`${API_URL}`, courseData);
  return response.data;
};

export const updateCourse = async (
  id: string,
  courseData: CoursePayload
): Promise<Course> => {
  const response = await axios.put(`${API_URL}/${id}`, courseData);
  return response.data;
};

export const deleteCourse = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getUniversities = async (): Promise<University[]> => {
  const response = await axios.get(`${BASE_URL}/universities`);
  return response.data;
};

export const getDepartmentsByUniversity = async (
  universityId: string
): Promise<Department[]> => {
  if (!universityId) return [];
  const response = await axios.get(
    `${BASE_URL}/universities/${universityId}/departments`
  );
  return response.data;
};
