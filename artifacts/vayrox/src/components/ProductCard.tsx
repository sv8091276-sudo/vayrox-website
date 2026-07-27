import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/data/products';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({ title: 'Removed from wishlist' });
    } else {
      addToWishlist(product);
      toast({ title: 'Added to wishlist' });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, product.sizes[0], 1);
    toast({ title: 'Added to cart', description: `${product.name} - ${product.sizes[0]}` });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative"
      data-testid={`card-product-${product.id}`}
    >
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-sm mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            data-testid={`img-product-${product.id}`}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-sm" data-testid={`badge-new-${product.id}`}>
                NEW
              </span>
            )}
            {product.isSale && (
              <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-sm" data-testid={`badge-sale-${product.id}`}>
                SALE
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={cn(
              "absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full transition-all",
              inWishlist 
                ? "bg-primary text-primary-foreground" 
                : "bg-black/50 text-white hover:bg-primary hover:text-primary-foreground"
            )}
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
          </button>

          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              onClick={handleQuickAdd}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              data-testid={`button-quick-add-${product.id}`}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-sm mb-1" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground" data-testid={`text-product-price-${product.id}`}>
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through" data-testid={`text-product-original-price-${product.id}`}>
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex gap-1 mt-2">
            {product.colors.slice(0, 4).map((color, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: color }}
                data-testid={`color-swatch-${product.id}-${i}`}
              />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
