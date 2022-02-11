import FileContainer from "../../contenedores/FileContainers.js";

export default class productFileSystem extends FileContainer {
  constructor() {
    super("productos.txt");
  }
}
