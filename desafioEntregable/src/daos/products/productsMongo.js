import MongoContainer from "../../contenedores/MongoContainer.js";
export default class ProductsMongo extends MongoContainer {
  constructor() {
    super(
      "products",
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        codigo: { type: String, required: true },
        stock: { type: Number, required: true }
      },
      { timestamps: true }
    );
  }
}
