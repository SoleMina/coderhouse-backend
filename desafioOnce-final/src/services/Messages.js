import { database } from "../config.js";

export default class Messages {
  constructor() {
    database.schema.hasTable("messagesTotal").then((result) => {
      if (!result) {
        database.schema
          .createTable("messagesTotal", (table) => {
            table.increments();
            table.string("nombre").notNullable();
            table.string("apellido").notNullable();
            table.string("edad").notNullable();
            table.string("alias").notNullable();
            table.string("avatar").notNullable();
            table.string("text").notNullable();
            table.timestamps(true, true);
          })
          .then((result) => {
            console.log("Messages table created");
          });
      }
    });
  }

  saveMessage = async (msg) => {
    try {
      const message = await database.table("messagesTotal").insert(msg);
      console.log(message);
      return {
        status: "success",
        message: "Message registered",
        payload: message
      };
    } catch (error) {
      return {
        status: "Error",
        message: "Message couldn't been registered" + error
      };
    }
  };
  getAllMessages = async () => {
    try {
      const messages = await database.select().table("messagesTotal");
      return { status: "success", payload: messages };
    } catch (error) {
      return {
        status: "Error",
        message: "No se encontraron messages " + error
      };
    }
  };
}

//database("messages").del().where("id", 5).then((result) => {console.log(result);});
