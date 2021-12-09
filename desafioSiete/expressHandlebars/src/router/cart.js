import express from "express";
import upload from "../services/uploader.js";
import Container from "../classes/container.js";
import Carrito from "../classes/carrito.js";
import { authMiddleware } from "../utils.js";

const container = new Container();
const carrito = new Carrito();
const router = express.Router();

router.get("/", (req, res) => {
  container.getAll().then((result) => {
    if (result.status === "success") {
      res.status(200).send(result.payload);
    } else {
      res.status(500).send(result.message);
    }
  });
});
router.get("/:pid", (req, res) => {
  const id = parseInt(req.params.pid);
  container.getById(id).then((result) => {
    res.send(result);
  });
});

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

router.post("/", (req, res) => {
  carrito.create().then((result) => {
    res.send(result);
  });
});
router.post("/product", (req, res) => {
  let product = req.body;
  carrito.addProduct(product).then((result) => {
    res.send(result);
  });
});

router.put("/:pid", authMiddleware, (req, res) => {
  const id = parseInt(req.params.pid);
  const body = req.body;
  container.updateProduct(id, body).then((result) => {
    res.send(result);
  });
});
router.delete("/:pid");

export default router;
