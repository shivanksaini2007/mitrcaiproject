export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  featured?: boolean;
  trending?: boolean;
};

export const categories = ["All", "Electronics", "Fashion", "Accessories", "Home"];

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and rich, balanced sound. Perfect for immersive listening on the go.",
    featured: true,
    trending: true,
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    price: 189.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80",
    description: "Elegant timepiece with genuine Italian leather strap and sapphire crystal glass. A timeless accessory for every occasion.",
    featured: true,
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 45.00,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    description: "Sustainably made from 100% organic cotton. Relaxed fit with a soft hand feel that gets better with every wash.",
    trending: true,
  },
  {
    id: 4,
    name: "Smart Home Speaker",
    price: 129.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&q=80",
    description: "Voice-controlled smart speaker with room-filling 360° sound. Control your smart home, play music, and get answers hands-free.",
    featured: true,
  },
  {
    id: 5,
    name: "Canvas Tote Bag",
    price: 38.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    description: "Durable waxed canvas tote with leather handles. Spacious interior with a zippered pocket. Built to carry everything you need.",
  },
  {
    id: 6,
    name: "Ceramic Pour-Over Set",
    price: 64.00,
    category: "Home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    description: "Handcrafted ceramic dripper and carafe set for the perfect morning ritual. Makes 2-4 cups of clean, flavourful coffee.",
    featured: true,
    trending: true,
  },
  {
    id: 7,
    name: "Linen Blend Blazer",
    price: 165.00,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    description: "Lightweight linen-cotton blazer with a relaxed, unstructured silhouette. Effortlessly polished for warm-weather dressing.",
  },
  {
    id: 8,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    description: "Waterproof portable speaker with 12-hour battery and surprisingly powerful bass. Take the party anywhere.",
    trending: true,
  },
  {
    id: 9,
    name: "Scented Soy Candle",
    price: 32.00,
    category: "Home",
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600&q=80",
    description: "Hand-poured soy wax candle with notes of cedar, vanilla, and amber. Burns cleanly for up to 50 hours.",
  },
  {
    id: 10,
    name: "Polarized Sunglasses",
    price: 120.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    description: "Classic acetate frames with polarized UV400 lenses. Lightweight, comfortable, and endlessly stylish.",
    trending: true,
  },
];
