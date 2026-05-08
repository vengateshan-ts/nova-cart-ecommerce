import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, ChevronUp, Search, Grid3X3, List, X, SlidersHorizontal, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/product/ProductCard';
import { categoryNames, brands } from '../utils/dummyData';
import { fetchProducts } from '../redux/slices/productSlice';
import type { RootState, AppDispatch } from '../redux/store';

const Shop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading } = useSelector((state: RootState) => state.products);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1100000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Accordion state
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    brands: true,
    rating: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    let result = [...products].filter(p => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesBrand = selectedBrands.length === 0 || (p.brand && selectedBrands.includes(p.brand));
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesRating = (p.rating || 0) >= minRating;
      return matchesCategory && matchesBrand && matchesSearch && matchesPrice && matchesRating;
    });

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'discount': result.sort((a, b) => {
        const discA = a.originalPrice ? (a.originalPrice - a.price) : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.price) : 0;
        return discB - discA;
      }); break;
    }

    return result;
  }, [products, selectedCategories, selectedBrands, searchQuery, sortBy, priceRange, minRating]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinRating(0);
    setSearchQuery('');
    setPriceRange([0, 1100000]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || minRating > 0 || searchQuery || priceRange[0] > 0 || priceRange[1] < 1100000;

  const formatPrice = (n: number) => n.toLocaleString('en-IN');

  const FilterContent = () => (
    <div className="space-y-1">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-sm focus:ring-2 focus:ring-brand-500 outline-none text-gray-900 dark:text-white transition-all"
        />
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1.5 mb-4 pb-4 border-b border-gray-100 dark:border-navy-700">
          {selectedCategories.map(cat => (
            <button key={cat} onClick={() => toggleCategory(cat)}
              className="flex items-center gap-1 px-2 py-1 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-[11px] font-medium rounded-md">
              {cat} <X size={10} />
            </button>
          ))}
          {selectedBrands.map(brand => (
            <button key={brand} onClick={() => toggleBrand(brand)}
              className="flex items-center gap-1 px-2 py-1 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-[11px] font-medium rounded-md">
              {brand} <X size={10} />
            </button>
          ))}
          <button onClick={clearAllFilters} className="text-[11px] text-red-500 font-medium hover:underline ml-1">
            Clear All
          </button>
        </div>
      )}

      <div className="border-b border-gray-100 dark:border-navy-700 pb-4 mb-4">
        <button onClick={() => toggleSection('categories')} className="flex items-center justify-between w-full mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Categories</h3>
          {openSections.categories ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
        </button>
        {openSections.categories && (
          <div className="space-y-1.5">
            {categoryNames.map(cat => {
              const count = products.filter(p => p.category === cat).length;
              return (
                <label key={cat} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 cursor-pointer accent-brand-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors flex-1">
                    {cat}
                  </span>
                  <span className="text-[10px] text-gray-400 bg-gray-100 dark:bg-navy-700 px-1.5 py-0.5 rounded">{count}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-b border-gray-100 dark:border-navy-700 pb-4 mb-4">
        <button onClick={() => toggleSection('price')} className="flex items-center justify-between w-full mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Price Range</h3>
          {openSections.price ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
        </button>
        {openSections.price && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0] || ''}
                  onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                  className="w-full pl-6 pr-2 py-2 border border-gray-200 dark:border-navy-700 rounded-lg text-xs bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white"
                />
              </div>
              <span className="text-gray-400 text-xs">to</span>
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1] < 1100000 ? priceRange[1] : ''}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 1100000])}
                  className="w-full pl-6 pr-2 py-2 border border-gray-200 dark:border-navy-700 rounded-lg text-xs bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'Under ₹5K', range: [0, 5000] as [number, number] },
                { label: '₹5K–₹25K', range: [5000, 25000] as [number, number] },
                { label: '₹25K–₹1L', range: [25000, 100000] as [number, number] },
                { label: 'Above ₹1L', range: [100000, 1100000] as [number, number] },
              ].map(opt => (
                <button
                  key={opt.label}
                  onClick={() => setPriceRange(opt.range)}
                  className={`px-2.5 py-1 text-[10px] font-medium rounded-md border transition-colors ${
                    priceRange[0] === opt.range[0] && priceRange[1] === opt.range[1]
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-600'
                      : 'border-gray-200 dark:border-navy-700 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-b border-gray-100 dark:border-navy-700 pb-4 mb-4">
        <button onClick={() => toggleSection('brands')} className="flex items-center justify-between w-full mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Brands</h3>
          {openSections.brands ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
        </button>
        {openSections.brands && (
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {brands.map(brand => {
              const count = products.filter(p => p.brand === brand).length;
              return (
                <label key={brand} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-brand-500 focus:ring-brand-500 cursor-pointer accent-brand-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors flex-1">
                    {brand}
                  </span>
                  <span className="text-[10px] text-gray-400 bg-gray-100 dark:bg-navy-700 px-1.5 py-0.5 rounded">{count}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <button onClick={() => toggleSection('rating')} className="flex items-center justify-between w-full mb-3">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Customer Rating</h3>
          {openSections.rating ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
        </button>
        {openSections.rating && (
          <div className="space-y-1.5">
            {[4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                className={`flex items-center gap-2 w-full py-1.5 px-2 rounded-lg text-sm transition-colors ${
                  minRating === rating ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-800'
                }`}
              >
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={12} className={s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="text-xs">& Up</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-surface-dark min-h-screen">
      <div className="container mx-auto px-4 py-5">
        <div className="flex gap-5">
          <aside className="hidden lg:block w-[240px] shrink-0">
            <div className="bg-white dark:bg-navy-900 p-4 rounded-xl border border-gray-200 dark:border-navy-800 sticky top-36">
              <div className="flex items-center gap-2 font-semibold text-sm text-gray-900 dark:text-white mb-4 pb-3 border-b border-gray-100 dark:border-navy-700">
                <Filter size={16} /> Filters
              </div>
              <FilterContent />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 bg-white dark:bg-navy-900 p-3.5 rounded-xl border border-gray-200 dark:border-navy-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-gray-100 dark:bg-navy-800 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300"
                >
                  <SlidersHorizontal size={15} /> Filters
                </button>
                <h1 className="text-base font-semibold text-gray-900 dark:text-white">
                  {selectedCategories.length === 1 ? selectedCategories[0] : 'All Products'}
                </h1>
                <span className="text-xs text-gray-400 font-medium">
                  ({filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 border border-gray-200 dark:border-navy-700 rounded-lg bg-gray-50 dark:bg-navy-800 text-xs font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="discount">Best Discount</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <div className="hidden sm:flex items-center border border-gray-200 dark:border-navy-700 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-brand-500 text-white' : 'bg-gray-50 dark:bg-navy-800 text-gray-500 hover:text-gray-700'}`}
                  >
                    <Grid3X3 size={15} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-brand-500 text-white' : 'bg-gray-50 dark:bg-navy-800 text-gray-500 hover:text-gray-700'}`}
                  >
                    <List size={15} />
                  </button>
                </div>
              </div>
            </div>

            {isLoading && products.length === 0 ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredProducts.length > 0 ? (
              <motion.div layout className={viewMode === 'grid' ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4' : 'flex flex-col gap-3'}>
                <AnimatePresence>
                  {filteredProducts.map(product => (
                    <motion.div key={product._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <ProductCard product={product} layout={viewMode} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-navy-900 rounded-xl border border-gray-200 dark:border-navy-800">
                <div className="w-16 h-16 bg-gray-100 dark:bg-navy-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <button onClick={clearAllFilters} className="text-brand-500 hover:text-brand-600 text-sm font-semibold">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60] lg:hidden" onClick={() => setShowMobileFilters(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed top-0 left-0 bottom-0 w-[300px] bg-white dark:bg-navy-900 z-[70] shadow-2xl lg:hidden overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-navy-800">
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2"><Filter size={16} /> Filters</h3>
                <button onClick={() => setShowMobileFilters(false)} className="p-1 text-gray-500"><X size={20} /></button>
              </div>
              <div className="p-4"><FilterContent /></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Shop;
