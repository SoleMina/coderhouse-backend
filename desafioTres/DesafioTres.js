const Container = require("./classes/container");

const container = new Container();

container
  .save({
    title: "Ipad Pro",
    price: 3200.5,
    thumbnail:
      "https://falabella.scene7.com/is/image/FalabellaPE/882255227_1?wid=800&hei=800&qlt=70"
  })
  .then((result) => console.log(result.message));

container.getById(1).then((result) => console.log(result));
container.getAll();
container.getRandomProduct().then((result) => console.log(result.payload));
//container.deleteById(2);
//container.deleteAll();
