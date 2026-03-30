import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card mt-20">
    <div className="container py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <h4 className="font-display text-lg font-semibold mb-3">Maison</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Curated essentials for a considered life. Quality over quantity.
        </p>
      </div>
      <div>
        <h5 className="font-body text-sm font-semibold mb-3 text-foreground">Shop</h5>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/products" className="hover:text-primary transition-colors">All Products</Link></li>
          <li><Link to="/products?cat=Electronics" className="hover:text-primary transition-colors">Electronics</Link></li>
          <li><Link to="/products?cat=Fashion" className="hover:text-primary transition-colors">Fashion</Link></li>
          <li><Link to="/products?cat=Accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
        </ul>
      </div>
      <div>
        <h5 className="font-body text-sm font-semibold mb-3 text-foreground">Company</h5>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><span className="hover:text-primary transition-colors cursor-pointer">About Us</span></li>
          <li><span className="hover:text-primary transition-colors cursor-pointer">Sustainability</span></li>
          <li><span className="hover:text-primary transition-colors cursor-pointer">Careers</span></li>
        </ul>
      </div>
      <div>
        <h5 className="font-body text-sm font-semibold mb-3 text-foreground">Contact</h5>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>hello@maison.store</li>
          <li>+1 (555) 123-4567</li>
          <li>New York, NY</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border">
      <div className="container py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Maison. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
