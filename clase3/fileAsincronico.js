const fs = require("fs");

fs.readFile("package.json", "utf-8", (error, contenido) => {
  if (error) {
    throw new Error(`Error de lectura: ${error}`);
  } else {
    console.log("package.json: Lectura exitosa");

    const info = {
      contenidoStr: contenido,
      contenidoOb: JSON.parse(contenido),
      size: contenido.length
    };
    console.log(info);

    fs.writeFile("informacion.txt", JSON.stringify(info, null, 2), (error) => {
      if (error) {
        throw new Error(`Error de escritura ${error}`);
      }
      //console.log(informacion.txt);
    });
  }
});
