import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Sparkles, Ruler, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { name: 'T-Shirts', href: '/shop?type=t-shirt', available: true },
  { name: 'Hoodies', href: '/shop?type=hoodie', available: true },
  { name: 'Shirts', href: '/shop?type=shirt', available: false },
  { name: 'Pants', href: '/shop?type=pants', available: false },
  { name: 'Jeans', href: '/shop?type=jeans', available: false },
  { name: 'Kurtis', href: '/shop?type=kurti', available: false },
  { name: 'Lehengas', href: '/shop?type=lehenga', available: false },
];

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      toast({ title: 'Subscribed', description: 'Welcome to VAYROX insider access.' });
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-background" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-6 text-shadow-glow"
            data-testid="text-hero-title"
          >
            VAYROX
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-primary mb-8 tracking-wide"
            data-testid="text-hero-tagline"
          >
            Where midnight meets platinum
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Crafted for those who don't follow trends. They set them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/shop/men">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8" data-testid="button-shop-men">
                Shop Men
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/shop/women">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8" data-testid="button-shop-women">
                Shop Women
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-primary rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 lg:px-12 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-featured-title">
            Featured Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Curated pieces that embody dark elegance and timeless power.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground" data-testid="button-view-all">
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 px-6 lg:px-12 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-categories-title">
            Shop by Category
          </h2>
        </motion.div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {category.available ? (
                <Link href={category.href}>
                  <Button
                    variant="outline"
                    className="whitespace-nowrap border-border hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    data-testid={`button-category-${category.name.toLowerCase()}`}
                  >
                    {category.name}
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  disabled
                  className="whitespace-nowrap opacity-50"
                  data-testid={`button-category-${category.name.toLowerCase()}`}
                >
                  {category.name}
                  <span className="ml-2 text-xs">(Coming Soon)</span>
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Tools */}
      <section className="py-20 px-6 lg:px-12 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-tools-title">
            Personalized Shopping
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Advanced tools to find your perfect fit and style.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/size-guide">
              <div className="bg-card border border-border rounded-lg p-8 hover:border-primary transition-all group cursor-pointer" data-testid="card-size-guide">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Ruler className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Size Recommendation</h3>
                <p className="text-muted-foreground text-sm">
                  Find your perfect fit with our advanced sizing tool.
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/skin-tone">
              <div className="bg-card border border-border rounded-lg p-8 hover:border-primary transition-all group cursor-pointer" data-testid="card-skin-tone">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Color Matching</h3>
                <p className="text-muted-foreground text-sm">
                  Discover colors that complement your skin tone perfectly.
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/shop-by-body-type">
              <div className="bg-card border border-border rounded-lg p-8 hover:border-primary transition-all group cursor-pointer" data-testid="card-body-type">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Body Type Guide</h3>
                <p className="text-muted-foreground text-sm">
                  Curated recommendations based on your unique body type.
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center bg-gradient-to-r from-muted via-card to-muted border border-border rounded-lg p-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" data-testid="text-newsletter-title">
            Join the Inner Circle
          </h2>
          <p className="text-muted-foreground mb-8">
            Exclusive launches, behind-the-scenes access, and insider-only offers.
          </p>
          <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-background border-border"
              required
              data-testid="input-newsletter"
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap" data-testid="button-newsletter-submit">
              Subscribe
            </Button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
