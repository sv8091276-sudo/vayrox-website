import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false);

  const shipping = cartTotal > 2999 ? 0 : 200;
  const total = cartTotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-muted-foreground" />
          <h1 className="text-3xl font-serif font-bold mb-4" data-testid="text-empty-cart">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Discover pieces that embody dark elegance and timeless power.
          </p>
          <Link href="/shop">
            <Button size="lg" data-testid="button-continue-shopping-empty">
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2" data-testid="text-cart-title">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground">{items.length} items</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.size}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-lg p-6 flex gap-6"
                data-testid={`cart-item-${item.product.id}-${item.size}`}
              >
                <Link href={`/product/${item.product.id}`} className="flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-32 object-cover rounded"
                    data-testid={`img-cart-item-${item.product.id}`}
                  />
                </Link>

                <div className="flex-1">
                  <Link href={`/product/${item.product.id}`}>
                    <h3 className="font-semibold mb-1 hover:text-primary transition-colors" data-testid={`text-cart-item-name-${item.product.id}`}>
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-3">Size: {item.size}</p>

                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        data-testid={`button-decrease-${item.product.id}-${item.size}`}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm" data-testid={`text-quantity-${item.product.id}-${item.size}`}>
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        data-testid={`button-increase-${item.product.id}-${item.size}`}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="flex-1" />

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      data-testid={`button-remove-${item.product.id}-${item.size}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="font-semibold" data-testid={`text-item-total-${item.product.id}-${item.size}`}>
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-lg p-6 sticky top-24"
            >
              <h2 className="text-xl font-serif font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="text-subtotal">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span data-testid="text-shipping">
                    {shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{(3000 - cartTotal).toLocaleString()} more for free shipping
                  </p>
                )}
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span data-testid="text-total">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Dialog open={showCheckoutDialog} onOpenChange={setShowCheckoutDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full mb-3 bg-primary hover:bg-primary/90" size="lg" data-testid="button-checkout">
                    Proceed to Checkout
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Checkout Coming Soon</DialogTitle>
                  </DialogHeader>
                  <p className="text-muted-foreground">
                    Full checkout functionality will be available soon. Stay tuned for the complete VAYROX experience.
                  </p>
                </DialogContent>
              </Dialog>

              <Link href="/shop">
                <Button variant="outline" className="w-full" data-testid="button-continue-shopping">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
