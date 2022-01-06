let cart;
let products;
let persistence = "fileSystem";

switch (persistence) {
  case "fileSystem":
    const { default: ProductFileSystem } = await import(
      "./products/productsFileSystem.js"
    );
    const { default: CartFileSystem } = await import(
      "./cart/cartFileSystem.js"
    );

    cart = new CartFileSystem();
    products = new ProductFileSystem();
    break;
  case "mongo":
    const { default: ProductsMongo } = await import(
      "./products/productsMongo.js"
    );
    const { default: CartMongo } = await import("./cart/cartMongo.js");
    cart = new CartMongo();
    products = new ProductsMongo();
  default:
}
export { cart, products };
