import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruler } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const frameTypes = ['Petite', 'Regular', 'Tall'];

const heightRanges = {
  Petite: { min: 150, max: 165 },
  Regular: { min: 165, max: 180 },
  Tall: { min: 180, max: 200 },
};

const recommendations: Record<string, {fits: string[], tips: string[]}> = {
  'Petite': {
    fits: ['Cropped hoodies', 'Regular-length tees', 'Ankle-length pants', 'Shorter inseams'],
    tips: [
      'Avoid overwhelming proportions',
      'Cropped fits prevent fabric pooling',
      'Monochrome creates vertical lines',
      'Fitted silhouettes elongate your frame',
    ],
  },
  'Regular': {
    fits: ['Standard hoodies', 'Regular tees', 'Standard-length pants', 'Versatile fits'],
    tips: [
      'Most standard sizes work perfectly',
      'Experiment freely with proportions',
      'Layering works beautifully',
      'Focus on personal style preferences',
    ],
  },
  'Tall': {
    fits: ['Longline hoodies', 'Extended-length tees', 'Long-inseam pants', 'Tall-specific cuts'],
    tips: [
      'Look for extended-length options',
      'Avoid cropped styles',
      'Layering adds visual interest',
      'Embrace your height with confidence',
    ],
  },
};

export default function ShopByHeight() {
  const [height, setHeight] = useState([170]);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);

  const heightCm = height[0];
  const heightFt = Math.floor(heightCm / 30.48);
  const heightIn = Math.round((heightCm / 30.48 - heightFt) * 12);

  const recommendation = selectedFrame ? recommendations[selectedFrame] : null;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ruler className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-height-title">
            Shop by Height
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect fit based on your height and frame
          </p>
        </motion.div>

        {/* Height Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Select Your Height</h2>
          
          <div className="max-w-md mx-auto space-y-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2" data-testid="text-height-value">
                {heightCm} cm
              </div>
              <div className="text-muted-foreground">
                {heightFt}'{heightIn}"
              </div>
            </div>

            <div className="px-4">
              <Slider
                min={150}
                max={200}
                step={1}
                value={height}
                onValueChange={setHeight}
                className="cursor-pointer"
                data-testid="slider-height"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>5'0"</span>
                <span>6'6"</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Frame Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Select Your Frame</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {frameTypes.map((frame, index) => {
              const range = heightRanges[frame as keyof typeof heightRanges];
              const isInRange = heightCm >= range.min && heightCm < range.max;
              
              return (
                <motion.button
                  key={frame}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedFrame(frame)}
                  className={`p-6 rounded-lg transition-all ${
                    selectedFrame === frame
                      ? 'bg-primary/10 border-2 border-primary'
                      : isInRange
                      ? 'bg-muted border-2 border-primary/30'
                      : 'bg-muted border-2 border-transparent hover:border-primary/50'
                  }`}
                  data-testid={`button-frame-${frame.toLowerCase()}`}
                >
                  <h3 className="font-semibold mb-2">{frame}</h3>
                  <p className="text-sm text-muted-foreground">
                    {range.min}-{range.max} cm
                  </p>
                  {isInRange && (
                    <p className="text-xs text-primary mt-2">Recommended for your height</p>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Recommendations */}
        <AnimatePresence mode="wait">
          {recommendation && (
            <motion.div
              key={selectedFrame}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Recommended Fits */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-6">Recommended Fits for {selectedFrame}</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recommendation.fits.map((fit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-muted border border-border rounded-lg p-4 text-center"
                    >
                      <p className="text-sm font-medium">{fit}</p>
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

              {/* Why Height Matters */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-4">Why Height Affects Fit</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Height determines how fabric drapes on your body. A hoodie designed for 5'10" will pool differently on someone 5'6" or 6'2". VAYROX pieces are engineered with proportional lengths to ensure every silhouette looks intentional, not accidental.
                </p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Link href="/shop">
                  <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-browse">
                    Browse Collection
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedFrame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            Select your frame type above to see personalized recommendations
          </motion.div>
        )}
      </div>
    </div>
  );
}
