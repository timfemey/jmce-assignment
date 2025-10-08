import axios from "axios";
import { Course, CoursePayload } from "../types/courseTypes";

const API_URL = "https://jmce-assignment.onrender.com/courses";

export const getCourses = async (
  page: number,
  searchTerm: string,
  university?: string | undefined
) => {
  const response = await axios.get(API_URL, {
    params: {
      page: page,
      search: searchTerm,
      university: university || undefined,
      limit: 10,
    },
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
