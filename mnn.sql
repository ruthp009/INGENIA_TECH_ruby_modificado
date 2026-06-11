CREATE DATABASE IngeniaTech;
USE IngeniaTech;
USE IngeniaTech;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

INSERT INTO usuarios (nombre, email)
VALUES
('Juan Pérez', 'juan@gmail.com'),
('María López', 'maria@gmail.com'),
('Gabriel Rodríguez', 'gabriel@gmail.com');
