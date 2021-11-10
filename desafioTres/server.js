//Import express
const express = require("express");

//Import container
const Container = require("./classes/container");

//Iniciar
const app = express();
const PORT = process.env.PORT || 8080;

//Instanciar container
const container = new Container();

const server = app.listen(PORT, () => {
  console.log("Servidor escuchando en: " + PORT);
});

app.get("/", (req, res) => {
  res.send('Hola, soy Karina y este es el "Desafío Tres"');
});

//Get all products
app.get("/products", (req, res) => {
  console.log(req.query);
  const status = req.query;

  container.getAll().then((result) => {
    //let products = result.payload;
    //res.send(products);
    if (result.status === "success") {
      res.status(200).send(result.payload);
    } else {
      res.status(500).send(result.message);
    }
  });
});

//Get random product
app.get("/productRandom", (req, res) => {
  try {
    container.getRandomProduct().then((result) => {
      let products = result.payload;
      console.log(products);
      if (result.status === "success") {
        res.send(result.payload);
      } else {
        res.send(res.message);
      }
    });
  } catch (error) {
    res.send(res.message);
  }
});
