import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, ArrowLeft, KeyRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, clearError } from '../redux/slices/authSlice';
import type { RootState, AppDispatch } from '../redux/store';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [resetting, setResetting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigate, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      dispatch(login({ email: formData.email, password: formData.password }));
    } else if (mode === 'register') {
      if (formData.password.length < 6) {
        return toast.error('Password must be at least 6 characters');
      }
      dispatch(register(formData));
    } else {
      handleForgotPassword();
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email || !formData.password) {
      return toast.error('Please enter email and new password');
    }
    setResetting(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, {
        email: formData.email,
        newPassword: formData.password
      });
      toast.success('Password reset successful! You can now login.');
      setMode('login');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Reset failed');
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50 dark:bg-surface-dark font-display">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-200 dark:bg-brand-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-navy-200 dark:bg-navy-900/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full nova-card p-8 relative z-10 border-gray-100 dark:border-navy-800 shadow-2xl"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-brand-500/30">N</div>
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nova<span className="text-brand-500">Cart</span></span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Create an account' : 'Reset Password'}
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {mode === 'forgot' ? 'Enter your email and a new password to reset.' : mode === 'login' ? 'Enter your details to access your account.' : 'Join NovaCart for the best shopping experience.'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {mode === 'register' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
                <div className="relative">
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-navy-800 bg-gray-50 dark:bg-navy-900 text-gray-900 dark:text-white focus:border-brand-500 outline-none text-sm" placeholder="John Doe" />
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
            <div className="relative">
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-navy-800 bg-gray-50 dark:bg-navy-900 text-gray-900 dark:text-white focus:border-brand-500 outline-none text-sm" placeholder="you@example.com" />
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                {mode === 'forgot' ? 'New Password' : 'Password'}
              </label>
              {mode === 'login' && (
                <button type="button" onClick={() => setMode('forgot')} className="text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors">Forgot password?</button>
              )}
            </div>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} name="password" required value={formData.password} onChange={handleChange} className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 dark:border-navy-800 bg-gray-50 dark:bg-navy-900 text-gray-900 dark:text-white focus:border-brand-500 outline-none text-sm" placeholder="••••••••" />
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading || resetting} className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl shadow-lg text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 disabled:bg-gray-400 transition-all hover:-translate-y-0.5 mt-6">
            {isLoading || resetting ? ( <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> ) : (
              <> {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Reset Password'} <ArrowRight size={18} /> </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          {mode === 'forgot' ? (
            <button onClick={() => setMode('login')} className="flex items-center gap-2 mx-auto font-bold text-brand-500 hover:text-brand-600">
              <ArrowLeft size={16} /> Back to Sign In
            </button>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setFormData({ name: '', email: '', password: '' }); dispatch(clearError()); }} className="font-bold text-brand-500 hover:text-brand-600">
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-navy-800 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-semibold uppercase tracking-widest">
          <ShieldCheck size={14} className="text-green-500" /> Secure Encryption
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
