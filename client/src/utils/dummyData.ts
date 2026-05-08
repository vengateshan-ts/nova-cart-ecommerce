import type { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description: 'Industry-leading noise cancellation with Auto NC Optimizer. Crystal-clear hands-free calling with 4 beamforming microphones. Up to 30 hours of battery life with quick charging.',
    price: 24990,
    originalPrice: 34990,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Electronics',
    rating: 4.8,
    reviews: 1245,
    isTrending: true,
    isBestSeller: true,
    brand: 'Sony',
    stock: 50,
    discount: 29,
    deliveryDate: 'Tomorrow',
    highlights: ['Active Noise Cancellation', '30hr Battery', 'Multipoint Connection', 'Speak-to-Chat']
  },
  {
    id: '2',
    name: 'Apple MacBook Pro 16" M3 Max — Space Black',
    description: 'The most powerful MacBook Pro ever. M3 Max chip delivers extreme performance for pro workflows. 40-core GPU, up to 128GB unified memory.',
    price: 249900,
    originalPrice: 279900,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Computers',
    rating: 4.9,
    reviews: 432,
    isNew: true,
    brand: 'Apple',
    stock: 15,
    discount: 11,
    deliveryDate: 'In 2 Days',
    highlights: ['M3 Max Chip', '16" Liquid Retina XDR', '36GB Unified Memory', '22hr Battery']
  },
  {
    id: '3',
    name: 'Nike Air Max 270 — Triple Black',
    description: 'Nike\'s first lifestyle Air Max brings you style, comfort and big attitude in the sleekest package yet. The large Air unit delivers plush cushioning.',
    price: 12995,
    originalPrice: 15995,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Footwear',
    rating: 4.6,
    reviews: 890,
    isTrending: true,
    brand: 'Nike',
    stock: 120,
    discount: 19,
    deliveryDate: 'Tomorrow',
    highlights: ['270° Air Unit', 'Breathable Mesh', 'Foam Midsole', 'Rubber Outsole']
  },
  {
    id: '4',
    name: 'Herman Miller Aeron Chair — Graphite',
    description: 'The gold standard in ergonomic seating. PostureFit SL provides adjustable sacral and lumbar support for the full range of seated postures.',
    price: 89995,
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Furniture',
    rating: 4.9,
    reviews: 312,
    brand: 'Herman Miller',
    stock: 8,
    deliveryDate: 'In 5 Days',
    highlights: ['PostureFit SL', '8Z Pellicle', '12-Year Warranty', 'Tilt Limiter']
  },
  {
    id: '5',
    name: 'Dyson V15 Detect Absolute Cordless Vacuum',
    description: 'The most powerful, intelligent cordless vacuum. Laser reveals invisible dust. Piezo sensor measures and counts microscopic particles.',
    price: 52990,
    originalPrice: 62990,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Home Appliances',
    rating: 4.7,
    reviews: 567,
    brand: 'Dyson',
    stock: 40,
    discount: 16,
    deliveryDate: 'In 3 Days',
    highlights: ['Laser Dust Detection', '60min Runtime', 'LCD Screen', 'HEPA Filtration']
  },
  {
    id: '6',
    name: 'Rolex Submariner Date — Oystersteel',
    description: 'The reference among divers\' watches. Waterproof to 300 metres. Cerachrom bezel insert in black ceramic.',
    price: 1025000,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Accessories',
    rating: 5.0,
    reviews: 89,
    isNew: true,
    brand: 'Rolex',
    stock: 3,
    deliveryDate: 'In 7 Days',
    highlights: ['300m Water Resistant', 'Cerachrom Bezel', 'Oystersteel', 'Chronometer Certified']
  },
  {
    id: '7',
    name: 'Samsung Galaxy S24 Ultra 5G — Titanium Black',
    description: 'Built with titanium for our toughest Galaxy design. Circle to Search with Google. Chat Assist to communicate effortlessly.',
    price: 129999,
    originalPrice: 144999,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Electronics',
    rating: 4.7,
    reviews: 2341,
    isTrending: true,
    isHot: true,
    brand: 'Samsung',
    stock: 75,
    discount: 10,
    deliveryDate: 'Tomorrow',
    highlights: ['200MP Camera', 'Snapdragon 8 Gen 3', '6.8" QHD+ Display', 'S Pen Built-in']
  },
  {
    id: '8',
    name: 'boAt Rockerz 450 Bluetooth Headphones',
    description: 'Immersive 40mm audio drivers. 15 hours of playtime. Padded ear cushions for all-day comfort.',
    price: 1499,
    originalPrice: 3990,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Electronics',
    rating: 4.1,
    reviews: 45230,
    isBestSeller: true,
    brand: 'boAt',
    stock: 500,
    discount: 62,
    deliveryDate: 'Tomorrow',
    highlights: ['40mm Drivers', '15hr Battery', 'Soft Padded Cushions', 'Dual Connectivity']
  },
  {
    id: '9',
    name: 'Levi\'s 511 Slim Fit Men\'s Jeans — Dark Indigo',
    description: 'Slim from hip to ankle. Classic 5-pocket styling with modern stretch denim for all-day comfort.',
    price: 2799,
    originalPrice: 4599,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Fashion',
    rating: 4.3,
    reviews: 8900,
    brand: "Levi's",
    stock: 200,
    discount: 39,
    deliveryDate: 'In 2 Days',
    highlights: ['Stretch Denim', 'Slim Fit', 'Classic 5-Pocket', 'Machine Washable']
  },
  {
    id: '10',
    name: 'Kindle Paperwhite (16 GB) — Agave Green',
    description: '6.8" display with adjustable warm light. Up to 10 weeks of battery life. IPX8 water resistant.',
    price: 14999,
    originalPrice: 16999,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Electronics',
    rating: 4.6,
    reviews: 3421,
    brand: 'Amazon',
    stock: 90,
    discount: 12,
    deliveryDate: 'Tomorrow',
    highlights: ['6.8" Glare-Free Display', 'Adjustable Warm Light', 'IPX8 Waterproof', '16GB Storage']
  },
  {
    id: '11',
    name: 'IKEA MALM Bed Frame with Storage — White',
    description: '4 large drawers give you extra storage space under the bed. Adjustable bed sides for various mattress thicknesses.',
    price: 24990,
    originalPrice: 29990,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Furniture',
    rating: 4.2,
    reviews: 1567,
    brand: 'IKEA',
    stock: 30,
    discount: 17,
    deliveryDate: 'In 5 Days',
    highlights: ['4 Storage Drawers', 'Adjustable Sides', 'Particle Board', 'Easy Assembly']
  },
  {
    id: '12',
    name: 'JBL Charge 5 Portable Bluetooth Speaker',
    description: 'Bold JBL Original Pro Sound. IP67 dustproof and waterproof. Built-in powerbank. 20 hours of playtime.',
    price: 12999,
    originalPrice: 17999,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Electronics',
    rating: 4.5,
    reviews: 6789,
    isTrending: true,
    brand: 'JBL',
    stock: 65,
    discount: 28,
    deliveryDate: 'Tomorrow',
    highlights: ['JBL Pro Sound', 'IP67 Rating', '20hr Battery', 'PartyBoost']
  },
  {
    id: '13',
    name: 'Adidas Ultraboost Light Running Shoes',
    description: 'Our lightest Ultraboost ever. BOOST midsole delivers incredible energy return. Continental™ rubber outsole.',
    price: 14999,
    originalPrice: 19999,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Footwear',
    rating: 4.5,
    reviews: 3456,
    isNew: true,
    brand: 'Adidas',
    stock: 85,
    discount: 25,
    deliveryDate: 'In 2 Days',
    highlights: ['BOOST Midsole', 'Primeknit Upper', 'Continental Outsole', 'Lightweight']
  },
  {
    id: '14',
    name: 'Philips Air Fryer XXL Premium — HD9867',
    description: 'Fat Removal technology reduces and captures fat. XXL capacity fits a whole chicken. Smart Sensing technology adjusts time and temperature.',
    price: 19999,
    originalPrice: 28999,
    image: 'https://images.unsplash.com/photo-1648137872578-519b5bda1e86?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1648137872578-519b5bda1e86?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Home Appliances',
    rating: 4.4,
    reviews: 2100,
    isHot: true,
    brand: 'Philips',
    stock: 22,
    discount: 31,
    deliveryDate: 'In 3 Days',
    highlights: ['XXL Capacity', 'Smart Sensing', 'Fat Removal Tech', 'Dishwasher Safe']
  },
  {
    id: '15',
    name: 'Ray-Ban Aviator Classic — Gold/Green',
    description: 'Originally designed for U.S. aviators in 1937. The iconic shape combined with the G-15 lens makes it the most recognizable eyewear worldwide.',
    price: 15490,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Accessories',
    rating: 4.7,
    reviews: 5670,
    isBestSeller: true,
    brand: 'Ray-Ban',
    stock: 140,
    deliveryDate: 'Tomorrow',
    highlights: ['G-15 Lens', 'Gold Metal Frame', 'UV Protection', 'Italian Made']
  },
  {
    id: '16',
    name: 'Apple AirPods Pro (2nd Gen) with USB-C',
    description: 'Adaptive Audio. Personalized Spatial Audio with dynamic head tracking. Up to 2x more Active Noise Cancellation than the previous generation.',
    price: 24900,
    originalPrice: 26900,
    image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Electronics',
    rating: 4.8,
    reviews: 9870,
    isBestSeller: true,
    isHot: true,
    brand: 'Apple',
    stock: 200,
    discount: 7,
    deliveryDate: 'Tomorrow',
    highlights: ['Adaptive Audio', '2x ANC', 'USB-C MagSafe Case', '6hr Battery']
  }
];

