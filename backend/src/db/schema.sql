DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS universities;


CREATE TABLE universities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    location VARCHAR(255)
);


CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    university_id INTEGER NOT NULL REFERENCES universities(id) ON DELETE CASCADE
);


CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    level VARCHAR(50) DEFAULT 'MSc',
    duration VARCHAR(100),
    mode_of_study VARCHAR(100), 
    description TEXT,
    fees_uk INTEGER,
    fees_international INTEGER,
    entry_requirements TEXT,
    modules TEXT[], 
    department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE
);


CREATE INDEX idx_departments_university_id ON departments(university_id);
CREATE INDEX idx_courses_department_id ON courses(department_id);