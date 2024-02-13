INSERT INTO department (name) VALUES
    ('Human Resources'),
    ('Finance'),
    ('Marketing'),
    ('Engineering');

INSERT INTO role (title, salary, department_id) VALUES
    ('HR Manager', 60000.00, 1),
    ('Accountant', 50000.00, 2),
    ('Marketing Specialist', 45000.00, 3),
    ('Junior Software Developer', 50000.00, 4),
    ('Lead Software Developer', 100000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
    ('Eleanor', 'Chang', 1, DEFAULT),
    ('Harrison', 'Li', 5, DEFAULT),
    ('Alice', 'Johnson', 3, DEFAULT),
    ('Felix', 'Tran', 4, 2),
    ('David', 'Brown', 2, DEFAULT),
    ('Mia', 'Garcia', 4, 2),
    ('Eli', 'Nguyen', 4, 2),
    ('Giselle', 'Perez', 3, DEFAULT);