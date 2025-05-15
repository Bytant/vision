
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <Eye className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-neutral-dark">EyeVision Care</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-neutral-dark"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden space-x-4 md:flex">
          <Link to="/" className="text-sm font-medium text-neutral-dark hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/tests" className="text-sm font-medium text-neutral-dark hover:text-primary transition-colors">
            Vision Tests
          </Link>
          <Link to="/learn-more" className="text-sm font-medium text-neutral-dark hover:text-primary transition-colors">
            Learn More
          </Link>
          <Link to="/about" className="text-sm font-medium text-neutral-dark hover:text-primary transition-colors">
            About Us
          </Link>
        </nav>
        
        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Button 
              variant="outline" 
              onClick={() => signOut()}
              className="hidden md:flex"
            >
              Sign Out
            </Button>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="hidden md:flex"
                onClick={() => window.location.href = "/signin"}
              >
                Sign In
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => window.location.href = "/signup"}
              >
                Get Started
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white md:hidden">
            <div className="container flex h-16 items-center justify-between px-4">
              <Link to="/" className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-neutral-dark">EyeVision Care</span>
              </Link>
              <button 
                className="text-neutral-dark"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <nav className="container px-4 py-8 flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-lg font-medium text-neutral-dark hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/tests" 
                className="text-lg font-medium text-neutral-dark hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Vision Tests
              </Link>
              <Link 
                to="/learn-more" 
                className="text-lg font-medium text-neutral-dark hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Learn More
              </Link>
              <Link 
                to="/about" 
                className="text-lg font-medium text-neutral-dark hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              
              <div className="pt-4 flex flex-col gap-2">
                {user ? (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        window.location.href = "/signin";
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => {
                        window.location.href = "/signup";
                        setIsMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
