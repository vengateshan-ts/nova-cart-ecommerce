import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-surface-dark px-4 font-display">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-[12rem] font-black text-gray-200 dark:text-navy-800 leading-none select-none">404</h1>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative -mt-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Lost in <span className="text-brand-500">Space?</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-10 text-sm md:text-base leading-relaxed">
            The page you're looking for has drifted out of orbit. Let's get you back to the marketplace.
          </p>
          <Link 
            to="/" 
            className="nova-btn-primary px-10 py-4 text-sm"
          >
            Back to Home <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
