INSERT INTO universities (name, location) VALUES ('University of Manchester', 'Manchester, UK') ON CONFLICT (name) DO NOTHING;

DO $$
DECLARE manchester_uni_id INTEGER;
BEGIN
    SELECT id INTO manchester_uni_id FROM universities WHERE name = 'University of Manchester';

    
    INSERT INTO departments (name, university_id) VALUES ('Department of Computer Science', manchester_uni_id);
END $$;

DO $$
DECLARE cs_dept_id INTEGER;
BEGIN
    SELECT id INTO cs_dept_id FROM departments WHERE name = 'Department of Computer Science';

   
    INSERT INTO courses (title, duration, mode_of_study, description, fees_uk, fees_international, entry_requirements, modules, department_id) VALUES
    (
        'MSc Advanced Computer Science',
        '1 year',
        'Full-time',
        'A course for students who already have a strong background in computer science and wish to specialise in advanced topics.',
        15500,
        32000,
        'A First or Upper Second Class Honours degree (or international equivalent) in Computer Science.',
        ARRAY['Advanced Algorithms', 'Cryptography and Data Security', 'Machine Learning', 'Cloud Computing'],
        cs_dept_id
    ),
    (
        'MSc Artificial Intelligence',
        '1 year',
        'Full-time',
        'Focuses on the theory and application of artificial intelligence, with a strong emphasis on machine learning and robotics.',
        15500,
        32000,
        'A good Honours degree in a numerate discipline (e.g. Computer Science, Mathematics, Physics).',
        ARRAY['Foundations of AI', 'Natural Language Processing', 'Computer Vision', 'Robotics and Autonomous Systems'],
        cs_dept_id
    ),
    (
        'MSc Data and Knowledge Management',
        '1 year',
        'Full-time',
        'This pathway explores the principles and technologies underpinning the management of data and knowledge in modern organisations.',
        14000,
        30000,
        'An Honours degree in Computer Science or a related subject with a significant computing component.',
        ARRAY['Database Systems', 'Big Data Analytics', 'Information Retrieval', 'Semantic Web Technologies'],
        cs_dept_id
    ),
    (
        'MSc Software Engineering',
        '1 year',
        'Full-time',
        'Covers the advanced principles of software design, development, and maintenance for large-scale systems.',
        14500,
        31000,
        'A good Honours degree in a subject with a substantial software development component.',
        ARRAY['Agile Software Development', 'Software Architecture', 'DevOps and Continuous Delivery', 'Software Testing and Quality Assurance'],
        cs_dept_id
    );
END $$;