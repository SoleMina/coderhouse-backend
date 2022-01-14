import { fileURLToPath } from "url";
import { dirname } from "path";
import faker from "faker";

//Crear dirname para simular
const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export const authMiddleware = (req, res, next) => {
  if (!req.auth) res.status(403).send({ error: -2, message: "No autorizado" });
  else next();
};

export default __dirname;

export const generate = (n) => {
  let productos = [];
  for (let i = 0; i < n; i++) {
    productos.push({
      id: i + 1,
      product_name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.avatar(),
      photo: faker.image.image(),
      photo2: faker.image.imageUrl()
    });
  }
  return productos;
};
