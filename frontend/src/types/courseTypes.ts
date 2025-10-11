export interface Course {
  id: number;
  title: string;
  level: string;
  duration: string;
  mode_of_study: string;
  description: string;
  fees_uk: number;
  fees_international: number;
  entry_requirements: string;
  modules: string[];
  department_id: number;
  // Fields from JOINs
  department_name: string;
  university_name: string;
  university_id: number;
}

export type CoursePayload = Omit<
  Course,
  "id" | "department_name" | "university_name" | "university_id"
>;

export interface University {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}
