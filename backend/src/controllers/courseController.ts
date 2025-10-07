import type { Request, Response } from "express";
import { courses as courseData } from "../data/mockCourses.js";
let courses = [...courseData];

export const getCourses = (req: Request, res: Response) => {
  let results = [...courses];
  const { search, university, page = 1, limit = 10 } = req.query;

  // Search functionality
  if (search) {
    results = results.filter((course) =>
      course.title.toLowerCase().includes(String(search).toLowerCase())
    );
  }

  // Filter functionality
  if (university) {
    results = results.filter((course) => course.university === university);
  }

  // Pagination logic
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = pageNum * limitNum;
  const paginatedResults = results.slice(startIndex, endIndex);

  res.json({
    totalPages: Math.ceil(results.length / limitNum),
    currentPage: pageNum,
    courses: paginatedResults,
  });
};

export const getCourseById = (req: Request, res: Response) => {
  const course = courses.find((c) => c.id === parseInt(String(req.params.id)));
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.json(course);
};

export const addCourse = (req: Request, res: Response) => {
  const newCourse = { id: courses.length + 1, ...req.body };
  courses.push(newCourse);
  res.status(201).json(newCourse);
};

export const updateCourse = (req: Request, res: Response) => {
  const index = courses.findIndex(
    (c) => c.id === parseInt(String(req.params.id))
  );
  if (index === -1) {
    return res.status(404).json({ message: "Course not found" });
  }
  courses[index] = { ...courses[index], ...req.body };
  res.json(courses[index]);
};

export const deleteCourse = (req: Request, res: Response) => {
  const courseId = parseInt(String(req.params.id));
  const initialLength = courses.length;
  courses = courses.filter((c) => c.id !== courseId);

  if (courses.length === initialLength) {
    return res.status(404).json({ message: "Course not found" });
  }
  res.status(200).json({ message: "Course deleted successfully" });
};
