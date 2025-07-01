
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import CartItem from './CartItem';

const CartSidebar = () => {
  const { items, isOpen, closeCart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/cart');
  };

  // Animation variants
  const sidebarVariants = {
    hidden: { x: '100%', opacity: 1 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
    exit: { x: '100%', opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          {/* Sidebar */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={sidebarVariants}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-background z-50 shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b flex items-center justify-between">
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                <h2 className="font-medium text-lg">Your Cart</h2>
                <span className="ml-2 text-sm text-muted-foreground">
                  ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={closeCart}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-auto p-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="font-medium mb-1">Your cart is empty</p>
                  <p className="text-muted-foreground text-sm mb-6">
                    Looks like you haven't added any products to your cart yet.
                  </p>
                  <Button onClick={closeCart}>Continue Shopping</Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <CartItem
                      key={item.product.id}
                      product={item.product}
                      quantity={item.quantity}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                
                <div className="flex justify-between items-center text-lg font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="space-y-2 pt-2">
                  <Button onClick={handleCheckout} className="w-full justify-between">
                    Checkout <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={closeCart}
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                  
                  <Button 
                    variant="ghost"
                    onClick={clearCart}
                    className="w-full text-muted-foreground"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
