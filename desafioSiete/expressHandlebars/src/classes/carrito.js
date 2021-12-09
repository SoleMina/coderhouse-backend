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

  async getAllProducts() {
    try {
      let data = await fs.promises.readFile(cartURL, "utf-8");
      data = JSON.parse(data);
      let products = data[0].products;
      console.log("EPPP", products);
      return {
        status: "success",
        message: "Productos encontrados",
        payload: products
      };
    } catch (error) {
      return {
        status: "Error",
        message: "No se encontró los productos" + error
      };
    }
  }
  async getProductById(id) {
    try {
      let data = await fs.promises.readFile(cartURL, "utf-8");
      data = JSON.parse(data);
      let products = data[0].products;
      console.log(products);

      let pid = parseInt(id);

      //filter devuelve array, por eso usamos find ya que devuelve el valor como tal, en este caso objeto
      let index = products.findIndex((product) => product.id === pid);
      let productSelected = products[index];
      if (products.length > 0) {
        if (productSelected) {
          return { status: "success", payload: productSelected };
        } else {
          return {
            status: "error",
            product: null,
            message: "Producto no encontrado1"
          };
        }
      } else {
        return {
          status: "error",
          product: null,
          message: "Producto no encontrado2"
        };
      }
    } catch (error) {
      return {
        status: "Error",
        message: "No se encontró el producto " + error
      };
    }
  }
}

export default Carrito;