export const categories = [
  { name: 'Electronics', icon: '📱', count: 7 },
  { name: 'Computers', icon: '💻', count: 1 },
  { name: 'Footwear', icon: '👟', count: 2 },
  { name: 'Furniture', icon: '🛋️', count: 2 },
  { name: 'Home Appliances', icon: '🏠', count: 2 },
  { name: 'Accessories', icon: '⌚', count: 2 },
  { name: 'Fashion', icon: '👕', count: 1 },
];

export const categoryNames = categories.map(c => c.name);

export const brands = [
  'Sony', 'Apple', 'Nike', 'Samsung', 'boAt', 'JBL',
  'Dyson', 'Rolex', 'Adidas', 'Philips', 'Ray-Ban',
  "Levi's", 'IKEA', 'Herman Miller', 'Amazon'
];

export const heroBanners = [
  {
    id: 1,
    title: 'Summer Electronics Sale',
    subtitle: 'Up to 60% off on Headphones, Speakers & More',
    cta: 'Shop Now',
    link: '/shop?category=Electronics',
    bg: 'from-brand-500 to-brand-700',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 2,
    title: 'New Arrivals in Footwear',
    subtitle: 'Nike, Adidas & More — Starting ₹2,999',
    cta: 'Explore Collection',
    link: '/shop?category=Footwear',
    bg: 'from-navy-800 to-navy-900',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 3,
    title: 'Premium Tech Essentials',
    subtitle: 'MacBook, Galaxy & AirPods — Bank Offers Available',
    cta: 'View Deals',
    link: '/shop?category=Computers',
    bg: 'from-gray-800 to-gray-900',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1200',
  },
];

export const offers = [
  { id: 1, text: 'Bank Offer: 5% Unlimited Cashback on Nova Axis Card', type: 'bank' },
  { id: 2, text: 'No Cost EMI starting ₹2,083/month', type: 'emi' },
  { id: 3, text: 'Exchange Offer: Up to ₹15,000 off', type: 'exchange' },
  { id: 4, text: 'Special Price: Extra ₹1,000 off (auto-applied)', type: 'special' },
];
