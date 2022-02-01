import mongoose from "mongoose";

const collectionRef = "products";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    thumbnail: {
      type: String,
      requerid: true
    },
    codigo: {
      type: String,
      requerid: true
    },
    stock: {
      type: Number,
      requerid: true
    }
  },
  { timestamps: true }
);

export const productService = mongoose.model(collectionRef, ProductSchema);
