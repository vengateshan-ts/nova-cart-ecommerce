import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Shield, Truck, Tag, ChevronDown, ChevronUp, Heart, Zap } from 'lucide-react';
import type { RootState } from '../redux/store';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import ProductCard from '../components/product/ProductCard';

const formatPrice = (price: number): string => price.toLocaleString('en-IN');

const Cart = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);

  const suggestedProducts = products.length > 0 ? products.slice(0, 4) : [];

  const handleQuantity = (id: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty < 1) return;
    dispatch(updateQuantity({ id, quantity: newQty }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
    toast.success(`Removed from cart`, {
      icon: '🗑️',
      style: { borderRadius: '8px', background: '#1A1A2E', color: '#fff', fontSize: '13px' },
    });
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'NOVA15') {
      setCouponApplied(true);
      toast.success('Coupon applied! 15% off');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const savings = items.reduce((acc, item) => {
    if (item.originalPrice) {
      return acc + ((item.originalPrice - item.price) * item.quantity);
    }
    return acc;
  }, 0);
  const couponDiscount = couponApplied ? Math.round(total * 0.15) : 0;
  const finalTotal = total - couponDiscount;

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-surface-dark min-h-[70vh] flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-gray-100 dark:bg-navy-800 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag size={36} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-display">Your cart is empty</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Looks like you haven't added anything yet. Explore our collection and find something you'll love.
          </p>
          <Link to="/shop" className="nova-btn-primary px-6 py-3 text-sm">
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-surface-dark min-h-screen">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white font-display">
              Shopping Cart
              <span className="text-sm font-normal text-gray-400 ml-2">({itemCount} items)</span>
            </h1>
          </div>
          {savings > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 text-green-600 text-sm font-semibold bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-lg">
              <Tag size={14} /> You're saving ₹{formatPrice(savings + couponDiscount)}!
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[65%]">
            <div className="bg-white dark:bg-navy-900 rounded-xl border border-gray-200 dark:border-navy-800 overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-3 px-5 py-3 bg-gray-50 dark:bg-navy-800/50 border-b border-gray-100 dark:border-navy-700 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item._id || item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-4 sm:px-5 border-b border-gray-100 dark:border-navy-700 last:border-0"
                  >
                    <div className="col-span-1 sm:col-span-6 flex items-start gap-3">
                      <Link to={`/product/${item._id || item.id}`} className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-navy-800 shrink-0 border border-gray-200 dark:border-navy-700">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link to={`/product/${item._id || item.id}`} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-brand-500 line-clamp-2 transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-[11px] text-gray-400 mt-0.5">{item.brand || 'NovaCart'}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Truck size={11} className="text-green-500" />
                          <span className="text-[10px] text-green-600 font-medium">FREE delivery Tomorrow</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2 sm:hidden">
                          <button onClick={() => handleRemove(item._id || item.id || '')} className="text-[11px] text-red-500 font-medium flex items-center gap-1">
                            <Trash2 size={11} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:flex sm:col-span-2 flex-col items-center">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">₹{formatPrice(item.price)}</span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-gray-400 line-through">₹{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>

                    <div className="col-span-1 sm:col-span-2 flex sm:justify-center items-center">
                      <div className="flex items-center border border-gray-200 dark:border-navy-700 rounded-lg bg-gray-50 dark:bg-navy-800">
                        <button
                          onClick={() => handleQuantity(item._id || item.id || '', item.quantity, -1)}
                          className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-8 text-center font-semibold text-sm text-gray-900 dark:text-white">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantity(item._id || item.id || '', item.quantity, 1)}
                          className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="hidden sm:flex sm:col-span-2 flex-col items-end gap-2">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        ₹{formatPrice(item.price * item.quantity)}
                      </span>
                      <button onClick={() => handleRemove(item._id || item.id || '')} className="text-[10px] text-red-500 hover:text-red-600 font-medium">
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full lg:w-[35%]">
            <div className="bg-white dark:bg-navy-900 rounded-xl border border-gray-200 dark:border-navy-800 sticky top-36 overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-navy-700">
                <button
                  onClick={() => setShowCoupon(!showCoupon)}
                  className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 dark:text-white"
                >
                  <span className="flex items-center gap-2">
                    <Tag size={15} className="text-brand-500" />
                    Apply Coupon
                  </span>
                  {showCoupon ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                <AnimatePresence>
                  {showCoupon && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="flex gap-2 mt-3">
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="flex-1 px-3 py-2.5 border border-gray-200 dark:border-navy-700 rounded-lg text-xs bg-gray-50 dark:bg-navy-800 text-gray-900 dark:text-white uppercase tracking-wider"
                        />
                        <button onClick={handleApplyCoupon} className="px-4 py-2.5 text-xs font-semibold text-brand-500 border border-brand-500 rounded-lg hover:bg-brand-50 transition-colors">Apply</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-4">
                <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Price Details</h2>
                <div className="space-y-2.5 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between"><span>Subtotal</span><span className="text-gray-900 dark:text-white font-medium">₹{formatPrice(total)}</span></div>
                  {couponDiscount > 0 && <div className="flex justify-between text-green-600"><span>Coupon Discount</span><span className="font-medium">- ₹{formatPrice(couponDiscount)}</span></div>}
                  <div className="flex justify-between text-green-600"><span>Delivery</span><span className="font-medium">FREE</span></div>
                </div>

                <div className="border-t border-dashed border-gray-200 dark:border-navy-700 pt-3 mb-4">
                  <div className="flex justify-between items-end">
                    <span className="text-base font-bold text-gray-900 dark:text-white">Total Amount</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">₹{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                <button onClick={() => navigate('/checkout')} className="w-full nova-btn-primary py-3.5 text-sm mb-3">
                  <Zap size={16} /> Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>

        {suggestedProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="section-title mb-4">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {suggestedProducts.map(product => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
