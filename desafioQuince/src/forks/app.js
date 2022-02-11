import express from "express";
import { fork } from "child_process";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("Listening on " + PORT);
});

/*
const suma = () => {
  let suma = 0;
  for (let i = 0; i < 5e9; i++) {
    suma += i;
  }
  return suma;
};
*/
let visits = 0;

app.get("/", (req, res) => {
  visits++;
  res.send(`Visitado ${visits} veces`);
});
app.get("/sum", (req, res) => {
  //const sum = suma();
  const sum = fork("calculus");
  res.send(`El valor de la suma es ${sum}`);
  sum.on("message", (data) => {
    console.log(data);
    res.send(`El valor e la suma es ${data}`);
  });
});
