import express from "express";
import { engine } from "express-handlebars";
import cors from "cors";
import upload from "./services/uploader.js";

//Iniciar
const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log("Servidor escuchando en: " + PORT);
});

//Import class container
import Container from "./classes/container.js";
const container = new Container();

app.engine("handlebars", engine());
app.set("views", "./views");
app.set("view engine", "handlebars");

//Import router
import routerProducts from "./router/productos.js";

//app.use(upload.single("file"));

//Configurar para indicar que products pueda recibir json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Public
app.use(express.static("public"));
app.use(cors());

//Middleware manejo de errores
app.use((err, req, res, next) => {
  console.log(err.stack);
});

app.use((req, res, next) => {
  let timestamp = Date.now();
  let time = new Date(timestamp);
  console.log("Petición hecha a las: " + time.toTimeString().split(" ")[0]);
  next();
});

app.get("/", (req, res) => {
  res.send("Hola, este es el desafío 5");
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
app.post(
  "/api/uploadfile",
  upload.fields([
    {
      name: "file",
      maxCount: 1
    },
    {
      name: "documents",
      maxCount: 3
    }
  ]),
  (req, res) => {
    const files = req.files;
    console.log(files);
    if (!files || files.length === 0) {
      res.status(500).send({ messsage: "No se subió archivo" });
    }
    res.send(files);
  }
);

app.get("/view/products", (req, res) => {
  container.getAll().then((result) => {
    let info = result.payload;
    let preparedObject = {
      products: info
    };
    res.render("products", preparedObject);
  });
});
