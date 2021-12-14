import database from "../config.js";

export default class Products {
  constructor() {
    database
      .schema()
      .hasTable("products")
      .then((result) => {
        if (!result) {
          database.schema.createTable("products", (table) => {
            table.increments();
            table.string("title").notNullable();
          });
        }
      });
  }
}
