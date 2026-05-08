import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, MapPin, CreditCard, ShoppingBag, CheckCircle2, ShieldCheck, ArrowLeft, Truck } from 'lucide-react';
import { createOrder, resetOrderState } from '../redux/slices/orderSlice';
import { clearCart } from '../redux/slices/cartSlice';
import type { RootState, AppDispatch } from '../redux/store';
import toast from 'react-hot-toast';

const formatPrice = (price: number): string => price.toLocaleString('en-IN');

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { userInfo, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { isLoading, isSuccess, error } = useSelector((state: RootState) => state.orders);

  const shippingPrice = total > 1000 ? 0 : 100;
  const totalPrice = total + shippingPrice;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    }
    if (items.length === 0 && !isSuccess) {
      navigate('/cart');
    }
  }, [isAuthenticated, items, navigate, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearCart());
      // Keep success state for a few seconds then redirect or show success UI
    }
    if (error) {
      toast.error(error);
      dispatch(resetOrderState());
    }
  }, [isSuccess, error, dispatch]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const orderData = {
      orderItems: items.map(item => ({
        name: item.name,
        qty: item.quantity,
        image: item.image,
        price: item.price,
        product: item._id || item.id,
      })),
      shippingAddress,
      paymentMethod: 'UPI / Card (Simulated)',
      itemsPrice: total,
      shippingPrice,
      totalPrice,
    };
    dispatch(createOrder(orderData));
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 font-display">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full text-center bg-white dark:bg-navy-900 p-10 rounded-2xl border border-gray-100 dark:border-navy-800 shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Order Placed!</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Thank you for shopping with NovaCart. Your order has been confirmed and is being prepared for shipment.
          </p>
          <div className="space-y-3">
            <Link to="/dashboard" className="block w-full nova-btn-primary py-3.5 text-sm">
              View Order History
            </Link>
            <Link to="/" className="block w-full text-sm font-semibold text-brand-500 hover:text-brand-600 py-2">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-surface-dark min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Step Progress */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto no-scrollbar py-2">
          {[
            { n: 1, label: 'Shipping', icon: MapPin },
            { n: 2, label: 'Payment', icon: CreditCard },
            { n: 3, label: 'Review', icon: ShoppingBag },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step >= s.n ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30' : 'bg-gray-200 dark:bg-navy-800 text-gray-500'
                }`}>
                  {step > s.n ? <CheckCircle2 size={18} /> : s.n}
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${step >= s.n ? 'text-brand-500' : 'text-gray-400'}`}>
                  {s.label}
                </span>
              </div>
              {i < 2 && (
                <div className={`w-12 sm:w-24 h-0.5 mx-2 -mt-6 transition-colors ${step > s.n ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-800'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form */}
          <div className="flex-1 space-y-6">
            
            <AnimatePresence mode="wait">
              {/* STEP 1: SHIPPING */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  className="bg-white dark:bg-navy-900 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-navy-800 shadow-sm"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 font-display">
                    <MapPin size={20} className="text-brand-500" /> Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Street Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={shippingAddress.address}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 dark:border-navy-800 bg-gray-50 dark:bg-navy-800 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                        placeholder="House No, Building, Street Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={shippingAddress.city}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 dark:border-navy-800 bg-gray-50 dark:bg-navy-800 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                        placeholder="e.g. Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={shippingAddress.postalCode}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 dark:border-navy-800 bg-gray-50 dark:bg-navy-800 text-sm focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                        placeholder="e.g. 400001"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.postalCode) {
                        return toast.error('Please fill all fields');
                      }
                      setStep(2);
                    }}
                    className="w-full nova-btn-primary py-3.5 mt-8 text-sm"
                  >
                    Continue to Payment <ChevronRight size={18} />
                  </button>
                </motion.div>
              )}

              {/* STEP 2: PAYMENT */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  className="bg-white dark:bg-navy-900 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-navy-800 shadow-sm"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 font-display">
                    <CreditCard size={20} className="text-brand-500" /> Payment Method
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 border-2 border-brand-500 bg-brand-50 dark:bg-brand-900/10 rounded-xl flex items-center gap-4">
                      <div className="w-5 h-5 rounded-full border-4 border-brand-500 bg-white" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900 dark:text-white">Secure Online Payment</p>
                        <p className="text-xs text-gray-500">Pay via UPI, Credit Card, or Debit Card (Simulated)</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 bg-white border border-gray-100 rounded text-[9px] font-bold">UPI</span>
                        <span className="px-2 py-0.5 bg-white border border-gray-100 rounded text-[9px] font-bold">VISA</span>
                      </div>
                    </div>
                    <div className="p-4 border border-gray-100 dark:border-navy-800 bg-gray-50/50 dark:bg-navy-900/50 rounded-xl flex items-center gap-4 opacity-60">
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      <p className="text-sm font-semibold text-gray-500">Cash on Delivery (Unavailable)</p>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setStep(1)} className="nova-btn-navy bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3.5 text-sm">
                      <ArrowLeft size={18} /> Back
                    </button>
                    <button onClick={() => setStep(3)} className="flex-1 nova-btn-primary py-3.5 text-sm">
                      Review Order <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: REVIEW */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                  className="bg-white dark:bg-navy-900 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-navy-800 shadow-sm"
                >
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 font-display">
                    <ShoppingBag size={20} className="text-brand-500" /> Review Your Order
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2 p-4 bg-gray-50 dark:bg-navy-800 rounded-xl">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shipping To</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{shippingAddress.address}</p>
                      <p className="text-xs text-gray-500">{shippingAddress.city}, {shippingAddress.postalCode}</p>
                    </div>
                    <div className="space-y-2 p-4 bg-gray-50 dark:bg-navy-800 rounded-xl">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payment via</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Secure UPI / Card</p>
                      <p className="text-xs text-gray-500">Transaction ID: Simulated</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Summary</p>
                    {items.map(item => (
                      <div key={item._id || item.id} className="flex gap-4 items-center">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.quantity} x ₹{formatPrice(item.price)}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">₹{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} className="nova-btn-navy bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3.5 text-sm">
                      <ArrowLeft size={18} /> Back
                    </button>
                    <button 
                      onClick={handlePlaceOrder} 
                      disabled={isLoading}
                      className="flex-1 nova-btn-primary py-3.5 text-sm"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>Place Order & Pay ₹{formatPrice(totalPrice)}</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Summary Sidebar */}
          <aside className="w-full lg:w-[320px]">
            <div className="bg-white dark:bg-navy-900 p-6 rounded-2xl border border-gray-100 dark:border-navy-800 shadow-sm sticky top-36">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-5 font-display">Order Summary</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="font-semibold text-gray-900 dark:text-white">₹{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping Fee</span>
                  <span className={`font-semibold ${shippingPrice === 0 ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                    {shippingPrice === 0 ? 'FREE' : `₹${formatPrice(shippingPrice)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Tax (GST 18%)</span>
                  <span className="font-semibold text-gray-900 dark:text-white">Included</span>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-navy-800 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Total Amount</p>
                    <p className="text-2xl font-black text-brand-500 font-display tracking-tight">₹{formatPrice(totalPrice)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck size={18} className="text-green-600 shrink-0" />
                  <p className="text-[11px] text-gray-500">Your transaction is secured with 256-bit SSL encryption.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Truck size={18} className="text-blue-500 shrink-0" />
                  <p className="text-[11px] text-gray-500">Usually delivered in 3-5 business days.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
