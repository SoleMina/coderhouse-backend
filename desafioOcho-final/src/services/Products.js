import database from "../config.js";

export default class Products {
  constructor() {
    database.schema.hasTable("products").then((result) => {
      if (!result) {
        database.schema
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
      const products = await database.select().table("products");
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
      const product = await database.select().where("id", id).first();
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
      const exist = await database
        .table("products")
        .select()
        .where("codigo", product.codigo)
        .first();

      if (exist) {
        return { status: "Error", message: "Product already exist" };
      } else {
        const result = await database.table("products").insert(product);
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
}
