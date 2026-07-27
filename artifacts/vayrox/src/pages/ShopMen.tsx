import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { getProductsByCategory } from '@/data/products';

export default function ShopMen() {
  const menProducts = getProductsByCategory('men');

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero Banner */}
      <div className="relative h-64 mb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4" data-testid="text-men-title">
            Crafted for the Bold
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Men's collection that commands attention without demanding it.
          </p>
        </motion.div>
      </div>

      {/* Products */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="mb-6">
          <p className="text-muted-foreground">{menProducts.length} products</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {menProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
