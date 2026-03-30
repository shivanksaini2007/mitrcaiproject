import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/50 mt-20">
    <div className="container py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
      <div>
        <Link to="/" className="font-display text-2xl italic text-foreground">Maison</Link>
        <p className="text-sm text-muted-foreground leading-relaxed mt-3 font-light">
          Curated essentials for a considered life. Quality over quantity, always.
        </p>
      </div>
      <div>
        <h5 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-foreground mb-4">Shop</h5>
        <ul className="space-y-2.5 text-sm text-muted-foreground font-light">
          <li><Link to="/products" className="hover:text-primary transition-colors duration-300">All Products</Link></li>
          <li><Link to="/products?cat=Electronics" className="hover:text-primary transition-colors duration-300">Electronics</Link></li>
          <li><Link to="/products?cat=Fashion" className="hover:text-primary transition-colors duration-300">Fashion</Link></li>
          <li><Link to="/products?cat=Accessories" className="hover:text-primary transition-colors duration-300">Accessories</Link></li>
        </ul>
      </div>
      <div>
        <h5 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-foreground mb-4">Company</h5>
        <ul className="space-y-2.5 text-sm text-muted-foreground font-light">
          <li><span className="hover:text-primary transition-colors duration-300 cursor-pointer">About Us</span></li>
          <li><span className="hover:text-primary transition-colors duration-300 cursor-pointer">Sustainability</span></li>
          <li><span className="hover:text-primary transition-colors duration-300 cursor-pointer">Careers</span></li>
        </ul>
      </div>
      <div>
        <h5 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-foreground mb-4">Contact</h5>
        <ul className="space-y-2.5 text-sm text-muted-foreground font-light">
          <li>hello@maison.store</li>
          <li>+1 (555) 123-4567</li>
          <li>New York, NY</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border/30">
      <div className="container py-5 text-center text-[11px] text-muted-foreground tracking-wide">
        © {new Date().getFullYear()} Maison. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
