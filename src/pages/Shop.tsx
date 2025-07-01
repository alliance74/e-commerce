
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductService } from '@/services/ProductService';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilter from '@/components/product/ProductFilter';
import { Category } from '@/lib/api';
import { Loader2 } from 'lucide-react';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('1'); // Default to "All Products"
  
  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: ProductService.getCategories,
  });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-medium mb-8">Shop</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left sidebar with filters */}
            <div className="w-full md:w-64 shrink-0">
              <h2 className="text-lg font-medium mb-4">Categories</h2>
              
              {categoriesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : (
                <ProductFilter 
                  categories={categories || []}
                  selectedCategoryId={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
              )}
            </div>
            
            {/* Right side with products */}
            <div className="flex-grow">
              <ProductGrid categoryId={selectedCategory} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
