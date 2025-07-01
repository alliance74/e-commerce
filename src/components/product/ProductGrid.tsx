import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/lib/api';
import { ProductService } from '@/services/ProductService';

interface ProductGridProps {
  categoryId?: string;
  featured?: boolean;
  limit?: number;
}

const ProductGrid = ({ categoryId, featured = false, limit }: ProductGridProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let fetchedProducts: Product[];
        
        if (featured) {
          fetchedProducts = await ProductService.getFeaturedProducts();
        } else {
          fetchedProducts = await ProductService.getProducts(categoryId);
        }
        
        // Apply limit if specified
        if (limit && fetchedProducts.length > limit) {
          fetchedProducts = fetchedProducts.slice(0, limit);
        }
        
        setProducts(fetchedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, featured, limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">{error}</p>
        <button 
          className="mt-4 text-primary hover:underline"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found for this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductGrid;
