import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { syncCartWithBackend, setCart } from './redux/slices/cartSlice';
import type { RootState, AppDispatch } from './redux/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const prevUserRef = useRef(userInfo);

  // 1. Initial Cart Load from User Info (on Login)
  useEffect(() => {
    if (userInfo && userInfo.cartItems && !prevUserRef.current) {
      // User just logged in, load their database cart
      dispatch(setCart(userInfo.cartItems));
    }
    prevUserRef.current = userInfo;
  }, [userInfo, dispatch]);

  // 2. Auto-sync cart to database when it changes (if logged in)
  useEffect(() => {
    if (userInfo && cartItems.length > 0) {
      const timer = setTimeout(() => {
        dispatch(syncCartWithBackend(cartItems));
      }, 1500); // 1.5s debounce
      return () => clearTimeout(timer);
    }
  }, [cartItems, userInfo, dispatch]);

  return (
    <Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 2500,
          style: {
            borderRadius: '10px',
            background: '#1A1A2E',
            color: '#fff',
            fontSize: '13px',
            padding: '12px 16px',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
