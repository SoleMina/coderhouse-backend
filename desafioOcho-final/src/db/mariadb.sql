--Crear base de datos para mariadb --
CREATE DATABASE mariadb;

USE mariadb;


--Código de referencia, creo que no lo piden en el desafío pero en caso de necesitar
--CREATE TABLE (Ejemplo manual, código de referencia, ya está hecho en config y en Productos service)

/* 
CREATE TABLE products (
    ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL,
    PRICE DECIMAL(5,2),
    THUMBNAIL VARCHAR(200) NOT NULL,
    CODIGO VARCHAR(10) NOT NULL,
    STOCK INT NOT NULL,
    CREATED TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
INSERT INTO products (NAME, PRICE, THUMBNAIL, CODIGO, STOCK)
            VALUES ("Peluche rosa", 255.0, "http://localhost:8080/images/1639668510336pelucherosa.jpg", "001", 20),
                   ("Macbook Pro", 4500.0, "http://localhost:8080/images/1639668451418mackbook.jpg", "002", 10),
                   ("Impresors Epson", 955.0, "http://localhost:8080/images/1639668481677impresora.jpg", "003", 40);

 */