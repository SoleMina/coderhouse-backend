import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import MongoStore from "connect-mongo";
import initializePassportConfig from "./passport-config.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log("Listening on " + PORT);
});
const connection = mongoose.connect(
  "mongodb+srv://kprado:Coderhouse123@ecommerce.zw86p.mongodb.net/facebook?retryWrites=true&w=majority"
);

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://kprado:Coderhouse123@ecommerce.zw86p.mongodb.net/facebook?retryWrites=true&w=majority"
    }),
    secret: "coderFacebook",
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.static("public"));
app.use(cors());
app.use(express.json());
initializePassportConfig();
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["public_profile"] }),
  (req, res) => {
    //
  }
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/paginadeFail"
  }),
  (req, res) => {
    res.send({ message: "Finalmente logeado :D" });
  }
);

app.get("/", (req, res) => {
  console.log("Hola");
});
