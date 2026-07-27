import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const skinTones = [
  { name: 'Fair', color: '#F5D6C6', hex: '#F5D6C6' },
  { name: 'Light', color: '#E8B69A', hex: '#E8B69A' },
  { name: 'Medium', color: '#D19B76', hex: '#D19B76' },
  { name: 'Tan', color: '#B17B5E', hex: '#B17B5E' },
  { name: 'Deep', color: '#8B5E3C', hex: '#8B5E3C' },
  { name: 'Rich', color: '#6B4423', hex: '#6B4423' },
];

const colorRecommendations: Record<string, {colors: string[], description: string}> = {
  'Fair': {
    colors: ['#0a0a0a', '#1a1a1a', '#C0C0C0', '#4A4A4A', '#8B0000'],
    description: 'Deep blacks and silvers create striking contrast. Rich jewel tones elevate your natural radiance.',
  },
  'Light': {
    colors: ['#111111', '#2a2a2a', '#E8E8E8', '#556B2F', '#800020'],
    description: 'Charcoal greys and platinum tones complement beautifully. Earth tones add warmth.',
  },
  'Medium': {
    colors: ['#0a0a0a', '#A8A8A8', '#8B4513', '#2F4F4F', '#C71585'],
    description: 'Obsidian blacks are powerful. Warm browns and deep teals enhance your undertones.',
  },
  'Tan': {
    colors: ['#111111', '#CD853F', '#708090', '#8B0000', '#C0C0C0'],
    description: 'Rich blacks ground your presence. Burnt oranges and slate greys add sophistication.',
  },
  'Deep': {
    colors: ['#0a0a0a', '#FFD700', '#E8E8E8', '#800080', '#FF4500'],
    description: 'Pure black is regal. Bright metallics and bold jewel tones are stunning.',
  },
  'Rich': {
    colors: ['#FFFFFF', '#FFD700', '#FF6347', '#00CED1', '#FF69B4'],
    description: 'Crisp whites are powerful. Vibrant golds, corals, and electric hues command attention.',
  },
};

export default function SkinTone() {
  const [selectedTone, setSelectedTone] = useState<string | null>(null);

  const recommendation = selectedTone ? colorRecommendations[selectedTone] : null;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Palette className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-skin-tone-title">
            Skin Tone Color Matching
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the colors that elevate your natural beauty
          </p>
        </motion.div>

        {/* Skin Tone Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-serif font-bold mb-6 text-center">Select Your Skin Tone</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skinTones.map((tone, index) => (
              <motion.button
                key={tone.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedTone(tone.name)}
                className={`flex flex-col items-center gap-3 p-4 rounded-lg transition-all ${
                  selectedTone === tone.name
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-muted border-2 border-transparent hover:border-primary/50'
                }`}
                data-testid={`button-tone-${tone.name.toLowerCase()}`}
              >
                <div
                  className="w-20 h-20 rounded-full border-2 border-border shadow-lg"
                  style={{ backgroundColor: tone.color }}
                />
                <span className="text-sm font-medium">{tone.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <AnimatePresence mode="wait">
          {recommendation && (
            <motion.div
              key={selectedTone}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Description */}
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-3">Perfect Colors for {selectedTone}</h3>
                <p className="text-muted-foreground">{recommendation.description}</p>
              </div>

              {/* Color Palette */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-6">Recommended Color Palette</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {recommendation.colors.map((color, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center gap-3"
                    >
                      <div
                        className="w-24 h-24 rounded-lg border-2 border-border shadow-lg"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xs text-muted-foreground font-mono">{color}</span>
                      <Link href={`/shop?color=${encodeURIComponent(color)}`}>
                        <Button variant="outline" size="sm" data-testid={`button-shop-color-${index}`}>
                          Shop This Color
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Styling Tips */}
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-4">Styling Tips</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>• Layer complementary tones to create depth and visual interest</p>
                  <p>• Use metallics as accents to enhance your natural glow</p>
                  <p>• Dark bases with bright pops work universally well</p>
                  <p>• VAYROX's obsidian blacks are engineered to flatter every skin tone</p>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <Link href="/shop">
                  <Button size="lg" className="bg-primary hover:bg-primary/90" data-testid="button-browse-collection">
                    Browse Full Collection
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedTone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-muted-foreground"
          >
            Select your skin tone above to see personalized color recommendations
          </motion.div>
        )}
      </div>
    </div>
  );
}
