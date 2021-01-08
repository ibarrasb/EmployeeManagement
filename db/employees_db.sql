CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE employee (
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL


)
CREATE TABLE roles(
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,

)
CREATE TABLE department(
    name VARCHAR(30) NOT NUll

)