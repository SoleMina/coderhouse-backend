const fs = require("fs");

fs.promises
  .readFile("informacion.txt", "utf-8")
  .then((contenido) => {
    console.log("informacion.txt : Lectura exitosa");

    const info = JSON.parse(contenido);
    console.log(info);

    const pJson = info.contenidoOb;
    pJson.name = "Clase";

    fs.promises
      .writeFile("informacion2.txt", JSON.stringify(pJson, null, 2))
      .then(() => console.log("Escritura exitosa"))
      .catch((error) => console.log(`Error ${error}`));
  })
  .catch((error) => console.log(`Error ${error}`));
