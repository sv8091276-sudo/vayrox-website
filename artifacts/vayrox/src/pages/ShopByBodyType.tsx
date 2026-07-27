import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const bodyTypes = [
  {
    name: 'Slim',
    description: 'Lean build with minimal curves',
    svg: (
      <svg viewBox="0 0 100 200" className="w-full h-full">
        <path d="M 50 20 L 40 60 L 45 120 L 40 180 M 50 20 L 60 60 L 55 120 L 60 180" stroke="currentColor" fill="none" strokeWidth="3" />
        <circle cx="50" cy="15" r="10" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Athletic',
    description: 'Toned, muscular build',
    svg: (
      <svg viewBox="0 0 100 200" className="w-full h-full">
        <path d="M 50 20 L 35 60 L 40 120 L 35 180 M 50 20 L 65 60 L 60 120 L 65 180" stroke="currentColor" fill="none" strokeWidth="4" />
        <circle cx="50" cy="15" r="10" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Regular',
    description: 'Balanced proportions',
    svg: (
      <svg viewBox="0 0 100 200" className="w-full h-full">
        <path d="M 50 20 L 38 60 L 42 120 L 38 180 M 50 20 L 62 60 L 58 120 L 62 180" stroke="currentColor" fill="none" strokeWidth="3.5" />
        <circle cx="50" cy="15" r="10" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Plus',
    description: 'Fuller, curvier build',
    svg: (
      <svg viewBox="0 0 100 200" className="w-full h-full">
        <path d="M 50 20 L 32 60 L 38 120 L 32 180 M 50 20 L 68 60 L 62 120 L 68 180" stroke="currentColor" fill="none" strokeWidth="5" />
        <circle cx="50" cy="15" r="10" fill="currentColor" />
      </svg>
    ),
  },
];

const recommendations: Record<string, {styles: string[], tips: string[]}> = {
  'Slim': {
    styles: ['Layered hoodies', 'Oversized tees', 'Structured shirts', 'Relaxed-fit pants'],
    tips: [
      'Add volume with layered pieces',
      'Oversized fits create balanced proportions',
      'Horizontal details add width',
      'Experiment with bold textures',
    ],
  },
  'Athletic': {
    styles: ['Fitted tees', 'Tailored hoodies', 'Slim-fit shirts', 'Tapered pants'],
    tips: [
      'Embrace fitted cuts to showcase your build',
      'Structured shoulders enhance your frame',
      'Avoid overly loose silhouettes',
      'Monochrome looks elongate your silhouette',
    ],
  },
  'Regular': {
    styles: ['Classic tees', 'Standard-fit hoodies', 'Button-down shirts', 'Straight-leg pants'],
    tips: [
      'Most styles work beautifully for you',
      'Balance is key—neither too tight nor too loose',
      'Experiment with different cuts freely',
      'Focus on personal style over "rules"',
    ],
  },
  'Plus': {
    styles: ['Longline tees', 'Relaxed hoodies', 'Open-front shirts', 'Comfortable-fit pants'],
    tips: [
      'Vertical lines create elongation',
      'Darker tones are universally flattering',
      'Avoid tight fits—comfort is power',
      'Confidence is your best accessory',
    ],
  },
};

export default function ShopByBodyType() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const recommendation = selectedType ? recommendations[selectedType] : null;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-body-type-title">
            Shop by Body Type
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Curated style recommendations that celebrate your unique shape
          </p>
        </motion.div>

        {/* Body Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Select Your Body Type</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bodyTypes.map((type, index) => (
              <motion.button
                key={type.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedType(type.name)}
                className={`flex flex-col items-center gap-4 p-6 rounded-lg transition-all ${
                  selectedType === type.name
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-muted border-2 border-transparent hover:border-primary/50'
                }`}
                data-testid={`button-body-${type.name.toLowerCase()}`}
              >
                <div className="w-20 h-32 text-foreground">
                  {type.svg}
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-1">{type.name}</h3>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <AnimatePresence mode="wait">
          {recommendation && (
            <motion.div
              key={selectedType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Recommended Styles */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-6">Recommended Styles for {selectedType}</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recommendation.styles.map((style, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-muted border border-border rounded-lg p-4 text-center"
                    >
                      <p className="text-sm font-medium">{style}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Styling Tips */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-6">Styling Tips</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendation.tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Philosophy */}
              <div className="bg-gradient-to-r from-muted via-card to-muted border border-border rounded-lg p-8 text-center">
                <p className="text-lg text-muted-foreground italic">
                  "At VAYROX, we don't design for body types—we design for individuals. These are guides, not rules. Wear what makes you feel unstoppable."
                </p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Link href="/shop">
                  <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-shop-now">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            Select your body type above to see personalized recommendations
          </motion.div>
        )}
      </div>
    </div>
  );
}
