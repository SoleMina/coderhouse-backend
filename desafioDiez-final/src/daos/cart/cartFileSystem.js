import FileContainer from "../../contenedores/FileContainers.js";

export default class cartFileSystem extends FileContainer {
  constructor() {
    super("carrito.txt");
  }
}
