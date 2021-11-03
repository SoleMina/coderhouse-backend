// let mi_array = [2,3,4,5,6,7,8];
// mi_array.map(x => x*x).forEach(x=> console.log(x));

let hasta = 10000;
let obj = {};

let productos = [
  { id: 1, nombre: "Escuadra", precio: 323.45 },
  { id: 2, nombre: "Calculadora", precio: 234.56 },
  { id: 3, nombre: "Globo Terráqueo", precio: 45.67 },
  { id: 4, nombre: "Paleta Pintura", precio: 456.78 },
  { id: 5, nombre: "Reloj", precio: 67.89 },
  { id: 6, nombre: "Agenda", precio: 78.9 }
];

let res = productos.reduce((prev, obj, i) => {
  if (i == 0) {
    return {
      nombre: obj.nombre
    };
  } else {
    return {
      nombre: prev.nombre + ", " + obj.nombre
    };
  }
}, {});

console.log(res);
