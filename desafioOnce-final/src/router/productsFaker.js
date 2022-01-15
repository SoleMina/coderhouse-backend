import express from "express";
import ContenedorMemoria from "../contenedores/ContenedorMemoria.js";

const contenedorM = new ContenedorMemoria();
export default class productsRouter extends express.Router {
  constructor() {
    super();

    this.get("/", (req, res) => {
      let productos = contenedorM.getAll();
      res.send({ products: productos });
    });
    this.post("/", (req, res) => {
      let productos = contenedorM.generate();
      res.send({ products: productos });
    });
  }
}
