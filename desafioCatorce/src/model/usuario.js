import mongoose from "mongoose";

const collection = "Usuarios";

const UsuarioSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  password: String,
  age: Number,
  address: String
});

export const usuarios = mongoose.model(collection, UsuarioSchema);
