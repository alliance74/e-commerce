
import { Product } from '@/lib/api';

export interface CartItem {
  product: Product;
  quantity: number;
}

export class CartService {
  private static CART_STORAGE_KEY = 'shopping_cart';

  // Save cart to localStorage
  private static saveCart(items: CartItem[]): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
  }

  // Get cart from localStorage
  static getCart(): CartItem[] {
    const cart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (!cart) return [];
    
    try {
      return JSON.parse(cart);
    } catch (e) {
      console.error('Failed to parse cart data:', e);
      return [];
    }
  }

  // Add item to cart
  static addToCart(product: Product, quantity: number = 1): CartItem[] {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item if it doesn't exist
      cart.push({ product, quantity });
    }
    
    this.saveCart(cart);
    return cart;
  }

  // Update item quantity
  static updateQuantity(productId: string, quantity: number): CartItem[] {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.product.id === productId);
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        cart.splice(itemIndex, 1);
      } else {
        // Update quantity
        cart[itemIndex].quantity = quantity;
      }
      
      this.saveCart(cart);
    }
    
    return cart;
  }

  // Remove item from cart
  static removeFromCart(productId: string): CartItem[] {
    const cart = this.getCart();
    const updatedCart = cart.filter(item => item.product.id !== productId);
    this.saveCart(updatedCart);
    return updatedCart;
  }

  // Clear the entire cart
  static clearCart(): void {
    this.saveCart([]);
  }

  // Get total items count in cart
  static getItemsCount(): number {
    return this.getCart().reduce((total, item) => total + item.quantity, 0);
  }

  // Calculate cart total
  static getCartTotal(): number {
    return this.getCart().reduce(
      (total, item) => total + item.product.price * item.quantity, 
      0
    );
  }
}
