import express from "express";
import { engine } from "express-handlebars";
import cors from "cors";
import upload from "./services/uploader.js";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import { authMiddleware } from "./utils.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import ios from "socket.io-express-session";
import { messageService, userService } from "./services/services.js";

//Iniciar
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("Servidor escuchando en: " + PORT);
});

export const io = new Server(server);

//Import class containers
import Container from "./contenedores/container.js";
const container = new Container();
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

const baseSession = session({
  store: MongoStore.create({
    mongoUrl:
      "mongodb+srv://kprado:Universitaria137@adoptme.z5s7h.mongodb.net/sessions?retryWrites=true&w=majority"
  }),
  resave: false,
  saveUninitialized: false,
  secret: "CoderChat"
});

app.use(baseSession);
io.use(ios(baseSession));

app.get("/currentUser", (req, res) => {
  res.send(req.session.user);
});
app.post("/register", async (req, res) => {
  let user = req.body;
  let result = await userService.save(user);
  res.send({ message: "User created", user: result });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send({ error: "Incomplete fields" });
  const user = await userService.getBy({ email: email }); //Obtengo al usuario ya de la DB
  if (!user) return res.status(404).send({ error: "User not found" });
  if (user.password !== password)
    return res.status(400).send({ error: "Incorrect Password" });
  //Hasta aquí, sabemos que va a haber usuario y que cumple su contraseña.
  req.session.user = {
    username: user.username,
    email: user.email
  };
  res.send({ status: "logged" });
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
  container.getAll().then((result) => {
    let info = result.payload;
    let preparedObject = {
      products: info
    };
    res.render("products", preparedObject);
  });
});

app.get("/view/register", (req, res) => {
  container.getAll().then((result) => {
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
  let products = await container.getAll();

  //Mandar al cliente
  socket.emit("deliverProducts", products);
});

//CREATE CENTRO DE MENSAJES
let messages = await messageService.getAll();
console.log(messages, "THISOOOO");

io.on("connection", (socket) => {
  console.log("Cliente conectado");
  socket.emit("welcome", "BIENVENIDO A MI SOCKET");
  io.emit("messageLog", messages);

  socket.broadcast.emit("thirdConnection", "Alguien se ha unido al chat");
  socket.on("message", async (data) => {
    const user = await userService.findByUsername(
      socket.handshake.session.user.username
    );
    let message = {
      user: user._id,
      username: user.username,
      text: data.message
    };
    await messageService.save(message);
    const messages = await messageService.getAll();
    // const objectToNormalize ={
    //     id:"BaseId",
    //     messages:messages
    // }
    io.emit("messageLog", messages);
  });
});
