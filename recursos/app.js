const express = require("express");
//import Manager
const Manager = require("./classes/Manager");

//Iniciar
const app = express();
const PORT = process.env.PORT || 8080;

//Glitch .com -- process.env.PORT = 30000

const manager = new Manager();

const server = app.listen(PORT, () => {
  console.log("Servidor escuchando en: " + PORT);
});

app.get("/", (req, res) => {
  response.send("Hola mundo");
});

app.get("/eventos", (req, res) => {
  console.log(req.query);
  const status = req.query;
  manager.getAllEvents().then((result) => {
    if (result.status === "success") {
      //res.status(200).send(result.payload);
      let eventos = result.payload;
      let eventosFiltrados = eventos.filter((evento) => {
        evento.status === status;
      });
      if (eventosFiltrados.length > 0) {
        res.send("Eventos filtrados");
      } else {
        res.status(404).send("No hay eventos disponibles");
      }
    } else {
      res.status(500).send(result.message);
    }
  });
});

app.get("/users", (req, res) => {
  manager.getAllUsers().then((result) => {
    res.send(result.payload);
  });
});

app.get("/users/:uid", (req, res) => {
  const userId = req.params.uid;
  manager.getUserById(userId).then((result) => {
    res.send(result);
  });
});

/*
app.get("/users", async (req, res) => {
  let usuarios = await manager.getAllUsers();
  res.send(usuarios);
});
*/
