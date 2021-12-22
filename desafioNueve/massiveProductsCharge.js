db = connect("localhost:27017/ecommerce");
db.products.insertMany([
  {
    name: "Macbook Pro",
    description: "High quality",
    price: 4900,
    thumbnail:
      "https://tiendasishop.com/media/catalog/product/m/w/mwp42e_a.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    codigo: "001",
    stock: 10,
    timestamp: new Date()
  },
  {
    name: "Ipad Pro",
    description: "High quality",
    price: 2500,
    thumbnail:
      "https://tiendasishop.com/media/catalog/product/m/w/mwp42e_a.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",

    codigo: "002",
    stock: 20,
    timestamp: new Date()
  },
  {
    name: "Impresora Epson",
    description: "High quality",
    price: 960,
    thumbnail:
      "https://tiendasishop.com/media/catalog/product/m/w/mwp42e_a.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    codigo: "003",
    stock: 20,
    timestamp: new Date()
  },
  {
    name: "Peluche Rosado",
    description: "High quality",
    price: 230,
    thumbnail:
      "https://tiendasishop.com/media/catalog/product/m/w/mwp42e_a.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    codigo: "004",
    stock: 25,
    timestamp: new Date()
  },
  {
    name: "Peluche osa",
    description: "High quality",
    price: 130,
    thumbnail:
      "https://tiendasishop.com/media/catalog/product/m/w/mwp42e_a.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    codigo: "005",
    stock: 30,
    timestamp: new Date()
  },
  {
    name: "Laptop Asus",
    description: "High quality",
    price: 2800,
    thumbnail:
      "https://tiendasishop.com/media/catalog/product/m/w/mwp42e_a.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    codigo: "006",
    stock: 15,
    timestamp: new Date()
  },
  {
    name: "Tablet",
    description: "High quality",
    price: 1500,
    thumbnail:
      "https://tiendasishop.com/media/catalog/product/m/w/mwp42e_a.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    codigo: "007",
    stock: 20,
    timestamp: new Date()
  },
  {
    name: "Iphone 12 Pro",
    description: "High quality",
    price: 3500,
    thumbnail:
      "https://tiendasishop.com/media/catalog/product/m/w/mwp42e_a.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    codigo: "008",
    stock: 15,
    timestamp: new Date()
  },
  {
    name: "Samsung S21",
    description: "High quality",
    price: 2800,
    thumbnail:
      "https://tiendasishop.com/media/catalog/product/m/w/mwp42e_a.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    codigo: "009",
    stock: 10,
    timestamp: new Date()
  },
  {
    name: "Iphone 12 Pro max",
    description: "High quality",
    price: 3800,
    thumbnail:
      "https://tiendasishop.com/media/catalog/product/m/w/mwp42e_a.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700",
    codigo: "010",
    stock: 15,
    timestamp: new Date()
  }
]);
