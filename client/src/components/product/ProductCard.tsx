import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Truck, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

const formatPrice = (price: number): string => {
  return price.toLocaleString('en-IN');
};

const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgHover, setImgHover] = useState(false);

  // MongoDB uses _id, but we'll normalize it here for the UI links
  const productId = product._id || product.id;
  const productReviews = product.numReviews || product.reviews || 0;

  const discount = product.discount 
    ? (typeof product.discount === 'string' ? parseInt(product.discount) : product.discount)
    : (product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`Added to cart!`, {
      icon: '🛒',
      style: { borderRadius: '8px', background: '#1A1A2E', color: '#fff', fontSize: '13px' },
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      icon: isWishlisted ? '💔' : '❤️',
      style: { borderRadius: '8px', background: '#1A1A2E', color: '#fff', fontSize: '13px' },
    });
  };

  // ─── LIST VIEW ──────────────────────────────────────
  if (layout === 'list') {
    return (
      <Link to={`/product/${productId}`} className="block">
        <div className="nova-card flex gap-4 p-4 hover:shadow-card-hover group">
          <div className="relative w-44 h-44 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-navy-800">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
            {discount > 0 && (
              <span className="absolute top-2 left-2 nova-badge bg-red-500 text-white">{discount}% OFF</span>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <p className="text-xs text-gray-400 font-medium mb-0.5">{product.brand}</p>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1.5 group-hover:text-brand-600 transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center gap-1 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {product.rating} <Star size={9} className="fill-current" />
                </span>
                <span className="text-xs text-gray-400">({formatPrice(productReviews)} reviews)</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">₹{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-sm text-gray-400 line-through">₹{formatPrice(product.originalPrice)}</span>
                    <span className="text-xs font-semibold text-green-600">{discount}% off</span>
                  </>
                )}
              </div>
              <button onClick={handleAddToCart} className="nova-btn-primary px-4 py-2 text-xs">
                <ShoppingCart size={14} /> Add
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // ─── GRID VIEW (Default) ──────────────────────────────
  return (
    <Link to={`/product/${productId}`} className="block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="nova-card group h-full flex flex-col"
      >
        <div
          className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-navy-800"
          onMouseEnter={() => setImgHover(true)}
          onMouseLeave={() => setImgHover(false)}
        >
          <img
            src={imgHover && product.images && product.images.length > 1 ? product.images[1] : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
            {discount > 0 && (
              <span className="nova-badge bg-red-500 text-white shadow-sm">
                {discount}% OFF
              </span>
            )}
            {product.isNew && (
              <span className="nova-badge bg-blue-500 text-white shadow-sm">NEW</span>
            )}
            {product.isBestSeller && (
              <span className="nova-badge bg-amber-500 text-white shadow-sm">BESTSELLER</span>
            )}
            {product.isHot && (
              <span className="nova-badge bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm">🔥 HOT</span>
            )}
          </div>

          <button
            onClick={handleWishlist}
            className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-sm ${
              isWishlisted
                ? 'bg-red-50 text-red-500'
                : 'bg-white/90 dark:bg-navy-800/90 text-gray-500 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart size={15} className={isWishlisted ? 'fill-current' : ''} />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
            <div className="flex gap-1.5">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold rounded-lg shadow-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShoppingCart size={13} /> Add to Cart
              </button>
              <Link
                to={`/product/${productId}`}
                onClick={(e) => e.stopPropagation()}
                className="py-2 px-3 bg-white/90 dark:bg-navy-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
              >
                <Eye size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="p-3.5 flex flex-col flex-1">
          <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
            {product.brand}
          </p>

          <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1.5 leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5 mb-2">
            <span className="flex items-center gap-0.5 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              {product.rating} <Star size={8} className="fill-current" />
            </span>
            <span className="text-[11px] text-gray-400">({formatPrice(productReviews)})</span>
          </div>

          <div className="flex items-baseline gap-2 mb-1.5 mt-auto">
            <span className="text-base font-bold text-gray-900 dark:text-white">
              ₹{formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₹{formatPrice(product.originalPrice)}
              </span>
            )}
            {discount > 0 && (
              <span className="text-xs font-semibold text-green-600">
                {discount}% off
              </span>
            )}
          </div>

          {product.deliveryDate && (
            <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 mb-1">
              <Truck size={11} className="text-brand-500" />
              <span>
                {product.deliveryDate === 'Tomorrow' ? (
                  <span className="text-green-600 font-medium">FREE delivery Tomorrow</span>
                ) : (
                  <>Free delivery <span className="font-medium">{product.deliveryDate}</span></>
                )}
              </span>
            </div>
          )}

          {(product.countInStock || product.stock || 0) <= 10 && (
            <p className="text-[10px] font-semibold text-red-500 mt-0.5">
              Only {product.countInStock || product.stock} left in stock!
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
