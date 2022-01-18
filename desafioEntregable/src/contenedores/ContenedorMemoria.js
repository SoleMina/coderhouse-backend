import { generate } from "../utils.js";

export default class ContenedorMemoria {
  constructor() {
    this.products = [];
  }
  generate(cant = 50) {
    const pt = generate(cant);
    this.products.concat(pt);
    return pt;
  }
  getAll() {
    return this.products;
  }
}
