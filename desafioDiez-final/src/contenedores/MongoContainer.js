import mongoose from "mongoose";
import config from "../config.js";
import { productService } from "./model/product.js";

mongoose
  .connect(config.mongo.baseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async (con) => {
    let products = [
      {
        title: "Peluche de Osa",
        description: "Peluche con vestido.",
        price: 200,
        thumbnail: "http://localhost:8080/images/1639083716776Peluche-osa.jpg",
        codigo: "001",
        stock: 20
      },
      {
        title: "Macbook Pro",
        description: "Alta calidad.",
        price: 5432,
        thumbnail: "http://localhost:8080/images/1638291038032mackbook.jpg",
        codigo: "002",
        stock: 10
      },
      {
        title: "Epson",
        description: "Color negro",
        price: 654,
        thumbnail: "http://localhost:8080/images/1638290946082impresora.jpg",
        codigo: "003",
        stock: 25
      },
      {
        title: "Laptop Asus",
        description: "Alta calidad.",
        price: 3000.5,
        thumbnail:
          "https://falabella.scene7.com/is/image/FalabellaPE/882255227_1?wid=800&hei=800&qlt=70",
        codigo: "004",
        stock: 10
      },
      {
        title: "Cellphone",
        description: "Color negro.",
        price: 1200.5,
        thumbnail:
          "https://falabella.scene7.com/is/image/FalabellaPE/882255227_1?wid=800&hei=800&qlt=70",
        codigo: "005",
        stock: 20
      }
    ];

    await productService.insertMany(products);
  })
  .catch((result) => console.log(result));

export default class MongoContainer {
  constructor(collection, schema, timestamps) {
    this.collection = mongoose.model(
      collection,
      new mongoose.Schema(schema, timestamps)
    );
  }
  getAll = async () => {
    try {
      let documents = await this.collection.find().populate("products");
      return { status: "success", payload: documents };
    } catch (error) {
      return {
        status: "Error",
        message: error
      };
    }
  };
  saveOne = async () => {
    try {
      let result = await this.collection.create(object);
      return {
        status: "success",
        message: "creado",
        payload: result
      };
    } catch (error) {
      return {
        status: "error",
        message: "Couldn't create " + error
      };
    }
  };
  AddProductToCart = async (cartId, productId) => {
    try {
      let result = await this.collection.updateOne(
        { _id: cartId },
        { $push: { products: productId } }
      );
      return {
        status: "success",
        message: "Añadido",
        payload: result
      };
    } catch (error) {
      return {
        status: "error",
        message: "Couldn't create " + error
      };
    }
  };
}
