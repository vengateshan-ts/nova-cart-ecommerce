import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X, Moon, Sun, MapPin, ChevronDown, Package, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { categoryNames } from '../../utils/dummyData';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
    }
  };

  const cartCount = cartItems.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0);

  const allCategories = ['All', ...categoryNames];

  return (
    <>
      {/* ═══ ANNOUNCEMENT BAR ═══ */}
      <div className="bg-navy-900 dark:bg-navy-800 text-white text-xs py-1.5 relative z-[60]">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-hidden">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Zap size={12} className="text-brand-400" />
              Free delivery on orders above ₹999
            </span>
            <span className="hidden sm:inline text-navy-400">|</span>
            <span className="hidden sm:inline whitespace-nowrap text-brand-300 font-medium">
              Use code NOVA15 for 15% off
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-navy-300">
            <Link to="#" className="hover:text-white transition-colors">Sell on NovaCart</Link>
            <span className="text-navy-600">|</span>
            <Link to="#" className="hover:text-white transition-colors">Help</Link>
          </div>
        </div>
      </div>

      {/* ═══ MAIN NAVBAR ═══ */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl shadow-nav'
            : 'bg-white dark:bg-navy-900'
        } border-b border-gray-100 dark:border-navy-800`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-brand-500/30">
                N
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white font-display">
                Nova<span className="text-brand-500">Cart</span>
              </span>
            </Link>

            {/* Location — Desktop */}
            <div className="hidden lg:flex items-center gap-1.5 text-sm cursor-pointer hover:text-brand-600 transition-colors text-gray-600 dark:text-gray-400 shrink-0 border-r border-gray-200 dark:border-navy-700 pr-4">
              <MapPin size={14} className="text-brand-500" />
              <div className="leading-tight">
                <p className="text-[10px] text-gray-400 dark:text-gray-500">Deliver to</p>
                <p className="font-medium text-gray-800 dark:text-gray-200">Chennai 600001</p>
              </div>
            </div>

            {/* Search Bar — Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
              <div className="flex w-full rounded-lg overflow-hidden border-2 border-brand-400 hover:border-brand-500 focus-within:border-brand-500 transition-colors bg-gray-50 dark:bg-navy-800">
                <select
                  className="bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-3 border-r border-gray-200 dark:border-navy-600 focus:outline-none cursor-pointer"
                  defaultValue="all"
                >
                  <option value="all">All</option>
                  {categoryNames.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-sm bg-transparent focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="px-4 bg-brand-500 hover:bg-brand-600 text-white transition-colors"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Theme Toggle */}
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors text-gray-600 dark:text-gray-400"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Account */}
              <Link to="/login" className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors">
                <User size={20} className="text-gray-600 dark:text-gray-400" />
                <div className="hidden lg:block leading-tight text-left">
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">Hello, Sign in</p>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">Account</p>
                </div>
              </Link>

              {/* Orders */}
              <Link to="/dashboard" className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors">
                <Package size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">Orders</span>
              </Link>

              {/* Wishlist */}
              <Link to="#" className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors text-gray-600 dark:text-gray-400 relative">
                <Heart size={20} />
              </Link>

              {/* Cart */}
              <Link to="/cart" className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors text-gray-600 dark:text-gray-400 relative">
                <div className="relative">
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-navy-900 animate-badge-pop"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </div>
                <span className="hidden lg:inline text-xs font-semibold text-gray-800 dark:text-gray-200">Cart</span>
              </Link>

              {/* Mobile Search Toggle */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors text-gray-600 dark:text-gray-400"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Search size={20} />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors text-gray-600 dark:text-gray-400"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ═══ CATEGORY STRIP ═══ */}
        <div className="border-t border-gray-100 dark:border-navy-800 bg-gray-50/50 dark:bg-navy-900/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2">
              {allCategories.map(cat => (
                <Link
                  key={cat}
                  to={cat === 'All' ? '/shop' : `/shop?category=${cat}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all duration-200 ${
                    activeCategory === cat
                      ? 'bg-brand-500 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </Link>
              ))}
              <span className="px-3 py-1.5 text-xs font-medium text-brand-500 whitespace-nowrap cursor-pointer hover:underline">
                More ▾
              </span>
            </div>
          </div>
        </div>

        {/* ═══ MOBILE SEARCH BAR ═══ */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-gray-100 dark:border-navy-800 overflow-hidden"
            >
              <form onSubmit={handleSearch} className="p-3">
                <div className="flex rounded-lg overflow-hidden border-2 border-brand-400 bg-gray-50 dark:bg-navy-800">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-3 text-sm bg-transparent focus:outline-none text-gray-900 dark:text-white"
                    autoFocus
                  />
                  <button type="submit" className="px-4 bg-brand-500 text-white">
                    <Search size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══ MOBILE DRAWER MENU ═══ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white dark:bg-navy-900 z-[70] shadow-2xl md:hidden overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="bg-gradient-to-r from-brand-500 to-brand-600 p-5 text-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold font-display">NovaCart</span>
                  <button onClick={() => setIsMobileMenuOpen(false)}>
                    <X size={22} />
                  </button>
                </div>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Hello, Sign in</p>
                    <p className="text-xs text-white/70">Account & Lists</p>
                  </div>
                </Link>
              </div>

              {/* Drawer Nav */}
              <div className="p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Shop by Category</p>
                {categoryNames.map(cat => (
                  <Link
                    key={cat}
                    to={`/shop?category=${cat}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 border-b border-gray-100 dark:border-navy-800 transition-colors"
                  >
                    {cat}
                    <ChevronDown size={14} className="-rotate-90 text-gray-400" />
                  </Link>
                ))}

                <div className="mt-6 space-y-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">My Account</p>
                  {[
                    { label: 'My Orders', path: '/dashboard', icon: Package },
                    { label: 'My Wishlist', path: '#', icon: Heart },
                    { label: 'My Cart', path: '/cart', icon: ShoppingCart },
                  ].map(item => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-3 px-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-600 transition-colors"
                    >
                      <item.icon size={18} className="text-gray-400" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
