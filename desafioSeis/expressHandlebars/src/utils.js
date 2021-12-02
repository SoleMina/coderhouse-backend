import { fileURLToPath } from "url";
import { dirname } from "path";

//Crear dirname para simular
const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export default __dirname;
