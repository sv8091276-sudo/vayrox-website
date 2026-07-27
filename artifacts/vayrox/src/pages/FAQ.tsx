import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What makes VAYROX different from other fashion brands?',
    answer: "VAYROX merges Indian heritage with contemporary dark elegance. We use only premium materials—Egyptian cotton, silk blends, brushed cashmere—and every piece is crafted by artisans trained in traditional techniques. We don't follow trends; we create timeless pieces for those who set them.",
  },
  {
    question: 'How do I determine my size?',
    answer: "Use our Size Recommendation Tool for personalized sizing based on your height, weight, and body type. You can also refer to our detailed size charts on each product page. If you're between sizes, we recommend sizing up for a more relaxed fit.",
  },
  {
    question: 'Do you offer free shipping?',
    answer: 'Yes! We offer free standard shipping on all orders above ₹2,999. For orders below this amount, a flat shipping fee of ₹200 applies. Express delivery options are available at checkout for faster delivery.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return window for unused items in original condition with tags attached. Exchanges are available within 15 days. Return shipping is free for defective items; customer-initiated returns may incur a small processing fee.',
  },
  {
    question: 'How should I care for VAYROX garments?',
    answer: 'Most VAYROX pieces are machine washable in cold water. Tumble dry on low heat. Avoid bleach and do not iron directly on prints or embellishments. For silk and cashmere blends, we recommend dry cleaning for longevity.',
  },
  {
    question: 'Are VAYROX products made in India?',
    answer: "Yes, all VAYROX garments are designed and crafted in India by skilled artisans. We're proud to support local craftsmanship while maintaining the highest international quality standards.",
  },
  {
    question: 'How long does delivery take?',
    answer: "Standard shipping typically takes 5-7 business days within India. Metro cities may receive orders in 3-5 days. Express delivery (1-2 days) is available for select pin codes. You'll receive tracking information once your order ships.",
  },
  {
    question: 'Can I track my order?',
    answer: "Absolutely. Once your order ships, you'll receive a tracking number via email and SMS. You can track your order in real-time through our website or the courier partner's tracking portal.",
  },
  {
    question: 'Do you offer gift wrapping?',
    answer: 'Yes, luxury gift wrapping is available for ₹250 per item. Select this option at checkout. Each gift-wrapped package includes a premium black box with silver ribbon and a personalized message card.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards (Visa, Mastercard, American Express), UPI, net banking, and popular digital wallets. Payment is processed securely through encrypted channels.',
  },
  {
    question: 'How do I use the Skin Tone Color Recommendation tool?',
    answer: 'Navigate to our Skin Tone page and select your skin tone from the interactive palette. The tool will instantly show clothing colors that complement your complexion, along with styling tips and a curated product selection.',
  },
  {
    question: 'Can I cancel or modify my order?',
    answer: 'Orders can be modified or cancelled within 2 hours of placement. After this window, orders enter processing and cannot be changed. Contact our support team immediately if you need assistance.',
  },
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-faq-title">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground mb-8">
            Everything you need to know about VAYROX
          </p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-faq"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline" data-testid={`accordion-faq-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No FAQs match your search.</p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-muted via-card to-muted border border-border rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-serif font-bold mb-3">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Our team is here to help. Reach out anytime.
          </p>
          <a href="/contact">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded" data-testid="button-contact-us">
              Contact Us
            </button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
