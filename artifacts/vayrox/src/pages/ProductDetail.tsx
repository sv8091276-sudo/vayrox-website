import { useState } from 'react';
import { useParams, Link } from 'wouter';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Minus, Plus, Ruler, ArrowLeft } from 'lucide-react';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id ? parseInt(params.id) : undefined;
  const product = productId ? getProductById(productId) : undefined;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold mb-4">Product not found</h1>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: 'Please select a size', variant: 'destructive' });
      return;
    }
    addToCart(product, selectedSize, quantity);
    toast({ title: 'Added to cart', description: `${product.name} - ${selectedSize}` });
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({ title: 'Removed from wishlist' });
    } else {
      addToWishlist(product);
      toast({ title: 'Added to wishlist' });
    }
  };

  const relatedProducts = products.filter(p =>
    p.id !== product.id && (p.category === product.category || p.type === product.type)
  ).slice(0, 4);

  const getSizeRecommendation = () => {
    if (!height || !weight) return '';
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h < 160 && w < 60) return 'XS';
    if (h < 170 && w < 70) return 'S';
    if (h < 180 && w < 80) return 'M';
    if (h < 185 && w < 90) return 'L';
    if (h < 190 && w < 100) return 'XL';
    return 'XXL';
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Back Button */}
        <Link href="/shop">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] bg-muted rounded-lg overflow-hidden"
            >
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="img-product-main"
              />
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "aspect-square rounded-lg overflow-hidden border-2 transition-colors",
                    selectedImage === index ? "border-primary" : "border-transparent"
                  )}
                  data-testid={`button-thumbnail-${index}`}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6">
                <h1 className="text-4xl font-serif font-bold mb-2" data-testid="text-product-name">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold" data-testid="text-product-price">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through" data-testid="text-product-original-price">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground mb-8" data-testid="text-product-description">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <Label>Color</Label>
                    {selectedColor && <span className="text-sm text-muted-foreground">Selected</span>}
                  </div>
                  <div className="flex gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "w-10 h-10 rounded-full border-2 transition-all",
                          selectedColor === color ? "border-primary scale-110" : "border-border"
                        )}
                        style={{ backgroundColor: color }}
                        data-testid={`button-color-${index}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <Label>Size</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-primary" data-testid="button-size-guide-dialog">
                        <Ruler className="w-4 h-4 mr-1" />
                        Size Guide
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Size Recommendation</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="height">Height (cm)</Label>
                          <Input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="170"
                            data-testid="input-height"
                          />
                        </div>
                        <div>
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input
                            id="weight"
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="70"
                            data-testid="input-weight"
                          />
                        </div>
                        {height && weight && (
                          <div className="p-4 bg-primary/10 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Recommended Size:</p>
                            <p className="text-2xl font-bold text-primary" data-testid="text-recommended-size">
                              {getSizeRecommendation()}
                            </p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                      data-testid={`button-size-${size}`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <Label className="mb-3 block">Quantity</Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    data-testid="button-quantity-decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold" data-testid="text-quantity">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="button-quantity-increase"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                  data-testid="button-add-to-cart"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleWishlistToggle}
                  variant="outline"
                  size="lg"
                  className={cn(inWishlist && "border-primary text-primary")}
                  data-testid="button-wishlist"
                >
                  <Heart className={cn("w-5 h-5", inWishlist && "fill-current")} />
                </Button>
              </div>

              {/* Product Details */}
              <Accordion type="single" collapsible className="border-t border-border">
                <AccordionItem value="material">
                  <AccordionTrigger data-testid="accordion-material">Material & Care</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>100% premium cotton blend</li>
                      <li>Machine wash cold, tumble dry low</li>
                      <li>Do not bleach or iron directly on print</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger data-testid="accordion-shipping">Shipping & Returns</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>Free shipping on orders over ₹2,999</li>
                      <li>Express delivery available</li>
                      <li>30-day return policy</li>
                      <li>Exchange available within 15 days</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif font-bold mb-8" data-testid="text-related-title">
              Complete the Look
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
