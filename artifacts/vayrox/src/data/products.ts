export interface Product {
  id: number;
  name: string;
  category: 'men' | 'women';
  type: 't-shirt' | 'hoodie' | 'shirt' | 'pants' | 'jeans' | 'kurti' | 'lehenga';
  price: number;
  originalPrice?: number;
  description: string;
  sizes: string[];
  colors: string[];
  image: string;
  images?: string[];
  tags: string[];
  isNew?: boolean;
  isSale?: boolean;
}

function svgPlaceholder(label: string, bg1: string, bg2: string, textColor: string): string {
  const safe = label.replace(/['"<>&]/g, ' ');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${bg1}"/><stop offset="100%" stop-color="${bg2}"/></linearGradient></defs><rect width="600" height="750" fill="url(#g)"/><rect x="200" y="180" width="200" height="260" rx="8" fill="none" stroke="${textColor}" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.4"/><path d="M220 200 h40 l10-20 h60 l10 20 h40" fill="none" stroke="${textColor}" stroke-width="1.5" opacity="0.5"/><rect x="220" y="200" width="160" height="240" rx="4" fill="none" stroke="${textColor}" stroke-width="1" opacity="0.3"/><text x="300" y="510" font-family="Georgia,serif" font-size="15" fill="${textColor}" text-anchor="middle" opacity="0.9" letter-spacing="3">${safe}</text><text x="300" y="540" font-family="Arial,sans-serif" font-size="11" fill="${textColor}" text-anchor="middle" opacity="0.5" letter-spacing="5">VAYROX</text></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

const P = {
  dark: (label: string) => svgPlaceholder(label, '#0a0a0a', '#1a1a1a', '#C0C0C0'),
  mid: (label: string) => svgPlaceholder(label, '#111111', '#2a2a2a', '#E8E8E8'),
  silver: (label: string) => svgPlaceholder(label, '#1c1c1c', '#0a0a0a', '#A8A8A8'),
  light: (label: string) => svgPlaceholder(label, '#C0C0C0', '#E8E8E8', '#111111'),
};

export const products: Product[] = [
  // Men's T-Shirts
  {
    id: 1,
    name: 'Midnight Essence Tee',
    category: 'men',
    type: 't-shirt',
    price: 3499,
    originalPrice: 4999,
    description: 'Premium cotton blend with obsidian dye. Cut for the modern silhouette.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#0a0a0a', '#1a1a1a', '#2a2a2a'],
    image: P.dark('Midnight Essence'),
    images: [P.dark('Front'), P.mid('Back'), P.silver('Detail'), P.dark('Worn')],
    tags: ['bestseller', 'premium'],
    isNew: true,
    isSale: true,
  },
  {
    id: 2,
    name: 'Silver Shadow Crew',
    category: 'men',
    type: 't-shirt',
    price: 2999,
    description: 'Minimalist design with silver-threaded detailing. Effortless refinement.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#111111', '#C0C0C0', '#E8E8E8'],
    image: P.mid('Silver Shadow'),
    tags: ['minimal', 'signature'],
    isNew: true,
  },
  {
    id: 3,
    name: 'Obsidian Elite Tee',
    category: 'men',
    type: 't-shirt',
    price: 3799,
    description: 'Egyptian cotton in deepest black. Tailored fit for those who lead.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#0a0a0a', '#050505'],
    image: P.silver('Obsidian Elite'),
    tags: ['luxury', 'limited'],
    isNew: false,
  },
  {
    id: 4,
    name: 'Platinum Edge Tee',
    category: 'men',
    type: 't-shirt',
    price: 2799,
    description: 'Subtle metallic finish. Contemporary cut with classic appeal.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a', '#A8A8A8'],
    image: P.dark('Platinum Edge'),
    tags: ['modern', 'versatile'],
  },
  // Men's Hoodies
  {
    id: 5,
    name: 'Noir Architect Hoodie',
    category: 'men',
    type: 'hoodie',
    price: 6999,
    originalPrice: 8999,
    description: 'Heavyweight construction with architectural silhouette. Built for presence.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#0a0a0a', '#111111'],
    image: P.mid('Noir Architect'),
    tags: ['bestseller', 'statement'],
    isSale: true,
  },
  {
    id: 6,
    name: 'Midnight Luxe Hoodie',
    category: 'men',
    type: 'hoodie',
    price: 7499,
    description: 'Brushed interior, premium exterior. Engineered comfort meets dark elegance.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#0a0a0a', '#1a1a1a', '#0f0f0f'],
    image: P.dark('Midnight Luxe'),
    tags: ['premium', 'comfort'],
    isNew: true,
  },
  {
    id: 7,
    name: 'Carbon Minimalist Hoodie',
    category: 'men',
    type: 'hoodie',
    price: 5999,
    description: 'Clean lines, zero branding. For those who know.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#0a0a0a', '#2a2a2a'],
    image: P.silver('Carbon Minimal'),
    tags: ['minimal', 'stealth'],
  },
  {
    id: 8,
    name: 'Shadow Elite Hoodie',
    category: 'men',
    type: 'hoodie',
    price: 8499,
    description: 'Technical fabric with silver accents. Performance meets prestige.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['#0a0a0a', '#111111', '#C0C0C0'],
    image: P.mid('Shadow Elite'),
    tags: ['technical', 'luxury'],
    isNew: true,
  },
  // Women's T-Shirts
  {
    id: 9,
    name: 'Onyx Grace Tee',
    category: 'women',
    type: 't-shirt',
    price: 3299,
    description: 'Refined drape with subtle shimmer. Feminine power in deepest black.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#0a0a0a', '#111111', '#C0C0C0'],
    image: P.dark('Onyx Grace'),
    tags: ['elegant', 'bestseller'],
    isNew: true,
  },
  {
    id: 10,
    name: 'Silver Muse Tee',
    category: 'women',
    type: 't-shirt',
    price: 2899,
    originalPrice: 3999,
    description: 'Metallic threading with architectural cut. Modern femininity redefined.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#E8E8E8', '#C0C0C0', '#A8A8A8'],
    image: P.light('Silver Muse'),
    tags: ['modern', 'signature'],
    isSale: true,
  },
  {
    id: 11,
    name: 'Midnight Silk Tee',
    category: 'women',
    type: 't-shirt',
    price: 4499,
    description: 'Silk-blend luxury. Flows like midnight water.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#0a0a0a', '#1a1a1a'],
    image: P.mid('Midnight Silk'),
    tags: ['luxury', 'premium'],
  },
  {
    id: 12,
    name: 'Platinum Whisper Tee',
    category: 'women',
    type: 't-shirt',
    price: 3199,
    description: 'Featherweight construction. Understated elegance.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#C0C0C0', '#E8E8E8'],
    image: P.light('Platinum Whisper'),
    tags: ['minimal', 'versatile'],
  },
  // Women's Hoodies
  {
    id: 13,
    name: 'Eclipse Luxe Hoodie',
    category: 'women',
    type: 'hoodie',
    price: 6499,
    description: 'Tailored silhouette meets oversized comfort. Dramatic and refined.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#0a0a0a', '#111111'],
    image: P.dark('Eclipse Luxe'),
    tags: ['statement', 'comfort'],
    isNew: true,
  },
  {
    id: 14,
    name: 'Silver Noir Hoodie',
    category: 'women',
    type: 'hoodie',
    price: 7299,
    originalPrice: 8999,
    description: 'Silver-threaded fabric with architectural hood. Power dressing, evolved.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#111111', '#C0C0C0'],
    image: P.mid('Silver Noir'),
    tags: ['premium', 'architectural'],
    isSale: true,
  },
  {
    id: 15,
    name: 'Velvet Shadow Hoodie',
    category: 'women',
    type: 'hoodie',
    price: 8799,
    description: 'Velvet-touch exterior. Liquid elegance in motion.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#0a0a0a', '#050505'],
    image: P.silver('Velvet Shadow'),
    tags: ['luxury', 'limited'],
    isNew: true,
  },
  {
    id: 16,
    name: 'Obsidian Dream Hoodie',
    category: 'women',
    type: 'hoodie',
    price: 6999,
    description: 'Cropped silhouette with extended sleeves. Avant-garde comfort.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#0a0a0a', '#1a1a1a', '#111111'],
    image: P.dark('Obsidian Dream'),
    tags: ['modern', 'avant-garde'],
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: 'men' | 'women'): Product[] => {
  return products.filter((p) => p.category === category);
};

export const getProductsByType = (type: Product['type']): Product[] => {
  return products.filter((p) => p.type === type);
};
