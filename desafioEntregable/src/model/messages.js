import mongoose from "mongoose";

const collectionRef = "messages";

export const MessageSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    apellido: {
      type: String,
      required: true
    },
    edad: {
      type: Number,
      required: true
    },
    alias: {
      type: String,
      requerid: true
    },
    avatar: {
      type: String,
      requerid: true
    },
    text: {
      type: String,
      requerid: true
    }
  },
  { timestamps: true }
);

export const messageService = mongoose.model(collectionRef, MessageSchema);
