import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-gray-400">
      {/* Main Footer */}
      <div className="container mx-auto px-4 pt-10 pb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                N
              </div>
              <span className="text-lg font-bold tracking-tight text-white font-display">
                Nova<span className="text-brand-500">Cart</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed mb-4 text-gray-500">
              India's premium marketplace for tech, lifestyle and home essentials. Quality products, trusted brands.
            </p>
            {/* Social */}
            <div className="flex items-center gap-2">
              {[
                { label: 'FB', color: 'hover:bg-blue-600' },
                { label: 'TW', color: 'hover:bg-sky-500' },
                { label: 'IG', color: 'hover:bg-pink-600' },
                { label: 'YT', color: 'hover:bg-red-600' },
              ].map(s => (
                <a
                  key={s.label}
                  href="#"
                  className={`w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-[10px] font-bold text-gray-400 hover:text-white ${s.color} transition-all`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Shop</h3>
            <ul className="space-y-2">
              {['All Products', 'Electronics', 'Footwear', 'Accessories', 'Home Appliances', 'Furniture'].map(link => (
                <li key={link}>
                  <Link to="/shop" className="text-xs hover:text-brand-400 transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">My Account</h3>
            <ul className="space-y-2">
              {['My Profile', 'My Orders', 'My Wishlist', 'My Cart', 'Track Order', 'Returns'].map(link => (
                <li key={link}>
                  <Link to="#" className="text-xs hover:text-brand-400 transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Policies</h3>
            <ul className="space-y-2">
              {['Privacy Policy', 'Terms of Use', 'Shipping Policy', 'Cancellation', 'Return Policy', 'Grievance'].map(link => (
                <li key={link}>
                  <Link to="#" className="text-xs hover:text-brand-400 transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-brand-500 shrink-0 mt-0.5" />
                <span className="text-xs">123 Innovation Drive, Tech Valley, Chennai 600001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-brand-500 shrink-0" />
                <span className="text-xs">1800-123-4567 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-brand-500 shrink-0" />
                <span className="text-xs">support@novacart.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-navy-800 pt-5 pb-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">We Accept:</span>
              {['VISA', 'Mastercard', 'UPI', 'RuPay', 'PayPal', 'Net Banking'].map(method => (
                <span key={method} className="px-2.5 py-1 bg-navy-800 rounded text-[10px] font-medium text-gray-400 border border-navy-700">
                  {method}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-navy-800 rounded-lg border border-navy-700 text-[10px] text-gray-400 cursor-pointer hover:border-navy-600 transition-colors">
                <span className="block text-[8px] text-gray-500">Download on</span>
                <span className="font-semibold text-gray-300">App Store</span>
              </div>
              <div className="px-3 py-1.5 bg-navy-800 rounded-lg border border-navy-700 text-[10px] text-gray-400 cursor-pointer hover:border-navy-600 transition-colors">
                <span className="block text-[8px] text-gray-500">Get it on</span>
                <span className="font-semibold text-gray-300">Google Play</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-navy-800 pt-4 mt-2 text-center">
          <p className="text-[11px] text-gray-600">
            © {new Date().getFullYear()} NovaCart. All rights reserved. Made with ❤️ in India.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
