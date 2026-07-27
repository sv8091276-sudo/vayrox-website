import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ruler } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SizeGuide() {
  const [gender, setGender] = useState<'men' | 'women'>('men');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [bodyType, setBodyType] = useState('');
  const [recommendedSize, setRecommendedSize] = useState('');

  const calculateSize = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    if (!h || !w) return;

    // Convert to metric if imperial
    const heightCm = unit === 'imperial' ? h * 30.48 : h;
    const weightKg = unit === 'imperial' ? w * 0.453592 : w;

    // Simple size calculation logic
    if (heightCm < 160 && weightKg < 60) {
      setRecommendedSize('XS');
    } else if (heightCm < 170 && weightKg < 70) {
      setRecommendedSize('S');
    } else if (heightCm < 180 && weightKg < 80) {
      setRecommendedSize('M');
    } else if (heightCm < 185 && weightKg < 90) {
      setRecommendedSize('L');
    } else if (heightCm < 190 && weightKg < 100) {
      setRecommendedSize('XL');
    } else {
      setRecommendedSize('XXL');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ruler className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-size-guide-title">
            Size Recommendation Tool
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find your perfect fit with our advanced sizing algorithm
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <h2 className="text-2xl font-serif font-bold mb-6">Calculate Your Size</h2>
            
            <div className="space-y-6">
              <div>
                <Label>Gender</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Button
                    variant={gender === 'men' ? 'default' : 'outline'}
                    onClick={() => setGender('men')}
                    data-testid="button-gender-men"
                  >
                    Men
                  </Button>
                  <Button
                    variant={gender === 'women' ? 'default' : 'outline'}
                    onClick={() => setGender('women')}
                    data-testid="button-gender-women"
                  >
                    Women
                  </Button>
                </div>
              </div>

              <div>
                <Label>Unit System</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <Button
                    variant={unit === 'metric' ? 'default' : 'outline'}
                    onClick={() => setUnit('metric')}
                    data-testid="button-unit-metric"
                  >
                    Metric (cm/kg)
                  </Button>
                  <Button
                    variant={unit === 'imperial' ? 'default' : 'outline'}
                    onClick={() => setUnit('imperial')}
                    data-testid="button-unit-imperial"
                  >
                    Imperial (ft/lbs)
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="height">
                  Height {unit === 'metric' ? '(cm)' : '(feet)'}
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === 'metric' ? '170' : '5.7'}
                  data-testid="input-height"
                />
              </div>

              <div>
                <Label htmlFor="weight">
                  Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === 'metric' ? '70' : '154'}
                  data-testid="input-weight"
                />
              </div>

              <div>
                <Label htmlFor="body-type">Body Type (Optional)</Label>
                <Select value={bodyType} onValueChange={setBodyType}>
                  <SelectTrigger id="body-type" data-testid="select-body-type">
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slim">Slim</SelectItem>
                    <SelectItem value="athletic">Athletic</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="plus">Plus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={calculateSize}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!height || !weight}
                data-testid="button-calculate"
              >
                Calculate My Size
              </Button>

              {recommendedSize && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 bg-primary/10 border border-primary/20 rounded-lg text-center"
                >
                  <p className="text-sm text-muted-foreground mb-2">Your Recommended Size:</p>
                  <p className="text-5xl font-bold text-primary" data-testid="text-recommended-size">
                    {recommendedSize}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Measurement Guide */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-8"
          >
            <h2 className="text-2xl font-serif font-bold mb-6">How to Measure</h2>
            
            <div className="space-y-6 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Chest/Bust</h3>
                <p>Measure around the fullest part of your chest, keeping the tape parallel to the floor.</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Waist</h3>
                <p>Measure around your natural waistline, keeping the tape comfortably loose.</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Hips</h3>
                <p>Measure around the fullest part of your hips, about 7-9 inches below your waistline.</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Sleeve Length</h3>
                <p>Measure from the center back of your neck, over your shoulder, and down to your wrist.</p>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-3">Pro Tips</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Measure over light clothing for accuracy</li>
                  <li>Keep the tape snug but not tight</li>
                  <li>Stand naturally, don't hold your breath</li>
                  <li>If between sizes, size up for comfort</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Size Charts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-lg p-8"
        >
          <h2 className="text-2xl font-serif font-bold mb-6">Size Charts</h2>
          
          <div className="space-y-8">
            {/* Men's Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Men's Clothing</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Size</th>
                      <th className="text-left py-3 px-4">Chest (inches)</th>
                      <th className="text-left py-3 px-4">Waist (inches)</th>
                      <th className="text-left py-3 px-4">Length (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: 'XS', chest: '34-36', waist: '28-30', length: '26' },
                      { size: 'S', chest: '36-38', waist: '30-32', length: '27' },
                      { size: 'M', chest: '38-40', waist: '32-34', length: '28' },
                      { size: 'L', chest: '40-42', waist: '34-36', length: '29' },
                      { size: 'XL', chest: '42-44', waist: '36-38', length: '30' },
                      { size: 'XXL', chest: '44-46', waist: '38-40', length: '31' },
                    ].map((row) => (
                      <tr key={row.size} className="border-b border-border/50">
                        <td className="py-3 px-4 font-semibold">{row.size}</td>
                        <td className="py-3 px-4 text-muted-foreground">{row.chest}</td>
                        <td className="py-3 px-4 text-muted-foreground">{row.waist}</td>
                        <td className="py-3 px-4 text-muted-foreground">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Women's Chart */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Women's Clothing</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">Size</th>
                      <th className="text-left py-3 px-4">Bust (inches)</th>
                      <th className="text-left py-3 px-4">Waist (inches)</th>
                      <th className="text-left py-3 px-4">Hips (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: 'XS', bust: '32-34', waist: '24-26', hips: '34-36' },
                      { size: 'S', bust: '34-36', waist: '26-28', hips: '36-38' },
                      { size: 'M', bust: '36-38', waist: '28-30', hips: '38-40' },
                      { size: 'L', bust: '38-40', waist: '30-32', hips: '40-42' },
                      { size: 'XL', bust: '40-42', waist: '32-34', hips: '42-44' },
                      { size: 'XXL', bust: '42-44', waist: '34-36', hips: '44-46' },
                    ].map((row) => (
                      <tr key={row.size} className="border-b border-border/50">
                        <td className="py-3 px-4 font-semibold">{row.size}</td>
                        <td className="py-3 px-4 text-muted-foreground">{row.bust}</td>
                        <td className="py-3 px-4 text-muted-foreground">{row.waist}</td>
                        <td className="py-3 px-4 text-muted-foreground">{row.hips}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
