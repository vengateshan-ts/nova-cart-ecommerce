import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Shield, Truck, RotateCcw, ShoppingCart, Heart, ChevronRight, Minus, Plus, Zap, Tag, CreditCard, MapPin, Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { fetchProductById, fetchProducts, clearProduct } from '../redux/slices/productSlice';
import toast from 'react-hot-toast';
import { offers } from '../utils/dummyData';
import ProductCard from '../components/product/ProductCard';
import type { RootState, AppDispatch } from '../redux/store';

const formatPrice = (price: number): string => price.toLocaleString('en-IN');

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { product, products, isLoading } = useSelector((state: RootState) => state.products);

  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<'highlights' | 'reviews'>('highlights');

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
      if (products.length === 0) {
        dispatch(fetchProducts());
      }
    }
    return () => {
      dispatch(clearProduct());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
    }
  }, [product]);

  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-navy-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 font-semibold animate-pulse">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && (p._id || p.id) !== (product._id || product.id))
    .slice(0, 4);

  const discount = product.discount 
    ? (typeof product.discount === 'string' ? parseInt(product.discount) : product.discount)
    : (product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    toast.success(`${quantity} item(s) added to cart!`, {
      icon: '🛒',
      style: { borderRadius: '8px', background: '#1A1A2E', color: '#fff', fontSize: '13px' },
    });
  };

  const handleCheckPincode = () => {
    if (pincode.length === 6) {
      setPincodeChecked(true);
    }
  };

  const productReviews = product.numReviews || product.reviews || 0;

  return (
    <div className="bg-gray-50 dark:bg-surface-dark min-h-screen">
      <div className="bg-white dark:bg-navy-900 border-b border-gray-100 dark:border-navy-800 py-3">
        <div className="container mx-auto px-4 flex items-center text-xs text-gray-500 dark:text-gray-400 overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-brand-500 transition-colors whitespace-nowrap">Home</Link>
          <ChevronRight size={12} className="mx-1.5 shrink-0" />
          <Link to="/shop" className="hover:text-brand-500 transition-colors whitespace-nowrap">Shop</Link>
          <ChevronRight size={12} className="mx-1.5 shrink-0" />
          <Link to={`/shop?category=${product.category}`} className="hover:text-brand-500 transition-colors whitespace-nowrap">{product.category}</Link>
          <ChevronRight size={12} className="mx-1.5 shrink-0" />
          <span className="text-gray-900 dark:text-white font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-5">
        <div className="bg-white dark:bg-navy-900 rounded-xl border border-gray-200 dark:border-navy-800 p-4 md:p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-[45%] flex flex-col-reverse md:flex-row gap-3">
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
                {product.images && product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMainImage(img)}
                    className={`w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                      mainImage === img
                        ? 'border-brand-500 shadow-md shadow-brand-500/20'
                        : 'border-gray-200 dark:border-navy-700 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="flex-grow rounded-xl overflow-hidden bg-gray-100 dark:bg-navy-800 aspect-square relative group cursor-crosshair">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={mainImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    src={mainImage || product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-125"
                  />
                </AnimatePresence>
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {discount > 0 && (
                    <span className="nova-badge bg-red-500 text-white shadow-sm">{discount}% OFF</span>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[55%] flex flex-col">
              <Link to={`/shop?brand=${product.brand}`} className="text-xs font-bold text-brand-500 uppercase tracking-wider hover:underline mb-1">
                {product.brand}
              </Link>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-snug font-display">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                  {product.rating} <Star size={10} className="fill-current" />
                </span>
                <span className="text-xs text-gray-500">{formatPrice(productReviews)} Ratings & Reviews</span>
              </div>

              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-gray-100 dark:border-navy-700">
                <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  ₹{formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-gray-400 line-through">
                      ₹{formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-sm font-bold text-green-600">
                      {discount}% off
                    </span>
                  </>
                )}
              </div>

              <div className="mb-4 pb-4 border-b border-gray-100 dark:border-navy-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2.5">Available Offers</h3>
                <div className="space-y-2">
                  {offers.slice(0, 3).map(offer => (
                    <div key={offer.id} className="flex items-start gap-2">
                      <Tag size={13} className="text-green-600 mt-0.5 shrink-0" />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-gray-900 dark:text-white">{offer.text.split(':')[0]}:</span>
                        {offer.text.split(':').slice(1).join(':')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4 pb-4 border-b border-gray-100 dark:border-navy-700">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-brand-500" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">Delivery</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) => { setPincode(e.target.value.replace(/\D/g, '').slice(0, 6)); setPincodeChecked(false); }}
                    className="w-32 px-3 py-2 border border-gray-200 dark:border-navy-700 rounded-lg text-xs bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white"
                    maxLength={6}
                  />
                  <button onClick={handleCheckPincode} className="text-xs font-semibold text-brand-500 hover:text-brand-600">Check</button>
                </div>
                {pincodeChecked && (
                  <div className="flex items-center gap-2 text-xs text-green-600">
                    <Truck size={13} />
                    <span><span className="font-semibold">FREE Delivery</span> by {product.deliveryDate || 'In 3 Days'}</span>
                  </div>
                )}
                {!pincodeChecked && product.deliveryDate && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Truck size={13} className="text-brand-500" />
                    <span>Usually delivered <span className="font-medium text-gray-800 dark:text-gray-200">{product.deliveryDate}</span></span>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="flex items-center border border-gray-200 dark:border-navy-700 rounded-lg w-28 bg-gray-50 dark:bg-navy-800 shrink-0">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"><Minus size={15} /></button>
                  <span className="flex-1 text-center font-bold text-sm text-gray-900 dark:text-white">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"><Plus size={15} /></button>
                </div>
                <button onClick={handleAddToCart} className="flex-1 nova-btn-primary py-3 text-sm"><ShoppingCart size={17} /> Add to Cart</button>
                <button onClick={handleAddToCart} className="flex-1 nova-btn-navy py-3 text-sm"><Zap size={17} /> Buy Now</button>
                <button onClick={() => setIsWishlisted(!isWishlisted)} className={`p-3 border rounded-lg transition-colors shrink-0 ${isWishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 dark:border-navy-700 text-gray-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50'}`}><Heart size={20} className={isWishlisted ? 'fill-current' : ''} /></button>
              </div>

              {(product.countInStock || product.stock || 0) <= 10 && (
                <p className="text-xs font-semibold text-red-500 mb-3">⚠ Hurry! Only {product.countInStock || product.stock} left in stock</p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100 dark:border-navy-700">
                {[
                  { icon: Truck, label: 'Free Delivery' },
                  { icon: RotateCcw, label: '7 Day Return' },
                  { icon: Shield, label: 'Warranty' },
                  { icon: CreditCard, label: 'Secure Pay' },
                ].map((f, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 text-center py-2">
                    <f.icon size={18} className="text-brand-500" />
                    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-navy-900 rounded-xl border border-gray-200 dark:border-navy-800 mt-5 overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-navy-800">
            {[{ key: 'highlights' as const, label: 'Product Highlights' }, { key: 'reviews' as const, label: `Ratings & Reviews (${productReviews})` }].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex-1 py-3.5 text-sm font-semibold text-center transition-colors ${activeTab === tab.key ? 'text-brand-500 border-b-2 border-brand-500 bg-brand-50/50 dark:bg-brand-900/10' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}>{tab.label}</button>
            ))}
          </div>
          <div className="p-5 md:p-6">
            {activeTab === 'highlights' && (
              <div>
                {product.highlights && product.highlights.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-400"><Check size={14} className="text-green-500 shrink-0" />{h}</li>
                    ))}
                  </ul>
                ) : ( <p className="text-sm text-gray-500">No highlights available for this product.</p> )}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex flex-col sm:flex-row gap-8 mb-6 pb-6 border-b border-gray-100 dark:border-navy-700">
                  <div className="text-center sm:text-left">
                    <div className="text-4xl font-bold text-gray-900 dark:text-white">{product.rating}</div>
                    <div className="flex items-center gap-0.5 mt-1 justify-center sm:justify-start">
                      {[1, 2, 3, 4, 5].map(s => ( <Star key={s} size={14} className={s <= Math.round(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} /> ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{formatPrice(productReviews)} reviews</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">Reviews functionality coming soon!</p>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-5">
            <h2 className="section-title mb-4">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {relatedProducts.map(prod => ( <ProductCard key={prod._id || prod.id} product={prod} /> ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
