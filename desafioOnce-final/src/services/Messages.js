import { database } from "../config.js";

export default class Messages {
  constructor() {
    database.schema.hasTable("messages").then((result) => {
      if (!result) {
        database.schema
          .createTable("messages", (table) => {
            table.increments();
            table.string("username").notNullable();
            table.string("message").notNullable();
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
      const message = await database.table("messages").insert(msg);
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
      const messages = await database.select().table("messages");
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
