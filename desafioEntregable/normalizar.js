import { normalize, denormalize, schema } from "normalizr";
import Messages from "./services/Messages.js";

const messagesService = new Messages();
let messagesCenter = await messagesService.getAllMessages();

const information = new schema.Entity("information");
const author = new schema.Entity("author", {
  information: [information]
});
const text = new schema.Entity("text");
const mensajes = new schema.Entity("mensajes", {
  author: [author],
  text: [text]
});

const normalizedData = normalize(messagesCenter, mensajes);
console.log(JSON.stringify(normalizedData, null, 2));
