-- Crear base de datos
CREATE DATABASE IF NOT EXISTS calendario;
USE calendario;

-- Crear tabla de eventos
CREATE TABLE IF NOT EXISTS eventos (
    identificador INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL
);