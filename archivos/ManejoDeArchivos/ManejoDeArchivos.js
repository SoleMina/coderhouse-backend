const fs = require("fs");

const data = `{
  id: 1,
  name: "Karina"
}`;

const lectura = fs.readFileSync("./info.txt", "utf-8");

console.log(lectura);

//readFileSync -> lectura de un archivo en forma sincrónica
//writeFileSync -> escritura de un archivo en forma sincrónica
//appendFileSync -> actualización de un archivo en forma sincrónica
//unlinkSync -> borrado de un archivo en forma sincrónica
//mkdirSync -> creación de una carpeta

const tiempo = new Date();
const h = tiempo.getHours();
const m = tiempo.getMinutes();

fs.writeFileSync("./fyh.txt", `${h}:${m}`);
