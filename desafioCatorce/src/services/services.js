import Dao from "../contenedores/dao.js";
import UserService from "./users.js";
import MessageService from "./messages.js";

const dao = new Dao();

export const userService = new UserService(dao);
export const messageService = new MessageService(dao);
