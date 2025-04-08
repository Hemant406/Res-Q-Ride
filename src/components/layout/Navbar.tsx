
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, Phone, Menu, X, Home, Wrench, Calendar, MessageSquare } from 'lucide-react';
import { AuthButtons } from './AuthButtons';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Car className="h-6 w-6 text-primary" />
          <Link to="/" className="text-xl font-bold text-primary">ResQRide</Link>
        </div>
        
        {/* Desktop Navigation - Single Row */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link to="/services" className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
            <Wrench className="h-4 w-4" />
            <span>Our Services</span>
          </Link>
          <Link to="/appointment" className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
            <Calendar className="h-4 w-4" />
            <span>Appointment</span>
          </Link>
          <Link to="/contact" className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
            <MessageSquare className="h-4 w-4" />
            <span>Contact Us</span>
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-secondary" />
            <span className="font-medium">Emergency: 800-555-0123</span>
          </div>
          <AuthButtons />
        </div>
        
        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors py-2" onClick={toggleMenu}>
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/services" className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors py-2" onClick={toggleMenu}>
              <Wrench className="h-5 w-5" />
              <span>Our Services</span>
            </Link>
            <Link to="/appointment" className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors py-2" onClick={toggleMenu}>
              <Calendar className="h-5 w-5" />
              <span>Appointment</span>
            </Link>
            <Link to="/contact" className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors py-2" onClick={toggleMenu}>
              <MessageSquare className="h-5 w-5" />
              <span>Contact Us</span>
            </Link>
            <div className="flex items-center space-x-2 py-2">
              <Phone className="h-5 w-5 text-secondary" />
              <span className="font-medium">Emergency: 800-555-0123</span>
            </div>
            <AuthButtons />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
