import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const Footer = () => (
  <footer className="bg-foreground text-background mt-16">
    <div className="container py-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
      <div className="col-span-2 sm:col-span-1">
        <Link to="/" className="font-display text-2xl italic">Maison</Link>
        <p className="text-background/50 text-xs leading-relaxed mt-3">
          Your one-stop shop for quality products at incredible prices.
        </p>
      </div>
      <div>
        <h5 className="text-xs uppercase tracking-widest font-semibold mb-3">Shop</h5>
        <ul className="space-y-2 text-xs text-background/50">
          <li><Link to="/products" className="hover:text-background transition-colors">All Products</Link></li>
          {categories.filter(c => c !== "All").map(c => (
            <li key={c}><Link to={`/products?cat=${c}`} className="hover:text-background transition-colors">{c}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <h5 className="text-xs uppercase tracking-widest font-semibold mb-3">Company</h5>
        <ul className="space-y-2 text-xs text-background/50">
          <li><span className="hover:text-background transition-colors cursor-pointer">About Us</span></li>
          <li><span className="hover:text-background transition-colors cursor-pointer">Careers</span></li>
          <li><span className="hover:text-background transition-colors cursor-pointer">Press</span></li>
        </ul>
      </div>
      <div>
        <h5 className="text-xs uppercase tracking-widest font-semibold mb-3">Help</h5>
        <ul className="space-y-2 text-xs text-background/50">
          <li><span className="hover:text-background transition-colors cursor-pointer">Shipping Info</span></li>
          <li><span className="hover:text-background transition-colors cursor-pointer">Returns</span></li>
          <li><span className="hover:text-background transition-colors cursor-pointer">Contact Us</span></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-background/10">
      <div className="container py-4 text-center text-[10px] text-background/30 tracking-wide">
        © {new Date().getFullYear()} Maison. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
