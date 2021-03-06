--DROP DATABASE IF EXISTS to see all the code in MySQL Workbench--
DROP DATABASE IF EXISTS employees_datebase;
-- create datebase--
CREATE database employees_datebase;

USE employees_datebase;


-- create table for deparment-
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- create table fpr role--
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 4) NOT NULL,
    department_id INT NOT NULL,

-- create primary key for id--
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
-- create table fpr employee
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,

        PRIMARY KEY (id),
        FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
        FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);