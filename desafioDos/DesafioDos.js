const Container = require("./classes/container");

const container = new Container();

container
  .save({
    title: "Laptop",
    price: 3000.5,
    thumbnail:
      "https://falabella.scene7.com/is/image/FalabellaPE/882255227_1?wid=800&hei=800&qlt=70"
  })
  .then((result) => console.log(result.message));

container
  .save({
    title: "Cellphone",
    price: 1200.5,
    thumbnail:
      "https://falabella.scene7.com/is/image/FalabellaPE/882255227_1?wid=800&hei=800&qlt=70"
  })
  .then((result) => console.log(result.message));

container.getById(1).then((result) => console.log(result));
container.getAll();
//container.deleteById(2);
//container.deleteAll();
