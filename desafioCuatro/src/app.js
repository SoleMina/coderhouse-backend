const express = require("express");
const cors = require("cors");
const multer = require("multer");

//Iniciar
const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log("Servidor escuchando en: " + PORT);
});

//Import class container
const Container = require("./classes/container");
const container = new Container();

//Import router
const routerProducts = require("./router/productos");

//Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

//Configurar para indicar que products pueda recibir json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Public
app.use("/imagenes", express.static(__dirname + "/public"));
app.use(cors());

//Middleware
app.use("/api/products", routerProducts);

//Middleware manejo de errores
app.use((err, req, res, next) => {
  console.log(err.stack);
  escape.status(500).send("Error en el servidor");
});

app.get("/", (req, res) => {
  res.send('Hola, soy Karina y este es el "Desafío Cuatro"');
});
app.get("/api/productRandom", (req, res) => {
  try {
    container.getRandomProduct().then((result) => {
      let products = result.payload;
      console.log(products);
      if (result.status === "success") {
        console.log("RESULT", result);
        res.send(result.payload);
      } else {
        res.send(res.message);
      }
    });
  } catch (error) {
    res.send(res.message);
  }
});

//Se evnía como un form data
app.post("/api/uploadfile", upload.single("file"), (req, res) => {
  const files = req.file;
  if (!files || files.length === 0) {
    res.status(500).send({ message: "No se subió el archivo" });
  }
  res.send(files);
});
