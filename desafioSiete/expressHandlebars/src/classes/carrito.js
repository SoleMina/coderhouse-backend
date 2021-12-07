import fs from "fs";
import __dirname from "../utils.js";
//import Container from "./container.js";

const cartURL = __dirname + "/files/carrito.txt";

class Carrito {
  async create() {
    try {
      //Time
      const timestamp = Date.now();
      const time = new Date(timestamp);
      const carritoTime = time.toTimeString().split(" ")[0];

      let dataObj = {
        id: cart.length + 1,
        timestamp: carritoTime,
        products: []
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
      let dataObj = {
        id: 1,
        timestamp: carritoTime,
        products: []
      };

      try {
        await fs.promises.writeFile(
          cartURL,
          JSON.stringify([dataObj], null, 2)
        );
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
      data = JSON.parse(data);
      data[0].products = [...data[0].products, product];

      try {
        await fs.promises.writeFile(cartURL, JSON.stringify(data, null, 2));
        return { status: "success", message: "Producto creado" };
      } catch (error) {
        return { status: "error", message: "No se pudo crear el productoooo" };
      }
    } catch (error) {
      return {
        status: "error",
        message: "No se pudo crear el carrito: " + error
      };
    }
  }
}

export default Carrito;
