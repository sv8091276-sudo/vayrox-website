import { motion } from 'framer-motion';
import { Sparkles, Award, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Hero */}
      <section className="relative h-[50vh] mb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-background" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-shadow-glow" data-testid="text-about-title">
            Redefining Luxury
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Born from a vision to merge Indian heritage with obsidian elegance
          </p>
        </motion.div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              VAYROX was born in the shadows of India's rich textile legacy, where centuries of craftsmanship meet contemporary rebellion. We don't design for trends. We create for those who set them.
            </p>
            <p>
              Every piece tells a story of obsidian nights and platinum dawns. Of power that doesn't need to shout. Of elegance so dark it shimmers. We believe luxury isn't about logos or labels—it's about how you feel when the fabric touches your skin, how you move when you know you're wearing something extraordinary.
            </p>
            <p>
              From the cutting-edge streets of Mumbai to the royal courts of Rajasthan, VAYROX embodies the duality of modern India—ancient sophistication reimagined for the new world.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Pillars */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Philosophy</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-lg p-8 text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Uncompromising Quality</h3>
            <p className="text-muted-foreground text-sm">
              We source only the finest materials. Egyptian cotton, brushed cashmere, silk blends engineered for durability. Every stitch is precision. Every cut is intentional.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-8 text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Fearless Craftsmanship</h3>
            <p className="text-muted-foreground text-sm">
              Our artisans don't follow patterns—they create them. Trained in traditional Indian techniques, liberated by modern design freedom. The result? Pieces you won't find anywhere else.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-lg p-8 text-center"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Authentic Identity</h3>
            <p className="text-muted-foreground text-sm">
              Fashion is personal. VAYROX isn't about fitting in—it's about standing out without trying. Wear what resonates. Own your presence. Be unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-muted via-card to-muted border border-border rounded-lg p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground italic leading-relaxed">
            "To create a world where elegance is measured not by what you wear, but by how powerfully you own it. VAYROX is for the bold, the refined, the unforgettable."
          </p>
        </motion.div>
      </section>

      {/* Team (Placeholder) */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">The Visionaries</h2>
          <p className="text-muted-foreground mb-12">
            Meet the minds behind the midnight revolution
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Creative Director', 'Head of Design', 'Chief Artisan'].map((role, index) => (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{role}</h3>
                <p className="text-sm text-muted-foreground">Coming Soon</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
