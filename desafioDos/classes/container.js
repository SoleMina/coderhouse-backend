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
          id: products.length + 1,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail
        };
        products.push(dataObj);

        try {
          await fs.promises.writeFile(
            "./files/productos.txt",
            JSON.stringify(products, null, 2)
          );
          return { status: "success", mesagge: "Producto creado" };
        } catch (error) {
          return { status: "error", mesagge: "No se pudo crear el producto" };
        }
      }
    } catch (error) {
      //El archivo no existe
      let dataObj = {
        id: 1,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail
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
        message: "No se encontró el producto"
      };
    }
  }
  async getAll() {
    try {
      let data = await fs.promises.readFile("./files/productos.txt", "utf-8");
      let products = JSON.parse(data);
      console.log(products);
      return products;
      return { status: "success", mesagge: "Productos encontrados" };
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
        message: "No se encontró el producto"
      };
    }
  }

  async deleteAll() {
    try {
      let products = [];
      await fs.promises.writeFile(
        "./files/productos.txt",
        JSON.stringify(products)
      );

      return { status: "success", mesagge: "Productos eliminados" };
    } catch (error) {
      return {
        status: "Error",
        message: "No se pudo eliminar los productos"
      };
    }
  }
}

module.exports = Container;
