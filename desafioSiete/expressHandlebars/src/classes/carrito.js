import fs from "fs";
import __dirname from "../utils.js";
//import Container from "./container.js";

const cartURL = __dirname + "/files/carrito.txt";

class Carrito {
  async create(product) {
    try {
      let newCarrito = [];

      //Time
      const timestamp = Date.now();
      const time = new Date(timestamp);
      const carritoTime = time.toTimeString().split(" ")[0];

      let dataObj = {
        id: cart.length + 1,
        timestamp: carritoTime,
        products: newCarrito
      };

      try {
        await fs.promises.writeFile(cartURL, JSON.stringify(dataObj, null, 2));
        return { status: "success", message: "Producto creado" };
      } catch (error) {
        return { status: "error", message: "No se pudo crear el producto" };
      }
    } catch {
      //Time
      const timestamp = Date.now();
      const time = new Date(timestamp);
      const carritoTime = time.toTimeString().split(" ")[0];

      let newCarrito = [];

      let dataObj = {
        id: 1,
        timestamp: carritoTime,
        products: newCarrito
      };

      try {
        await fs.promises.writeFile(cartURL, JSON.stringify(dataObj, null, 2));
        return { status: "success", message: "Carrito creado con éxito" };
      } catch (error) {
        return {
          status: "error",
          message: "No se pudo crear el carrito: " + error
        };
      }
    }
  }
  async addProduct(product) {
    try {
      let data = await fs.promises.readFile(cartURL, "utf-8");
      let cart = JSON.parse(data);

      let newCarrito = [];

      const timestamp = Date.now();
      const time = new Date(timestamp);
      const carritoTime = time.toTimeString().split(" ")[0];

      newCarrito = [...carrito, product];

      products = newCarrito;
      cart = [...cart, dataObj];

      try {
        await fs.promises.writeFile(cartURL, JSON.stringify(cart, null, 2));
        return { status: "success", message: "Producto creado" };
      } catch (error) {
        return { status: "error", message: "No se pudo crear el producto" };
      }
    } catch {
      return {
        status: "error",
        message: "No se pudo crear el carrito: " + error
      };
    }
  }
}

export default Carrito;
