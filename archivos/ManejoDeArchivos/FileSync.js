const fs = require("fs");

const EscribirArchivo = (nombreArchivo, data) => {
  try {
    fs.writeFileSync(nombreArchivo, data);
    return "OK";
  } catch (error) {
    throw new Error(`Error en lectura: ${error.message}`);
  }
};

const LeerArchivo = (nombreArchivo) => {
  try {
    const contenido = fs.readFileSync(nombreArchivo, "utf-8");
    return contenido;
  } catch (error) {
    throw new Error(`Error en lectura: ${error.message}`);
  }
};

const tutores = [
  {
    nombre: "Nicolas Kenny",
    puesto: "Full Stack Developer",
    empresa: "Grupo SBS"
  },
  {
    nombre: "Ivan Arevalo",
    puesto: "Full Stack Developer",
    empresa: "Mercado Libre"
  }
];
const jsonTutores = "tutores.json";
EscribirArchivo(jsonTutores, JSON.stringify(tutores));

const agregarTutor = (tutor) => {
  const tutoresActuales = JSON.parse(LeerArchivo(jsonTutores));
  const tutoresNuevos = [...tutoresActuales, tutor];
  EscribirArchivo(jsonTutores, JSON.stringify(tutoresNuevos));
  return "Agregado ok";
};

agregarTutor({
  nombre: "Mauricio Espina Flores",
  puesto: "Backend Developer",
  empresa: "Globant"
});

const tutorePostAgregar = LeerArchivo(jsonTutores);
console.log(JSON.parse(tutorePostAgregar));
