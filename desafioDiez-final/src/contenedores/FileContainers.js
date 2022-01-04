import fs from "fs";
import config from "../config.js";

export default class FileContainer {
  constructor(file_endpoint) {
    this.url = `${config.fileSystem.baseUrl}${file_endpoint}`;
  }
  getAll = async () => {
    try {
      let data = await fs.promises.readFile(this.url, "utf-8");
      return { status: "success", payload: JSON.parse(data) };
    } catch (error) {
      return {
        status: "Error",
        message: "No se pudo obtener la información " + error
      };
    }
  };
}
