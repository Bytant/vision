
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Eye className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-neutral-dark">EyeVision Care</span>
        </Link>
        <nav className="hidden space-x-4 md:flex">
          <Link to="/" className="text-sm font-medium text-neutral-dark hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/tests" className="text-sm font-medium text-neutral-dark hover:text-primary transition-colors">
            Vision Tests
          </Link>
          <Link to="/about" className="text-sm font-medium text-neutral-dark hover:text-primary transition-colors">
            About Us
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex">Sign In</Button>
          <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
