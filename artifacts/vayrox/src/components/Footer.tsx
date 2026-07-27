import { Link } from 'wouter';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { FaPinterest } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: 'Subscribed',
        description: 'You have been added to our newsletter.',
      });
      setEmail('');
    }
  };

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-4">VAYROX</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Redefining luxury fashion with obsidian elegance and platinum refinement.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram" data-testid="link-social-instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter" data-testid="link-social-twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook" data-testid="link-social-facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Pinterest" data-testid="link-social-pinterest">
                <FaPinterest className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <div className="flex flex-col gap-2">
              <Link href="/shop/men" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-shop-men">
                Men's Collection
              </Link>
              <Link href="/shop/women" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-shop-women">
                Women's Collection
              </Link>
              <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-shop-all">
                All Products
              </Link>
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                About Us
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">
                Contact
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-faq">
                FAQ
              </Link>
              <Link href="/size-guide" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-size-guide">
                Size Guide
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-privacy">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-terms">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for exclusive launches and insider access.
            </p>
            <form onSubmit={handleNewsletterSignup} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border"
                required
                data-testid="input-newsletter-email"
              />
              <Button type="submit" variant="default" data-testid="button-newsletter-submit">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2024 VAYROX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
