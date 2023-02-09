USE employees_db;

INSERT INTO departments (title) VALUES
	('Management'),
    ('Information Technology');
INSERT INTO roles (title, salary, department_id) VALUES
	('General Manager', 110000, 1),
    ('Manager', 65000, 1),
    ('Software Developer', 60000, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
	('John', 'Doe', 1, NULL),
    ('Jane', 'Doe', 2, 1),
    ('Jack', 'Trout', 3, NULL);