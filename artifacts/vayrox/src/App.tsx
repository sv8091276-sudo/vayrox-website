import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
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
  const [location] = useLocation();
  const isAdminPage = location.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Navbar />}
      
      <AnimatePresence mode="wait">
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/shop/men" component={ShopMen} />
          <Route path="/shop/women" component={ShopWomen} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/wishlist" component={Wishlist} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/faq" component={FAQ} />
          <Route path="/size-guide" component={SizeGuide} />
          <Route path="/skin-tone" component={SkinTone} />
          <Route path="/shop-by-body-type" component={ShopByBodyType} />
          <Route path="/shop-by-height" component={ShopByHeight} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>

      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
                <Router />
              </WouterRouter>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
