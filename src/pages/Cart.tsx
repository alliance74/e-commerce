
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/cart/CartItem';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/auth/AuthModal';

const Cart = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    // In a real app, navigate to checkout page
    navigate('/checkout');
  };

  const calculateTax = () => {
    return totalPrice * 0.1; // 10% tax for example
  };

  const calculateTotal = () => {
    return totalPrice + calculateTax();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-medium mb-6">Your Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-6">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-muted">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-medium">Your cart is empty</h2>
                <p className="text-muted-foreground">
                  Looks like you haven't added any products to your cart yet.
                </p>
              </div>
              <Button asChild size="lg">
                <Link to="/shop">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div 
                className="lg:col-span-2"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium">
                      Items ({items.reduce((total, item) => total + item.quantity, 0)})
                    </h2>
                    <Button 
                      variant="ghost" 
                      className="text-muted-foreground hover:text-destructive"
                      onClick={clearCart}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear Cart
                    </Button>
                  </div>
                  
                  <Separator className="mb-6" />
                  
                  <div className="space-y-6">
                    {items.map((item) => (
                      <motion.div key={item.product.id} variants={itemVariants}>
                        <CartItem 
                          product={item.product} 
                          quantity={item.quantity} 
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <Button 
                    variant="outline" 
                    asChild
                  >
                    <Link to="/shop">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </motion.div>
              
              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-lg font-medium mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span>${calculateTax().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>
                  
                  <Separator className="mb-6" />
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                  
                  <Separator className="mb-6" />
                  
                  {/* Total */}
                  <div className="flex justify-between items-center mb-6 text-lg font-medium">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full mb-4"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                    <span>We accept:</span>
                    <span>Visa, Mastercard, Amex, PayPal</span>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
                      <label 
                        htmlFor="terms" 
                        className="text-xs text-muted-foreground cursor-pointer"
                      >
                        I agree to the terms and conditions, privacy policy, and refund policy
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      {/* Auth Modal */}
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Cart;
