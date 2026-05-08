import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, RotateCcw, ChevronLeft, ChevronRight, Zap, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/product/ProductCard';
import { categories, heroBanners } from '../utils/dummyData';
import { fetchProducts } from '../redux/slices/productSlice';
import type { RootState, AppDispatch } from '../redux/store';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, isLoading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const featuredProducts = useMemo(() => products.filter(p => (p.rating || 0) >= 4.7).slice(0, 4), [products]);
  const trendingProducts = useMemo(() => products.slice(0, 4), [products]); // Simplified for now
  const dealProducts = useMemo(() => products.filter(p => p.originalPrice && p.price < p.originalPrice).slice(0, 6), [products]);
  const bestSellers = useMemo(() => products.filter(p => p.isBestSeller).slice(0, 4), [products]);

  // Hero carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer
  const [countdown, setCountdown] = useState({ hours: 5, minutes: 43, seconds: 21 });
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  if (isLoading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-navy-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-semibold animate-pulse">Loading Marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* ═══════════════════════════════════════════
          1. HERO CAROUSEL
          ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gray-900 h-[280px] sm:h-[360px] md:h-[420px]">
        {heroBanners.map((banner, idx) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-lg">
                  <motion.h1
                    key={`title-${idx}`}
                    initial={{ y: 30, opacity: 0 }}
                    animate={idx === currentSlide ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 leading-tight font-display"
                  >
                    {banner.title}
                  </motion.h1>
                  <motion.p
                    key={`sub-${idx}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={idx === currentSlide ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-sm sm:text-base md:text-lg text-gray-300 mb-5"
                  >
                    {banner.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={idx === currentSlide ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Link
                      to={banner.link}
                      className="nova-btn-primary px-6 py-3 text-sm"
                    >
                      {banner.cta} <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Carousel controls */}
        <button
          onClick={() => setCurrentSlide(prev => (prev - 1 + heroBanners.length) % heroBanners.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 flex items-center justify-center transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setCurrentSlide(prev => (prev + 1) % heroBanners.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 flex items-center justify-center transition-colors"
        >
          <ChevronRight size={20} />
        </button>
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroBanners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-brand-500' : 'w-4 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. TRUST BAR
          ═══════════════════════════════════════════ */}
      <section className="bg-white dark:bg-navy-900 border-b border-gray-100 dark:border-navy-800 py-3">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹999' },
              { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '7 day return policy' },
              { icon: Clock, title: '24/7 Support', desc: 'Chat & phone support' },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 py-2">
                <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-500 shrink-0">
                  <feature.icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{feature.title}</p>
                  <p className="text-[10px] text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. SHOP BY CATEGORY
          ═══════════════════════════════════════════ */}
      <section className="bg-white dark:bg-navy-900 py-6">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-4">Shop by Category</h2>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
            {categories.map((cat, idx) => (
              <Link
                key={cat.name}
                to={`/shop?category=${cat.name}`}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 dark:from-navy-800 dark:to-navy-700 flex items-center justify-center text-2xl group-hover:shadow-md group-hover:scale-105 transition-all border border-brand-100 dark:border-navy-600"
                >
                  {cat.icon}
                </motion.div>
                <span className="text-[11px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. DEALS OF THE DAY
          ═══════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-navy-900/50 py-6 border-y border-gray-100 dark:border-navy-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="section-title">Deals of the Day</h2>
              <div className="hidden sm:flex items-center gap-1.5 ml-3">
                {[
                  { val: pad(countdown.hours), label: 'Hrs' },
                  { val: pad(countdown.minutes), label: 'Min' },
                  { val: pad(countdown.seconds), label: 'Sec' },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="bg-navy-800 dark:bg-brand-600 text-white text-xs font-bold px-2 py-1 rounded min-w-[28px] text-center">
                      {t.val}
                    </span>
                    {i < 2 && <span className="text-navy-800 dark:text-gray-400 font-bold text-xs">:</span>}
                  </div>
                ))}
              </div>
            </div>
            <Link to="/shop" className="text-brand-500 hover:text-brand-600 text-sm font-semibold flex items-center gap-1 transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory">
            {dealProducts.map((product) => (
              <div key={product._id} className="w-[200px] sm:w-[220px] shrink-0 snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. FEATURED PRODUCTS
          ═══════════════════════════════════════════ */}
      <section className="bg-white dark:bg-navy-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-5">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/shop" className="text-brand-500 hover:text-brand-600 text-sm font-semibold flex items-center gap-1 transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. TRENDING NOW
          ═══════════════════════════════════════════ */}
      <section className="bg-white dark:bg-navy-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <h2 className="section-title">Trending Now</h2>
              <span className="text-lg">🔥</span>
            </div>
            <Link to="/shop" className="text-brand-500 hover:text-brand-600 text-sm font-semibold flex items-center gap-1 transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {trendingProducts.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. BESTSELLERS
          ═══════════════════════════════════════════ */}
      <section className="bg-gray-50 dark:bg-navy-900/50 py-8 border-t border-gray-100 dark:border-navy-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <h2 className="section-title">Bestsellers</h2>
              <Star size={18} className="text-amber-400 fill-amber-400" />
            </div>
            <Link to="/shop" className="text-brand-500 hover:text-brand-600 text-sm font-semibold flex items-center gap-1 transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
          >
            {bestSellers.map((product) => (
              <motion.div key={product._id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          11. NEWSLETTER
          ═══════════════════════════════════════════ */}
      <section className="bg-navy-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-display">
                Join the NovaCart Family
              </h2>
              <p className="text-gray-400 mb-6 text-sm">
                Subscribe and get <span className="text-brand-400 font-semibold">15% off</span> your first purchase. Plus exclusive deals, new arrivals, and member-only offers.
              </p>
              <form className="flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg bg-navy-800 border border-navy-700 text-white text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="nova-btn-primary px-6 py-3 text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-lg font-bold text-white mb-2 font-display">Download the NovaCart App</h3>
              <p className="text-gray-400 text-sm mb-4">Get exclusive app-only deals & faster checkout</p>
              <div className="flex gap-3 justify-center md:justify-end">
                <div className="px-5 py-2.5 bg-navy-800 border border-navy-700 rounded-lg text-white text-xs font-medium hover:bg-navy-700 transition-colors cursor-pointer">
                  <p className="text-[9px] text-gray-400 mb-0.5">Download on the</p>
                  <p className="text-sm font-semibold">App Store</p>
                </div>
                <div className="px-5 py-2.5 bg-navy-800 border border-navy-700 rounded-lg text-white text-xs font-medium hover:bg-navy-700 transition-colors cursor-pointer">
                  <p className="text-[9px] text-gray-400 mb-0.5">Get it on</p>
                  <p className="text-sm font-semibold">Google Play</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
