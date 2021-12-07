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
  container.getById(pid).then((result) => {
    res.send(result);
  });
});

router.post("/", (req, res) => {
  let product = req.body;
  console.log("ESSS", product);
  carrito.create(product).then((result) => {
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
