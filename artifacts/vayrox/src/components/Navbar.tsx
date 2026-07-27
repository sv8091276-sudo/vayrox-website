import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="text-3xl font-serif font-bold tracking-wider text-white hover:text-primary transition-colors" data-testid="link-home">
              VAYROX
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-sm text-white/80 hover:text-white transition-colors" data-testid="link-nav-home">
                Home
              </Link>
              
              <div
                className="relative"
                onMouseEnter={() => setIsShopHovered(true)}
                onMouseLeave={() => setIsShopHovered(false)}
              >
                <Link href="/shop" className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1" data-testid="link-nav-shop">
                  Shop
                  <ChevronDown className="w-3 h-3" />
                </Link>
                <AnimatePresence>
                  {isShopHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-sm overflow-hidden"
                    >
                      <Link href="/shop/men" className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors" data-testid="link-nav-shop-men">
                        Men
                      </Link>
                      <Link href="/shop/women" className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors" data-testid="link-nav-shop-women">
                        Women
                      </Link>
                      <Link href="/shop" className="block px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors" data-testid="link-nav-shop-all">
                        All Products
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors" data-testid="link-nav-about">
                About
              </Link>
              <Link href="/contact" className="text-sm text-white/80 hover:text-white transition-colors" data-testid="link-nav-contact">
                Contact
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Search"
                data-testid="button-search-toggle"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link href="/wishlist" className="relative p-2 text-white/80 hover:text-white transition-colors" data-testid="link-wishlist">
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-background text-xs flex items-center justify-center rounded-full" data-testid="badge-wishlist-count">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link href="/cart" className="relative p-2 text-white/80 hover:text-white transition-colors" data-testid="link-cart">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-background text-xs flex items-center justify-center rounded-full" data-testid="badge-cart-count">
                    {cartCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="relative group">
                  <button className="p-2 text-white/80 hover:text-white transition-colors" data-testid="button-user-menu">
                    <User className="w-5 h-5" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-sm overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                      data-testid="button-logout"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="p-2 text-white/80 hover:text-white transition-colors" data-testid="link-login">
                  <User className="w-5 h-5" />
                </Link>
              )}

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Menu"
                data-testid="button-mobile-menu-toggle"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pb-4">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                    data-testid="input-search"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-background border-l border-border z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-2xl font-serif font-bold">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-foreground/80 hover:text-foreground"
                  data-testid="button-mobile-menu-close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/" className="text-lg text-foreground/80 hover:text-foreground transition-colors py-2" data-testid="link-mobile-home">
                  Home
                </Link>
                <Link href="/shop" className="text-lg text-foreground/80 hover:text-foreground transition-colors py-2" data-testid="link-mobile-shop">
                  Shop All
                </Link>
                <Link href="/shop/men" className="text-lg text-foreground/80 hover:text-foreground transition-colors py-2 pl-4" data-testid="link-mobile-shop-men">
                  Men
                </Link>
                <Link href="/shop/women" className="text-lg text-foreground/80 hover:text-foreground transition-colors py-2 pl-4" data-testid="link-mobile-shop-women">
                  Women
                </Link>
                <Link href="/about" className="text-lg text-foreground/80 hover:text-foreground transition-colors py-2" data-testid="link-mobile-about">
                  About
                </Link>
                <Link href="/contact" className="text-lg text-foreground/80 hover:text-foreground transition-colors py-2" data-testid="link-mobile-contact">
                  Contact
                </Link>
                <Link href="/faq" className="text-lg text-foreground/80 hover:text-foreground transition-colors py-2" data-testid="link-mobile-faq">
                  FAQ
                </Link>
                <Link href="/size-guide" className="text-lg text-foreground/80 hover:text-foreground transition-colors py-2" data-testid="link-mobile-size-guide">
                  Size Guide
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
