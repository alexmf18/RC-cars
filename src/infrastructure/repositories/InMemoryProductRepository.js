import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { productsData } from '../data/productsData';

export class InMemoryProductRepository extends ProductRepository {
  getFeaturedProducts() {
    return productsData;
  }
}
