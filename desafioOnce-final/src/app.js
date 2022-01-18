import express from "express";
import { engine } from "express-handlebars";
import cors from "cors";
import upload from "./services/uploader.js";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import { authMiddleware } from "./utils.js";
import { generate } from "./utils.js";
import { normalize, denormalize, schema } from "normalizr";

import productsRouter from "./router/productsFaker.js";

//Iniciar
const app = express();
const PORT = process.env.PORT || 8080;

export const server = app.listen(PORT, () => {
  console.log("Servidor escuchando en: " + PORT);
});

export const io = new Server(server);

//Import class container
import Container from "./classes/container.js";
import Productos from "./services/Productos.js";
import MessagesTotal from "./services/Messages.js";
const container = new Container();
const productosService = new Productos();
const messagesService = new MessagesTotal();
const admin = true;

app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//Import router
import routerProducts from "./router/productos.js";
import routerCart from "./router/cart.js";

//app.use(upload.single("file"));

//Configurar para indicar que products pueda recibir json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Public
app.use(express.static(__dirname + "/public"));
app.use(cors());

//Middleware manejo de errores
app.use((err, req, res, next) => {
  console.log(err.stack);
});

app.use((req, res, next) => {
  let timestamp = Date.now();
  let time = new Date(timestamp);
  console.log("Petición hecha a las: " + time.toTimeString().split(" ")[0]);
  req.auth = admin;
  next();
});

app.get("/", (req, res) => {
  res.send("Hola, este es el desafío 7");
});

//Middleware Routes
app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);

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

app.get("/view/products", authMiddleware, (req, res) => {
  productosService.getProducts().then((result) => {
    let info = result.payload;
    let preparedObject = {
      products: info
    };
    res.render("products", preparedObject);
  });
});

//Socket
//ON => escuchador de eventos - lado del servidor
io.on("connection", async (socket) => {
  console.log(`El socket ${socket.id} se ha conectado`);
  let products = await productosService.getProducts();
  //Mandar al cliente
  socket.emit("deliverProducts", products);
});

//CREATE CENTRO DE MENSAJES
let messagesCenter = await messagesService.getAllMessages();
//On respuesta y emit => envío
io.on("connection", (socket) => {
  console.log("Cliente conectado");
  socket.emit("messagelog", messagesCenter.payload);
  socket.emit("welcome", "BIENVENIDO A MI SOCKET");
  socket.on("message", async (data) => {
    messagesService.saveMessage(data);
    console.log(messagesCenter.payload, "TESTTTT");
    io.emit("messagelog", messagesCenter.payload);
  });
});

app.post("/api/messages", (req, res) => {
  const msg = req.body;
  messagesService.saveMessage(msg).then((result) => {
    res.send(result);
  });
});
app.get("/api/messages", (req, res) => {
  messagesService.getAllMessages().then((result) => {
    res.send(result);
  });
});

//PRODUCTS FAKER
//PRODUCTS FAKER
app.use("/api/productos-test", new productsRouter());

//postman
app.get("/products-test", (req, res) => {
  let cant = req.query.cant ? parseInt(req.query.cant) : 10;
  let products = generate(cant);
  res.send({ productos: products });
});

//handlebars template
app.get("/view/productos", (req, res) => {
  let cant = req.query.cant ? parseInt(req.query.cant) : 10;
  let products = generate(cant);
  let preparedObject = {
    productos: products
  };
  res.render("productsFaker", preparedObject);
});

//
const text = new schema.Entity("text");
const nombre = new schema.Entity("nombre", {
  text: [text]
});
const avatar = new schema.Entity("avatar");
const mensajes = new schema.Entity("mensajes", {
  nombre: [nombre],
  avatar: [avatar]
});

const normalizedData = normalize(messagesCenter.payload, mensajes);
console.log(JSON.stringify(normalizedData, null, 2));
