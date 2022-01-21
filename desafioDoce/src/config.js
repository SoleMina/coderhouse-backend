import __dirname from "./utils.js";

//Env variables
const { FIREBASE_URL, MONGO_URL } = process.env;

export default {
  fileSystem: {
    baseUrl: __dirname + "/files/"
  },
  mongo: {
    baseUrl: MONGO_URL
  },
  firebase: {
    baseUrl: FIREBASE_URL
  }
};
