import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Package, User as UserIcon, MapPin, Heart, LogOut, ChevronRight, Clock, CheckCircle, Truck } from 'lucide-react';
import { logout } from '../redux/slices/authSlice';
import { fetchMyOrders } from '../redux/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../redux/store';
import toast from 'react-hot-toast';

const formatPrice = (price: number): string => price.toLocaleString('en-IN');

const Dashboard = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { orders, isLoading } = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'profile' | 'orders'>('profile');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(fetchMyOrders());
    }
  }, [userInfo, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const displayName = userInfo?.name || 'User';
  const displayEmail = userInfo?.email || '';

  return (
    <div className="bg-gray-50 dark:bg-surface-dark min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 shrink-0">
            <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-navy-800 sticky top-24">
              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-brand-500/20">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white truncate max-w-full">{displayName}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-full">{displayEmail}</p>
              </div>

              <nav className="space-y-1.5">
                {[
                  { id: 'profile', label: 'My Profile', icon: UserIcon },
                  { id: 'orders', label: 'My Orders', icon: Package, count: orders.length },
                  { id: 'addresses', label: 'Addresses', icon: MapPin },
                  { id: 'wishlist', label: 'Wishlist', icon: Heart },
                ].map((item: any) => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                      activeSection === item.id 
                        ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-navy-800'
                    }`}
                  >
                    <item.icon size={18} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSection === item.id ? 'bg-white text-brand-500' : 'bg-gray-100 dark:bg-navy-800'}`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
                
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-navy-800">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-semibold transition-all"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            {activeSection === 'profile' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-navy-900 rounded-2xl p-6 lg:p-10 shadow-sm border border-gray-100 dark:border-navy-800">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 font-display">Personal Information</h1>
                <div className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                      <div className="px-4 py-3 bg-gray-50 dark:bg-navy-800 border border-gray-100 dark:border-navy-800 rounded-xl text-gray-900 dark:text-white font-medium">
                        {displayName}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account Status</label>
                      <div className="px-4 py-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-xl text-green-600 font-bold flex items-center gap-2">
                        <CheckCircle size={14} /> Active
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                    <div className="px-4 py-3 bg-gray-50 dark:bg-navy-800 border border-gray-100 dark:border-navy-800 rounded-xl text-gray-500 font-medium">
                      {displayEmail}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === 'orders' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-display">Order History</h1>
                
                {isLoading ? (
                  <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : orders.length > 0 ? (
                  orders.map((order: any) => (
                    <div key={order._id} className="bg-white dark:bg-navy-900 rounded-2xl border border-gray-100 dark:border-navy-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="px-6 py-4 bg-gray-50 dark:bg-navy-800/50 border-b border-gray-100 dark:border-navy-800 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex gap-6">
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                            <p className="text-xs font-bold text-gray-900 dark:text-white">#{order._id.slice(-8).toUpperCase()}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Placed On</p>
                            <p className="text-xs font-semibold text-gray-900 dark:text-white">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total</p>
                            <p className="text-xs font-bold text-brand-500">₹{formatPrice(order.totalPrice)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.isDelivered ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {order.isDelivered ? 'Delivered' : 'Processing'}
                          </span>
                          <button className="p-1.5 text-gray-400 hover:text-brand-500 transition-colors">
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="flex -space-x-3 overflow-hidden">
                            {order.orderItems.map((item: any, idx: number) => (
                              <img key={idx} src={item.image} alt={item.name} className="inline-block h-12 w-12 rounded-lg ring-2 ring-white dark:ring-navy-900 object-cover" />
                            ))}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {order.orderItems[0].name} {order.orderItems.length > 1 ? `+ ${order.orderItems.length - 1} more items` : ''}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                                <Clock size={12} className="text-brand-500" />
                                <span>Status: {order.isPaid ? 'Paid' : 'Pending Payment'}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                                <Truck size={12} className="text-brand-500" />
                                <span>Ship to: {order.shippingAddress.city}</span>
                              </div>
                            </div>
                          </div>
                          <button className="nova-btn-navy px-4 py-2 text-xs">Track Order</button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-white dark:bg-navy-900 rounded-2xl border border-gray-100 dark:border-navy-800 shadow-sm">
                    <Package size={48} className="mx-auto text-gray-200 dark:text-navy-700 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No orders found</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">You haven't placed any orders yet. Start shopping to fill this up!</p>
                    <button onClick={() => navigate('/shop')} className="nova-btn-primary px-6 py-2.5 text-xs">Explore Shop</button>
                  </div>
                )}
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
