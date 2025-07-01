
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductGrid from '@/components/product/ProductGrid';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAnimateOnScroll } from '@/utils/animations';

const Index = () => {
  // Initialize animation observer
  useAnimateOnScroll();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[90vh] overflow-hidden bg-muted/30 flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Minimalist interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/10" />
          </div>
          
          <div className="container relative z-10 px-4 md:px-8">
            <div 
              className="max-w-xl text-white animate-fade-in"
              style={{ 
                animationDelay: "200ms", 
                animationDuration: "800ms" 
              }}
            >
              <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4">New Collection</Badge>
              <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">
                Minimalist Design for Modern Living
              </h1>
              <p className="text-lg mb-8 text-white/90">
                Curated collection of premium, minimalist furniture and decor for the modern home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 group">
                  <Link to="/shop">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/70 text-white hover:bg-white/10">
                  <Link to="/collections">Explore Collections</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-2">Featured Products</Badge>
              <h2 className="text-3xl font-medium mb-4">Our Most Popular Pieces</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Discover our most sought-after designs, crafted with premium materials and timeless aesthetics.
              </p>
            </div>
            
            <ProductGrid featured limit={4} />
            
            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg">
                <Link to="/shop">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 md:px-8 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-2">Our Promise</Badge>
              <h2 className="text-3xl font-medium mb-4">Why Choose Minimal</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                We're committed to quality craftsmanship, sustainable practices, and timeless design.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
              {[
                {
                  title: "Premium Materials",
                  description: "We source only the highest quality, sustainable materials for all our products.",
                  icon: "🌿"
                },
                {
                  title: "Timeless Design",
                  description: "Our pieces are designed to transcend trends and remain relevant for years to come.",
                  icon: "✨"
                },
                {
                  title: "Craftsmanship",
                  description: "Every product is meticulously crafted by skilled artisans with attention to detail.",
                  icon: "🔨"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="glass-panel p-8 flex flex-col items-center text-center animate-enter"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 bg-primary text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-medium mb-4">Join Our Community</h2>
            <p className="max-w-xl mx-auto mb-8">
              Subscribe to our newsletter for exclusive offers, design inspiration, and first access to new collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow rounded-md px-4 py-2 text-foreground"
              />
              <Button className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
