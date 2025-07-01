
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Category, api } from '@/lib/api';

interface ProductFilterProps {
  categories: Category[];
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
}

const ProductFilter = ({ categories, selectedCategoryId, onCategoryChange }: ProductFilterProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [availabilityFilters, setAvailabilityFilters] = useState({
    inStock: true,
    onSale: false,
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    onCategoryChange(categoryId);
    
    const category = categories.find(c => c.id === categoryId);
    const params = new URLSearchParams(location.search);
    
    if (categoryId === '1') { // "All Products"
      params.delete('category');
    } else if (category) {
      params.set('category', category.name.toLowerCase());
    }
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
  };

  return (
    <div className="mb-8">
      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <Button 
          variant="outline" 
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="w-full justify-between"
        >
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </div>
          {filtersOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Desktop & Mobile Filter Content */}
      <AnimatePresence>
        {(filtersOpen || window.innerWidth >= 768) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:h-auto"
          >
            <div className="border rounded-lg p-4 mt-4 md:mt-0 md:p-6 bg-muted/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Categories Section */}
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className={`block w-full text-left px-2 py-1.5 text-sm rounded-md transition-colors ${
                          selectedCategoryId === category.id
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'hover:bg-muted/70 text-muted-foreground'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Section */}
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider 
                      defaultValue={[priceRange[0], priceRange[1]]} 
                      max={1000}
                      step={10}
                      onValueChange={(value) => setPriceRange([value[0], value[1]])}
                      className="my-6"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Availability Section */}
                <div>
                  <h3 className="font-medium mb-3">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="in-stock" 
                        checked={availabilityFilters.inStock}
                        onCheckedChange={(checked) => 
                          setAvailabilityFilters(prev => ({ ...prev, inStock: !!checked }))
                        }
                      />
                      <label 
                        htmlFor="in-stock" 
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        In Stock
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="on-sale" 
                        checked={availabilityFilters.onSale}
                        onCheckedChange={(checked) => 
                          setAvailabilityFilters(prev => ({ ...prev, onSale: !!checked }))
                        }
                      />
                      <label 
                        htmlFor="on-sale" 
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        On Sale
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFilter;
