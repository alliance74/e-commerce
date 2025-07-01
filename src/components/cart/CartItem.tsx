
import React from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';

interface CartItemProps {
  product: Product;
  quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  return (
    <div className="flex py-4 border-b last:border-b-0">
      {/* Product Image */}
      <div className="h-20 w-20 rounded-md overflow-hidden bg-muted/50 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <div>
            <h4 className="font-medium text-sm">{product.name}</h4>
            <p className="text-primary mt-1">${product.price.toFixed(2)}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => removeItem(product.id)}
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center mt-2">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDecrement}
              className="h-7 w-7 text-muted-foreground"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleIncrement}
              className="h-7 w-7 text-muted-foreground"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <span className="ml-auto text-sm font-medium">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
