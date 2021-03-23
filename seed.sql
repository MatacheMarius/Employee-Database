INSERT INTO department (name)
VALUES 
("IT"), 
("Public Relations"), 
("Human Resource Management");

INSERT INTO role (title, salary, department_id)
VALUES
("Manager", "100000.00","1"), 
("Senior Developer", "80.000", "2"), 
("System Administrator", "70.000", "3"), 
("Product Development", "60.000", "1"), 
("Junior Developer", "55.000", "2"), 
("Inter", "50.000", "3");

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
("Adolf", "Hitler", "1"), 
("Vladimir", "Putin", "2"), 
("Donald", "Trump", "3");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Jon", "Rockefeller", "4", "1"), 
("Bill", "Gates", "5", "2"), 
("Aleksander", "Lodighin", "6", "3");