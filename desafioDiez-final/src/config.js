import __dirname from "./utils.js";

export default {
  fileSystem: {
    baseUrl: __dirname + "/files/"
  },
  mongo: {
    baseUrl:
      "mongodb+srv://kprado:Coderhouse123@ecommerce.zw86p.mongodb.net/ecommerce?retryWrites=true&w=majority"
  },
  firebase: {
    baseUrl: "https://ecommerce-9c3f1.firebaseio.com"
  }
};
