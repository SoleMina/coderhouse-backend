class Usuario {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [];
    this.mascotas = [];
  }
  getFullName() {
    return `Nombre completo: ${this.nombre} ${this.apellido}`;
  }
  addMascota(mascota) {
    this.mascotas.push(mascota);
  }
  countMascotas() {
    return this.mascotas.length;
  }
  addBook(nombre, autor) {
    this.libros.push({
      nombre: nombre,
      autor: autor
    });
  }
  getBookNames() {
    return this.libros.map((libro) => libro.nombre);
  }
}

let usuario1 = new Usuario("Karina", "Prado");
usuario1.getFullName();
console.log(usuario1.getFullName());
usuario1.addMascota("Gato");
usuario1.countMascotas();
console.log("Cantidad de mascotas: " + usuario1.countMascotas());
usuario1.addBook("Harry Potter", "J.K Rowling");
usuario1.getBookNames();
console.log("Nombre de libros: ", usuario1.getBookNames());
console.log(usuario1);

console.log("==============================");

let usuario2 = new Usuario("Sam", "Perez");
usuario2.getFullName();
console.log(usuario2.getFullName());
usuario2.addMascota("Gato");
usuario2.addMascota("Perro");
usuario2.countMascotas();
console.log("Cantidad de mascotas: " + usuario2.countMascotas());
usuario2.addBook("El señor de los anillos", "J.R.R Tolkien");
usuario2.addBook("El señor de los anillos II", "J.R.R Tolkien");
console.log("Nombre de libros: ", usuario2.getBookNames());
console.log(usuario2);
