import User from "../model/user.js";
import GenericQueries from "./genericQueries.js";

export default class UserService extends GenericQueries {
  constructor(dao) {
    super(dao, User.model);
  }
  async findByUsername(username) {
    return this.dao.findOne({ username }, User.model);
  }
  async findByEmail(email) {
    return this.dao.findOne({ email }, User.model);
  }

  async createOne(obj) {
    return this.dao.insert({ obj }, User.model);
  }
  async saveOne(obj) {
    return this.dao.insertUser({ obj }, User.model);
  }
}
