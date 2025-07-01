
// Mock data for products and categories
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
}

// Mock products data
export const products: Product[] = [
  {
    id: '1',
    name: 'Minimal Desk Lamp',
    description: 'A sleek, minimalist desk lamp with adjustable brightness and color temperature.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'lighting',
    featured: true,
  },
  {
    id: '2',
    name: 'Modern Lounge Chair',
    description: 'Contemporary lounge chair with premium fabric upholstery and wooden legs.',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'furniture',
    featured: true,
  },
  {
    id: '3',
    name: 'Ceramic Coffee Mug',
    description: 'Handcrafted ceramic coffee mug with a matte finish and ergonomic handle.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'kitchenware',
    featured: false,
  },
  {
    id: '4',
    name: 'Wool Throw Blanket',
    description: 'Soft, premium wool throw blanket perfect for adding warmth and style to any space.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'textiles',
    featured: false,
  },
  {
    id: '5',
    name: 'Minimalist Wall Clock',
    description: 'Simple, elegant wall clock with a white face and matte black hands.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'decor',
    featured: true,
  },
  {
    id: '6',
    name: 'Glass Vase Set',
    description: 'Set of three glass vases in varying heights, perfect for fresh or dried florals.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1581912492723-688317ba2162?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    category: 'decor',
    featured: false,
  },
];

// Mock categories data
export const categories: Category[] = [
  { id: '1', name: 'All Products' },
  { id: '2', name: 'Furniture' },
  { id: '3', name: 'Lighting' },
  { id: '4', name: 'Textiles' },
  { id: '5', name: 'Kitchenware' },
  { id: '6', name: 'Decor' },
];

// Mock API client
class ApiClient {
  // Get all products with optional filtering
  async getProducts(categoryId?: string): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!categoryId || categoryId === '1') {
      return products;
    }
    
    const categoryName = categories.find(c => c.id === categoryId)?.name.toLowerCase();
    return products.filter(p => p.category === categoryName);
  }
  
  // Get featured products
  async getFeaturedProducts(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return products.filter(p => p.featured);
  }
  
  // Get a product by ID
  async getProductById(id: string): Promise<Product | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return products.find(p => p.id === id);
  }
  
  // Get all categories
  async getCategories(): Promise<Category[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return categories;
  }
  
  // Mock login functionality
  async login(email: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // For demo purposes, accept any email ending with @admin.com as admin
    if (email.endsWith('@admin.com') && password.length >= 6) {
      return { 
        success: true, 
        token: 'mock-jwt-token-for-admin-user'
      };
    }
    
    // For demo purposes, accept any other valid-looking email/password
    if (email.includes('@') && password.length >= 6) {
      return { 
        success: true, 
        token: 'mock-jwt-token-for-regular-user'
      };
    }
    
    return {
      success: false,
      error: 'Invalid email or password'
    };
  }
  
  // Mock registration functionality
  async register(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!email.includes('@') || password.length < 6) {
      return {
        success: false,
        error: 'Invalid email or password (must be at least 6 characters)'
      };
    }
    
    return { success: true };
  }
}

export const api = new ApiClient();
