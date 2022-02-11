import MongoContainer from "../../contenedores/MongoContainer.js";
import Schema from "mongoose";

export default class CartMongo extends MongoContainer {
  constructor() {
    super(
      "cart",
      {
        products: {
          type: [
            {
              type: Schema.Types.ObjectId,
              ref: "products",
              default: null
            }
          ],
          default: []
        }
      },
      { timestamps: true }
    );
  }
}
