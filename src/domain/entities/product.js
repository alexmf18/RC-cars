export class Product {
  constructor({ id, name, shortDescription, longDescription, price, image, specs }) {
    this.id = id;
    this.name = name;
    this.shortDescription = shortDescription;
    this.longDescription = longDescription;
    this.price = price;
    this.image = image;
    this.specs = specs;
  }
}
