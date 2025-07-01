
import { CartItem } from './CartService';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}



export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export class OrderService {
  private static ORDERS_STORAGE_KEY = 'user_orders';


  private static generateOrderId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
  }

  static getOrders(): Order[] {
    const orders = localStorage.getItem(this.ORDERS_STORAGE_KEY);
    if (!orders) return [];
    
    try {
      return JSON.parse(orders);
    } catch (e) {
      console.error('Failed to parse orders data:', e);
      return [];
    }
  }

  // Create a new order
  static createOrder(
    items: CartItem[],
    shippingAddress: ShippingAddress,
    paymentMethod: string
  ): Order {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    
    const newOrder: Order = {
      id: this.generateOrderId(),
      items: [...items],
      total,
      status: 'pending',
      created: new Date().toISOString(),
      shippingAddress,
      paymentMethod
    };
    
    // Save order to localStorage
    const existingOrders = this.getOrders();
    existingOrders.push(newOrder);
    localStorage.setItem(this.ORDERS_STORAGE_KEY, JSON.stringify(existingOrders));
    
    return newOrder;
  }

  // Get a specific order by ID
  static getOrderById(orderId: string): Order | undefined {
    const orders = this.getOrders();
    return orders.find(order => order.id === orderId);
  }

  // Update order status
  static updateOrderStatus(orderId: string, status: Order['status']): Order | undefined {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex >= 0) {
      orders[orderIndex].status = status;
      localStorage.setItem(this.ORDERS_STORAGE_KEY, JSON.stringify(orders));
      return orders[orderIndex];
    }
    
    return undefined;
  }
}
