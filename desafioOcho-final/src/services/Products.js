import database from "../config.js";

export default class Products {
  constructor() {
    database
      .schema()
      .hasTable("products")
      .then((result) => {
        if (!result) {
          database.schema
            .createTable("products", (table) => {
              table.increments();
              table.string("name").notNullable();
              table.string("description").notNullable();
              table.float("price").notNullable().defaultTo(false);
              table.string("thumbnail").notNullable();
              table.string("codigo").notNullable();
              table.integer("stock").notNullable().defaultTo(false);
              table.timestamps(true, true);
            })
            .then((result) => {
              console.log("Products table created");
            });
        }
      });
  }
  getProducts = async () => {
    const products = await database.select().table("products");
    return { status: "success", payload: products };
  };
}
