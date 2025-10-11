
TRUNCATE TABLE courses, departments, universities RESTART IDENTITY CASCADE;

-- UNIVERSITY OF MANCHESTER

INSERT INTO universities (name, location) VALUES ('University of Manchester', 'Manchester, UK') ON CONFLICT (name) DO NOTHING;


DO $$
DECLARE
    uni_id INTEGER;
    dept_id INTEGER;
BEGIN
    
    SELECT id INTO uni_id FROM universities WHERE name = 'University of Manchester';

    
    INSERT INTO departments (name, university_id) VALUES ('Department of Computer Science', uni_id) RETURNING id INTO dept_id;

    
    INSERT INTO courses (title, level, duration, mode_of_study, description, fees_uk, fees_international, entry_requirements, modules, department_id) VALUES
    (
        'MSc Advanced Computer Science',
        'MSc',
        '1 year',
        'Full-time',
        'A course for students who already have a strong background in computer science and wish to specialise in advanced topics.',
        15500,
        32000,
        'A First or Upper Second Class Honours degree (or international equivalent) in Computer Science.',
        ARRAY['Advanced Algorithms', 'Cryptography and Data Security', 'Machine Learning', 'Cloud Computing'],
        dept_id
    ),
    (
        'MSc Artificial Intelligence',
        'MSc',
        '1 year',
        'Full-time',
        'Focuses on the theory and application of artificial intelligence, with a strong emphasis on machine learning and robotics.',
        15500,
        32000,
        'A good Honours degree in a numerate discipline (e.g. Computer Science, Mathematics, Physics).',
        ARRAY['Foundations of AI', 'Natural Language Processing', 'Computer Vision', 'Robotics and Autonomous Systems'],
        dept_id
    );
END $$;



-- IMPERIAL COLLEGE LONDON

INSERT INTO universities (name, location) VALUES ('Imperial College London', 'London, UK') ON CONFLICT (name) DO NOTHING;


DO $$
DECLARE
    uni_id INTEGER;
    dept_id INTEGER;
BEGIN
    
    SELECT id INTO uni_id FROM universities WHERE name = 'Imperial College London';

    
    INSERT INTO departments (name, university_id) VALUES ('Business School', uni_id) RETURNING id INTO dept_id;

    
    INSERT INTO courses (title, level, duration, mode_of_study, description, fees_uk, fees_international, entry_requirements, modules, department_id) VALUES
    (
        'MSc Business Analytics',
        'MSc',
        '1 year',
        'Full-time',
        'Combines business understanding with data science to prepare students for careers in analytics.',
        37500,
        45000,
        'A strong quantitative undergraduate degree. GMAT/GRE may be required.',
        ARRAY['Data Structures and Algorithms', 'Predictive Analytics', 'Business Intelligence', 'Data Visualisation'],
        dept_id
    ),
    (
        'MSc Finance',
        'MSc',
        '1 year',
        'Full-time',
        'A highly-ranked programme covering investment, corporate finance, and financial markets.',
        41000,
        49500,
        'A first-class degree from a quantitative discipline. Relevant work experience is beneficial.',
        ARRAY['Investment and Portfolio Management', 'Corporate Finance', 'Derivatives', 'Financial Econometrics'],
        dept_id
    ),
    (
        'MSc Strategic Marketing',
        'MSc',
        '1 year',
        'Full-time',
        'A programme designed to turn recent graduates into future marketing leaders, blending traditional principles with digital innovation.',
        35000,
        41000,
        'A 2:1 degree in any discipline. A passion for marketing is essential.',
        ARRAY['Marketing Strategy', 'Consumer Behaviour', 'Digital Marketing', 'Brand Management'],
        dept_id
    );
END $$;