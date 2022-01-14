"use strict";

import express from "express";
import ContenedorMemoria from "../contenedores/ContenedorMemoria.js";

const contenedor = new ContenedorMemoria();
export default class ProductsRouter extends express.Router {
  constructor() {
    super();

    this.get("/", (req, res) => {
      let products = contenedor.getAll();
      res.send({ products: products });
    });
    this.post("/", (req, res) => {
      let products = contenedor.generate();
      res.send({ products: products });
    });
  }
}
