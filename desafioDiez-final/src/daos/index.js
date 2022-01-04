let cart;
let products;
let persistence = "fileSystem";

switch (persistence) {
  case "fileSystem":
    const { default: ProductFileSystem } = await import(
      "./products/productFileSystem.js"
    );
    const { default: CartFileSystem } = await import(
      "./cart/cartFileSystem.js"
    );

    cart = new CartFileSystem();
    products = new ProductFileSystem();
    break;
  default:
}
export { cart, products };
