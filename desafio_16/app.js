import express from "express";
import bcrypt from "bcrypt";
import log4js from "log4js";
import cluster from "cluster";
import { cpus } from "os";

const app = express();
const PORT = parseInt(process.argv[2]) || 8080;
const server = app.listen(PORT, (req, res) => {
  console.log("Listening server on " + PORT);
});

const users = {};

server.on("error", (error) => console.log(error));

app.get("/newUser", async (req, res) => {
  let { username = "", password = "" } = req.query;
  const saltRounds = 10;
  if (!username || !password || !users[username]) return res.sendStatus(400);
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  users[username] = hash;
  res.sendStatus(200);
});

app.get("/auth-nobloq", async (req, res) => {
  let { username = "", password = "" } = req.query;
  if (!username || !password || !users[username]) return res.sendStatus(400);
  let login = await bcrypt.compare(password, users[username]);
  if (login) res.sendStatus(200);
});

log4js.configure({
  appenders: {
    console: { type: "console" },
    debugFile: { type: "file", filename: "./debug.log" },
    errorsFile: { type: "file", filename: "./errors.log" },
    errorLevelFilter: {
      type: "LogLevelFilter",
      level: "error",
      appender: "errorsFile"
    }
  },
  categories: {
    default: {
      appenders: ["console"],
      level: "all"
    },
    DEV: {
      appenders: ["debugFile", "console"],
      level: "all"
    },
    PROD: {
      appenders: ["console", "errorLevelFilter"],
      level: "all"
    }
  }
});

const logger = log4js.getLogger("PROD");

app.get("/", (req, res) => {
  logger.info("Hello everyone");
  res.send("Hello");
});
app.get("/error", (req, res) => {
  logger.error("Opps something happened");
  res.send("Hello");
});

//cluster
const isCluster = process.argv[2] === "CLUSTER";
if (isCluster && cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    cluster.fork();
  });
  console.log(`Process PID: ${process.pid}`);
} else {
  app.get("randoms-debug", (req, res) => {
    let numbers = [];
    for (let i = 0; i < 1000; i++) {
      let random = Math.floor(Math.random() * 9);
      numbers.push(random);
    }
    console.log(numbers);
    res.send({ randoms: numbers });
  });
  app.get("randoms-nodebug", (req, res) => {
    let numbers = [];
    for (let i = 0; i < 1000; i++) {
      let random = Math.floor(Math.random() * 9);
      numbers.push(random);
    }
    res.send({ randoms: numbers });
  });
}
