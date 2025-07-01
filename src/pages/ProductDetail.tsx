
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ShoppingBag, Heart, Share, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductGrid from '@/components/product/ProductGrid';
import { api, Product } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { toast } = useToast();

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productData = await api.getProductById(id || '');
        if (productData) {
          setProduct(productData);
          setError(null);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast({
        title: 'Added to cart',
        description: `${product.name} (${quantity}) added to your cart`,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || 'The product you are looking for does not exist or has been removed.'}
          </p>
          <Button asChild>
            <Link to="/shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container px-4 md:px-8 mx-auto py-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <nav className="text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center">
                <li>
                  <Link to="/" className="hover:text-foreground">Home</Link>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <Link to="/shop" className="hover:text-foreground">Shop</Link>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-foreground font-medium truncate">
                  {product.name}
                </li>
              </ol>
            </nav>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="aspect-square bg-muted/50 rounded-lg overflow-hidden"
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
              <p className="text-2xl font-medium text-primary mb-6">${product.price.toFixed(2)}</p>
              
              <p className="text-muted-foreground mb-8">
                {product.description}
              </p>
              
              {/* Quantity Control */}
              <div className="flex items-center mb-6">
                <span className="text-sm font-medium mr-4">Quantity</span>
                <div className="flex items-center border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 text-muted-foreground"
                    disabled={quantity <= 1}
                  >
                    <span className="text-lg font-medium">-</span>
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 text-muted-foreground"
                  >
                    <span className="text-lg font-medium">+</span>
                  </Button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  className="flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex-1"
                >
                  <Heart className="mr-2 h-5 w-5" />
                  Save
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-11 w-11"
                >
                  <Share className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Additional Info */}
              <Tabs defaultValue="details">
                <TabsList className="w-full">
                  <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                  <TabsTrigger value="shipping" className="flex-1">Shipping</TabsTrigger>
                  <TabsTrigger value="returns" className="flex-1">Returns</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="text-sm text-muted-foreground">
                  <p className="mb-4">
                    Our {product.name} is crafted with precision and attention to detail, using only the highest quality materials.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Premium materials</li>
                    <li>Designed for everyday use</li>
                    <li>Timeless aesthetic</li>
                    <li>Sustainably sourced</li>
                  </ul>
                </TabsContent>
                <TabsContent value="shipping" className="text-sm text-muted-foreground">
                  <p className="mb-4">
                    We offer free standard shipping on all orders over $100. Expedited shipping options are available at checkout.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Standard Shipping: 3-5 business days</li>
                    <li>Expedited Shipping: 1-2 business days</li>
                    <li>International Shipping: 7-14 business days</li>
                  </ul>
                </TabsContent>
                <TabsContent value="returns" className="text-sm text-muted-foreground">
                  <p>
                    We accept returns within 30 days of delivery. Items must be in original condition with all packaging. Return shipping is free for defective items.
                  </p>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>

          {/* Related Products */}
          <section className="mt-20">
            <h2 className="text-2xl font-medium mb-8">You May Also Like</h2>
            <ProductGrid limit={4} />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
