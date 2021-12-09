import express from "express";
import Carrito from "../classes/carrito.js";
import Container from "../classes/container.js";
import { authMiddleware } from "../utils.js";
const carrito = new Carrito();
const container = new Container();
const router = express.Router();

//Get all products added to the cart
router.get("/products", (req, res) => {
  carrito.getAllProducts().then((result) => {
    res.send(result.payload);
  });
});
//Get product from the cart by id
router.get("/:pid/products", (req, res) => {
  let id = req.params.pid;
  carrito.getProductById(id).then((result) => {
    res.send(result);
  });
});

//Create a cart
router.post("/", (req, res) => {
  carrito.create().then((result) => {
    res.send(result);
  });
});

//Add product by id product to cart
router.post("/:pid/products", (req, res) => {
  let id = parseInt(req.params.pid);
  carrito.addProduct(id).then((result) => {
    res.send(result);
  });
});

//Delete cart by id
router.delete("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  carrito.deleteCartById(id).then((result) => {
    res.send(result.payload);
  });
});

//Delete product by cart id and product id
router.delete("/:pid/products/:pid_prod", (req, res) => {
  let idCart = parseInt(req.params.pid);
  let idProduct = parseInt(req.params.pid_prod);
  carrito.deleteProductById(idCart, idProduct).then((result) => {
    res.send(result.payload);
  });
});

export default router;
