//jshint esversion:6
const express = require("express");

const app = express();

app.listen(8080, () => {
  console.log("Server started on port 8080");
});

app.get("/", (req, res) => {
  res.send("Holaaa");
});
app.get("/about", (req, res) => {
  res.send("This website is about me");
});
