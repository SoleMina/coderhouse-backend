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

//Almacenar archivos con multer(configuración de almacenamiento)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });
app.use(upload.single("file"));

//Configurar para indicar que products pueda recibir json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Public
app.use("/imagenes", express.static(__dirname + "/public"));
app.use(cors());

//Middleware manejo de errores
app.use((err, req, res, next) => {
  console.log(err.stack);
  escape.status(500).send("Error en el servidor");
});

app.use((req, res, next) => {
  let timestamp = Date.now();
  let time = new Date(timestamp);
  console.log("Petición hecha a las: " + time.toTimeString().split(" ")[0]);
  next();
});

app.get("/", (req, res) => {
  res.send("Hola, este es el desafío 4");
});
//Middleware
app.use("/api/products", routerProducts);

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

//Se envía como un form data
app.post("/api/uploadfile", upload.single("file"), (req, res) => {
  const files = req.file;
  if (!files || files.length === 0) {
    res.status(500).send({ message: "No se subió el archivo" });
  }
  res.send(files);
});
