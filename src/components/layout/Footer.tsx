
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, ChevronRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-muted/30 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-medium tracking-tight hover:opacity-80">
              minimal.
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Curated collection of minimalist designs for the modern lifestyle. Quality craftsmanship meets timeless aesthetics.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                <Facebook className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-medium mb-4">Shop</h4>
            <ul className="space-y-3">
              {['All Products', 'New Arrivals', 'Best Sellers', 'Furniture', 'Lighting', 'Accessories'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/shop?category=${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Story', 'Sustainability', 'Careers', 'Press', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-medium mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for new product announcements and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Your email" 
                  className="pl-9 bg-background" 
                />
              </div>
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} minimal. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Terms of Service', 'Privacy Policy', 'Shipping Policy', 'Returns', 'FAQ'].map((item) => (
              <Link 
                key={item} 
                to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
