import Data from "../contenedores/apiClass.js";
import { faker } from "@faker-js/faker/locale/es_MX";

export class Products extends Data {
  constructor() {
    super();
  }
  async getProduct() {
    //mostrar productos de manera aleatoria
    let listProducts = [];
    for (let i = 0; i < 5; i++) {
      const product = {
        title: faker.commerce.product(),
        price: faker.random.numeric(5),
        thumbnail: faker.image.technics(60, 50, true),
      };
      listProducts.push(product);
    }
    return listProducts;
  }
}
