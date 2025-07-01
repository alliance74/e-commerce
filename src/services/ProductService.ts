
import { Product, products, categories, Category, api } from '@/lib/api';

export class ProductService {
  // Get all products with optional category filtering
  static async getProducts(categoryId?: string): Promise<Product[]> {
    try {
      return await api.getProducts(categoryId);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Get featured products
  static async getFeaturedProducts(): Promise<Product[]> {
    try {
      return await api.getFeaturedProducts();
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }

  // Get a product by ID
  static async getProductById(id: string): Promise<Product | undefined> {
    try {
      return await api.getProductById(id);
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  }

  // Get all categories
  static async getCategories(): Promise<Category[]> {
    try {
      return await api.getCategories();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
}
