-- Create database first
CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;

-- Then create table
CREATE TABLE IF NOT EXISTS mytable (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

-- Insert initial data
INSERT INTO mytable (name) VALUES ('Item 1'), ('Item 2'), ('Item 3');