import { mariadb } from "../config.js";

export default class Productos {
  constructor() {
    mariadb.schema.hasTable("products").then((result) => {
      if (!result) {
        mariadb.schema
          .createTable("products", (table) => {
            table.increments();
            table.string("name").notNullable();
            table.string("description").notNullable();
            table.float("price").notNullable();
            table.string("thumbnail").notNullable();
            table.string("codigo").notNullable();
            table.integer("stock").notNullable().defaultTo(0);
            table.timestamps(true, true);
          })
          .then((result) => {
            console.log("Products table created");
          });
      }
    });
  }
  getProducts = async () => {
    try {
      const products = await mariadb.select().table("products");
      return { status: "success", payload: products };
    } catch (error) {
      return {
        status: "Error",
        message: "No se encontraron productos " + error
      };
    }
  };
  getProductById = async (id) => {
    try {
      const product = await mariadb
        .table("products")
        .select()
        .where("id", id)
        .first();
      if (product) {
        return { status: "success", payload: product };
      } else {
        return {
          status: "Error",
          message: "Product not found"
        };
      }
    } catch (error) {
      return {
        status: "Error",
        message: "Product not found " + error
      };
    }
  };
  registerProduct = async (product) => {
    try {
      const exist = await mariadb
        .table("products")
        .select()
        .where("codigo", product.codigo)
        .first();

      if (exist) {
        return { status: "Error", message: "Product already exist" };
      } else {
        const result = await mariadb.table("products").insert(product);
        return {
          status: "success",
          message: "Product has been registered",
          payload: result
        };
      }
    } catch (error) {
      return { status: "Error", message: "Can't register product " + error };
    }
  };
  updateProduct = async (id, body) => {
    try {
      const productUpdated = await mariadb
        .table("products")
        .where("id", id)
        .update(body)
        .then((result) => {
          console.log(result);
        });
      return {
        status: "success",
        message: "Product updated",
        payload: productUpdated
      };
    } catch (error) {
      console.log(error);
      return {
        status: "Error",
        message: "Product couldn't be updated" + error
      };
    }
  };
  deleteProductById = async (id) => {
    try {
      const prod = await mariadb
        .table("products")
        .del()
        .where("id", id)
        .then((result) => {
          console.log(result);
        });

      return {
        status: "success",
        message: "Product has been deleted",
        payload: prod
      };
    } catch (error) {
      return {
        status: "Error",
        message: "Product couldn't be deleted" + error
      };
    }
  };
}
