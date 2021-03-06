const fs = require("fs");

class Container {
  async save(product) {
    try {
      let data = await fs.promises.readFile("./files/productos.txt", "utf-8");
      let products = JSON.parse(data);
      if (products.some((pro) => pro.title === product.title)) {
        return { status: "error", message: "El producto ya existe" };
      } else {
        let dataObj = {
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          id: products.length + 1
        };
        products = [...products, dataObj];

        try {
          await fs.promises.writeFile(
            "./files/productos.txt",
            JSON.stringify(products, null, 2)
          );
          return { status: "success", message: "Producto creado" };
        } catch (error) {
          return { status: "error", message: "No se pudo crear el producto" };
        }
      }
    } catch (error) {
      //El archivo no existe
      let dataObj = {
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        id: 1
      };

      try {
        await fs.promises.writeFile(
          "./files/productos.txt",
          JSON.stringify([dataObj], null, 2)
        );
        return { status: "success", message: "Producto creado con éxito" };
      } catch (error) {
        return {
          status: "error",
          message: "No se pudo crear el producto: " + error
        };
      }
    }
  }
  async getById(id) {
    try {
      let data = await fs.promises.readFile("./files/productos.txt", "utf-8");
      let products = JSON.parse(data);
      let product = products.filter((product) => product.id === id);
      if (product) {
        return { status: "success", product: product };
      } else {
        return {
          status: "error",
          product: null,
          message: "Producto no encontrado"
        };
      }
    } catch (error) {
      return {
        status: "Error",
        message: "No se encontró el producto " + error
      };
    }
  }
  async getAll() {
    try {
      let data = await fs.promises.readFile("./files/productos.txt", "utf-8");
      let products = JSON.parse(data);
      console.log(products);
      return {
        status: "success",
        message: "Productos encontrados",
        payload: products
      };
    } catch (error) {
      return {
        status: "Error",
        message: "No se encontró los productos"
      };
    }
  }
  async deleteById(id) {
    try {
      //Read file to get products array and delete the product by Id
      let data = await fs.promises.readFile("./files/productos.txt", "utf-8");
      let products = JSON.parse(data);
      let result = products.filter((product) => product.id !== id);
      products = result;

      //Write the file with the new array
      await fs.promises.writeFile(
        "./files/productos.txt",
        JSON.stringify(products, null, 2)
      );
      return { status: "success", mesagge: "Producto eliminado" };
    } catch (error) {
      return {
        status: "Error",
        message: "No se encontró el producto " + error
      };
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile("./files/productos.txt", JSON.stringify([]));

      return { status: "success", mesagge: "Productos eliminados" };
    } catch (error) {
      return {
        status: "Error",
        message: "No se pudo eliminar los productos " + error
      };
    }
  }
  async getRandomProduct() {
    try {
      let data = await fs.promises.readFile("./files/productos.txt", "utf-8");
      let products = JSON.parse(data);
      let randomNumber = Math.floor(Math.random() * products.length);
      console.log(randomNumber);
      let randomProduct = products[randomNumber];
      return {
        status: "success",
        message: "Producto encontrado",
        payload: randomProduct
      };
    } catch (error) {
      return {
        status: "Error",
        message: "No se pudo encontrar el producto" + error
      };
    }
  }
}

module.exports = Container;
