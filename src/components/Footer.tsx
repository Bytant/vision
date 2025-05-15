
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="container px-4 py-10 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-neutral-dark">EyeVision Care</span>
            </Link>
            <p className="text-sm text-neutral">
              Providing accessible vision care through innovative technology and expert guidance.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-neutral-dark">Vision Tests</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tests/visual-acuity" className="text-neutral hover:text-primary transition-colors">
                  Visual Acuity Test
                </Link>
              </li>
              <li>
                <Link to="/tests/color-blindness" className="text-neutral hover:text-primary transition-colors">
                  Color Vision Test
                </Link>
              </li>
              <li>
                <Link to="/tests/astigmatism" className="text-neutral hover:text-primary transition-colors">
                  Astigmatism Test
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-neutral-dark">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-neutral hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-neutral-dark">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-neutral hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-neutral hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="text-center text-xs text-neutral">
            © {new Date().getFullYear()} EyeVision Care. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
