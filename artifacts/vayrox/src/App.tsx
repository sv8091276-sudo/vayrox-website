import { Route, Switch, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// Pages
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ShopMen from '@/pages/ShopMen';
import ShopWomen from '@/pages/ShopWomen';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Wishlist from '@/pages/Wishlist';
import Login from '@/pages/Login';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import SizeGuide from '@/pages/SizeGuide';
import SkinTone from '@/pages/SkinTone';
import ShopByBodyType from '@/pages/ShopByBodyType';
import ShopByHeight from '@/pages/ShopByHeight';
import Admin from '@/pages/Admin';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function AnimatedRoute({ component: Component, ...rest }: any) {
  return (
    <Route {...rest}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Component />
      </motion.div>
    </Route>
  );
}

function Router() {
  return (
    <WouterRouter>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <AnimatedRoute path="/" component={Home} />
            <AnimatedRoute path="/shop" component={Shop} />
            <AnimatedRoute path="/shop/men" component={ShopMen} />
            <AnimatedRoute path="/shop/women" component={ShopWomen} />
            <AnimatedRoute path="/product/:id" component={ProductDetail} />
            <AnimatedRoute path="/cart" component={Cart} />
            <AnimatedRoute path="/wishlist" component={Wishlist} />
            <AnimatedRoute path="/login" component={Login} />
            <AnimatedRoute path="/about" component={About} />
            <AnimatedRoute path="/contact" component={Contact} />
            <AnimatedRoute path="/faq" component={FAQ} />
            <AnimatedRoute path="/size-guide" component={SizeGuide} />
            <AnimatedRoute path="/skin-tone" component={SkinTone} />
            <AnimatedRoute path="/shop-by-body-type" component={ShopByBodyType} />
            <AnimatedRoute path="/shop-by-height" component={ShopByHeight} />
            <AnimatedRoute path="/admin" component={Admin} />
            <AnimatedRoute component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </WouterRouter>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
