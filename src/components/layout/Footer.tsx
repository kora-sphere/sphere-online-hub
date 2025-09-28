import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Kora Sphere Global</h3>
            <p className="font-body text-sm opacity-90 mb-4">
              Empowering You, Everywhere. Your trusted partner for online cyber café and soft-skill services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="font-body text-sm hover:opacity-80 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="font-body text-sm hover:opacity-80 transition-opacity">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="font-body text-sm hover:opacity-80 transition-opacity">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-body text-sm hover:opacity-80 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="font-body text-sm opacity-90">Document Typing</li>
              <li className="font-body text-sm opacity-90">Printing & Scanning</li>
              <li className="font-body text-sm opacity-90">Web Development</li>
              <li className="font-body text-sm opacity-90">Mobile Development</li>
              <li className="font-body text-sm opacity-90">Graphic Design</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="font-body text-sm">info@korasphere.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="font-body text-sm">+234 806 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="font-body text-sm">Lagos, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <p className="font-body text-sm text-center opacity-90">
            © 2024 Kora Sphere Global Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;