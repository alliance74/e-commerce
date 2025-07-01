
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  
  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1 // Stagger the animations
      }
    }
  };

  // Prevent click propagation when adding to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="group"
    >
      <Link 
        to={`/product/${product.id}`}
        className="block relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image with hover effect */}
        <div className="aspect-square overflow-hidden rounded-lg bg-muted/50 relative">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Quick actions overlay */}
          <div 
            className={`absolute inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center opacity-0 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : ''
            }`}
          >
            <Button 
              onClick={handleAddToCart}
              className="bg-white text-black hover:bg-white/90 shadow-lg rounded-full size-12"
            >
              <ShoppingBag className="size-5" />
            </Button>
          </div>
        </div>
        
        {/* Product details */}
        <div className="mt-4 space-y-1">
          <h3 className="font-medium text-base group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-primary font-medium">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
