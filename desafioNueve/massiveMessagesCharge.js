db = connect("localhost:27017/ecommerce");
db.messages.insertMany([
  {
    username: "kprado@gmail.com",
    message: "Hola a todos",
    timestamp: new Date()
  },
  {
    username: "karina@gmail.com",
    message: "¿cómo están?",
    timestamp: new Date()
  },
  {
    username: "prado@gmail.com",
    message: "Holaaaa",
    timestamp: new Date()
  },
  {
    username: "soledad@gmail.com",
    message: "Genialllll",
    timestamp: new Date()
  },
  {
    username: "carlaperez@gmail.com",
    message: "?????",
    timestamp: new Date()
  },
  {
    username: "carlaperez@gmail.com",
    message: "yo bien :)",
    timestamp: new Date()
  },
  {
    username: "karina@gmail.com",
    message: "Hola Carla",
    timestamp: new Date()
  },
  {
    username: "soledad@gmail.com",
    message: "Buenassss, ¿terminaron el desafío?",
    timestamp: new Date()
  },
  {
    username: "prado@gmail.com",
    message: "siiii",
    timestamp: new Date()
  },
  {
    username: "soledad@gmail.com",
    message: "ayudaaaaa",
    timestamp: new Date()
  }
]);
