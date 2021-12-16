import express from "express";
import upload from "../services/uploader.js";
import Container from "../classes/container.js";
import { io } from "../app.js";
import { authMiddleware } from "../utils.js";
//import Products from "../services/Products.js";
import Productos from "../services/Productos.js";

const container = new Container();
const router = express.Router();
//const productsService = new Products();
const productosService = new Productos();

//GETS
router.get("/", authMiddleware, (req, res) => {
  productosService.getProducts().then((result) => {
    if (result.status === "success") {
      res.status(200).send(result);
    } else {
      res.status(500).send(result.message);
    }
  });
});

router.get("/:pid", (req, res) => {
  let id = parseInt(req.params.pid);
  productosService.getProductById(id).then((result) => {
    res.send(result);
  });
});

//POSTS
router.post("/", authMiddleware, upload.single("image"), (req, res) => {
  let file = req.file;
  let product = req.body;
  console.log(product);
  product.thumbnail =
    req.protocol + "://" + req.hostname + ":8080" + "/images/" + file.filename;
  //req.protocol +"://" + req.hostname + ":8080" + "/resources/images/" + file.filename;

  if (
    !product.name ||
    !product.description ||
    !product.price ||
    !product.codigo
  )
    return res.send({ status: "Error", message: "Datos incompletos" });

  productosService.registerProduct(product).then((result) => {
    res.send(result);

    if (result.status === "success") {
      productosService.getProducts().then((result) => {
        io.emit("deliverProducts", result);
      });
    }
  });
});

//PUTS
router.put("/:pid", authMiddleware, (req, res) => {
  let id = parseInt(req.params.pid);
  let body = req.body;
  productosService.updateProduct(id, body).then((result) => {
    res.send(result);
  });
});

//DELETES
router.delete("/:pid", authMiddleware, (req, res) => {
  let id = parseInt(req.params.pid);
  productosService.deleteProductById(id).then((result) => {
    res.send(result);
  });
});

export default router;
