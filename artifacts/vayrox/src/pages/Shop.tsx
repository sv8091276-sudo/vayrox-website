import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products, Product } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'men' | 'women'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | Product['type']>('all');
  const [sizeFilter, setSizeFilter] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<'new' | 'price-low' | 'price-high'>('new');
  const [showFilters, setShowFilters] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const types: Array<'all' | Product['type']> = ['all', 't-shirt', 'hoodie'];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    // Type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(p => p.type === typeFilter);
    }

    // Size
    if (sizeFilter.length > 0) {
      filtered = filtered.filter(p =>
        p.sizes.some(size => sizeFilter.includes(size))
      );
    }

    // Price
    filtered = filtered.filter(p =>
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      // New arrivals first
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return filtered;
  }, [searchQuery, categoryFilter, typeFilter, sizeFilter, priceRange, sortBy]);

  const toggleSize = (size: string) => {
    setSizeFilter(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4" data-testid="text-shop-title">
            All Products
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} products
          </p>
        </motion.div>

        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search"
            />
          </div>

          <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
            <SelectTrigger className="w-full md:w-48" data-testid="select-sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New Arrivals</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
            data-testid="button-toggle-filters"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 space-y-6`}>
            {/* Category */}
            <div>
              <h3 className="font-semibold mb-3">Category</h3>
              <div className="space-y-2">
                <Button
                  variant={categoryFilter === 'all' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setCategoryFilter('all')}
                  data-testid="button-filter-all"
                >
                  All
                </Button>
                <Button
                  variant={categoryFilter === 'men' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setCategoryFilter('men')}
                  data-testid="button-filter-men"
                >
                  Men
                </Button>
                <Button
                  variant={categoryFilter === 'women' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setCategoryFilter('women')}
                  data-testid="button-filter-women"
                >
                  Women
                </Button>
              </div>
            </div>

            {/* Type */}
            <div>
              <h3 className="font-semibold mb-3">Type</h3>
              <div className="space-y-2">
                {types.map(type => (
                  <Button
                    key={type}
                    variant={typeFilter === type ? 'default' : 'outline'}
                    className="w-full justify-start capitalize"
                    onClick={() => setTypeFilter(type)}
                    data-testid={`button-filter-type-${type}`}
                  >
                    {type === 'all' ? 'All Types' : type.replace('-', ' ')}
                  </Button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map(size => (
                  <Button
                    key={size}
                    variant={sizeFilter.includes(size) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleSize(size)}
                    data-testid={`button-filter-size-${size}`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={10000}
                  step={500}
                  value={priceRange}
                  onValueChange={(v) => setPriceRange(v as [number, number])}
                  data-testid="slider-price"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {(categoryFilter !== 'all' || typeFilter !== 'all' || sizeFilter.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 10000) && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setCategoryFilter('all');
                  setTypeFilter('all');
                  setSizeFilter([]);
                  setPriceRange([0, 10000]);
                }}
                data-testid="button-clear-filters"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No products found.</p>
                <p className="text-muted-foreground text-sm mt-2">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
