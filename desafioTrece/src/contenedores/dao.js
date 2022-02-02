import mongoose from "mongoose";
import config from "../config.js";
import User from "../daos/users/userMongo.js";
import Message from "../daos/messages/messagesMongo.js";

export default class Dao {
  constructor() {
    mongoose
      .connect(
        "mongodb+srv://kprado:Coderhouse123@ecommerce.zw86p.mongodb.net/ecommerce?retryWrites=true&w=majority",
        { useNewUrlParser: true }
      )
      .catch((error) => {
        console.error(error);
        process.exit();
      });

    const timestamp = {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    };
    const UserSchema = mongoose.Schema(User.schema, timestamp);

    const MessageSchema = mongoose.Schema(Message.schema, timestamp);
    MessageSchema.pre("find", function () {
      this.populate("user");
    });

    this.models = {
      [User.model]: mongoose.model(User.model, UserSchema),
      [Message.model]: mongoose.model(Message.model, MessageSchema)
    };
  }
  async get(options, entity) {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not found or defined`);
    return this.models[entity].findOne(options);
  }
  async getAll(options, entity) {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not found or defined`);
    let results = await this.models[entity].find(options);
    return results.map((result) => result);
  }
  async findOne(options, entity) {
    if (!this.models[entity])
      throw new Error("Entity " + entity + " not found or defined.");
    let result = await this.models[entity].findOne(options);
    return result ? result.toObject() : null;
  }
  async getOneByProperty(property, value) {
    try {
      let obj = await this.collection.findOne({ [property]: value });
      if (obj === null) {
        return returnMessage(true, 404, `${this.objName} no encontrado`, null);
      }
      obj = toObj(obj);
      renameField(obj, "_id", "id");
      removeField(obj, "__v");
      return returnMessage(false, 200, `${this.objName} encontrado`, obj);
    } catch (error) {
      if (error.name === "CastError") {
        return returnMessage(true, 400, `${this.objName} no encontrado`, null);
      }
      return returnMessage(
        true,
        500,
        `Error al obtener el ${this.objName}`,
        null
      );
    }
  }
  async findAll(options, entity) {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not found or defined`);
    let results = await this.models[entity].find(options);
    return results.map((result) => result.toObject());
  }
  async insert(document, entity) {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not found or defined`);
    try {
      let instance = new this.models[entity](document);
      let result = await instance.save();
      return result ? result.toObject() : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async insertUser(document, entity) {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not found or defined`);
    try {
      let instance = new this.models[entity](document);
      let result = await instance.insertOne();
      return result ? result.toObject() : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async remove(id, entity) {
    if (!this.models[entity])
      throw new Error(`Entity ${entity} not found or defined`);
    let result = await this.modes[entity].findByIdAndDelete(id);
    return result ? result.toObject() : null;
  }
  async exists(entity, options) {
    if (!this.models[entity])
      throw new Error("Entity " + entity + " not found or defined.");
    return this.models[entity].exists(options);
  }
}
