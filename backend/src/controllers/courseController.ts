import type { Request, Response } from "express";
import pool from "../config/db.js";

export const getCourses = async (req: Request, res: Response) => {
  const { search, duration, mode, universityId } = req.query;
  let query = `
        SELECT c.*, d.name as department_name, u.name as university_name
        FROM courses c
        JOIN departments d ON c.department_id = d.id
        JOIN universities u ON d.university_id = u.id
        WHERE 1=1
    `;
  const params = [];
  let paramIndex = 1;

  if (search) {
    query += ` AND c.title ILIKE $${paramIndex++}`;
    params.push(`%${search}%`);
  }
  if (duration) {
    query += ` AND c.duration = $${paramIndex++}`;
    params.push(duration);
  }
  if (mode) {
    query += ` AND c.mode_of_study = $${paramIndex++}`;
    params.push(mode);
  }

  if (universityId) {
    query += ` AND u.id = $${paramIndex++}`;
    params.push(universityId);
  }

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  const query = `
        SELECT c.*, d.name as department_name, u.name as university_name
        FROM courses c
        JOIN departments d ON c.department_id = d.id
        JOIN universities u ON d.university_id = u.id
        WHERE c.id = $1
    `;
  try {
    const result = await pool.query(query, [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const addCourse = async (req: Request, res: Response) => {
  const {
    title,
    duration,
    mode_of_study,
    description,
    fees_uk,
    fees_international,
    entry_requirements,
    modules,
    department_id,
  } = req.body;

  const query = `
        INSERT INTO courses 
        (title, duration, mode_of_study, description, fees_uk, fees_international, entry_requirements, modules, department_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
        RETURNING *;
    `;
  const values = [
    title,
    duration,
    mode_of_study,
    description,
    fees_uk,
    fees_international,
    entry_requirements,
    modules,
    department_id,
  ];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(401).json({ message: "No Course ID received" });
  }
  const {
    title,
    duration,
    mode_of_study,
    description,
    fees_uk,
    fees_international,
    entry_requirements,
    modules,
    department_id,
  } = req.body;

  const query = `
        UPDATE courses 
        SET title = $1, duration = $2, mode_of_study = $3, description = $4, fees_uk = $5, 
        fees_international = $6, entry_requirements = $7, modules = $8, department_id = $9
        WHERE id = $10
        RETURNING *;
    `;
  const values = [
    title,
    duration,
    mode_of_study,
    description,
    fees_uk,
    fees_international,
    entry_requirements,
    modules,
    department_id,
    id,
  ];

  try {
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(401).json({ message: "No Course ID received" });
  }

  const query = "DELETE FROM courses WHERE id = $1;";

  try {
    const result = await pool.query(query, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUniversities = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT id, name FROM universities ORDER BY name ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getDepartmentsByUniversity = async (
  req: Request,
  res: Response
) => {
  const { universityId } = req.params;
  if (!universityId) {
    res.status(401).json({ message: "No University ID received" });
  }
  try {
    const result = await pool.query(
      "SELECT id, name FROM departments WHERE university_id = $1 ORDER BY name ASC",
      [universityId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
