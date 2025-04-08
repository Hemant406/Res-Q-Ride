import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Car className="h-6 w-6 text-primary-300" />
              <span className="text-xl font-bold">ResQRide</span>
            </div>
            <p className="text-gray-400 mb-6">
              Providing reliable roadside assistance and mechanic services 24/7.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary-300 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary-300 transition-colors">Services</Link></li>
              <li><Link to="/mechanics" className="text-gray-400 hover:text-primary-300 transition-colors">Mechanics</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-300 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-300 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">Roadside Assistance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">Car Repair</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">Battery Replacement</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">Tire Change</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary-300 transition-colors">Towing Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-300 mt-0.5" />
                <span className="text-gray-400">123 Gangapur Road , Nashik 422013</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-300" />
                <span className="text-gray-400">800-555-0123</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-300" />
                <span className="text-gray-400">help@resqride.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="text-center text-gray-500">
            <p>© {new Date().getFullYear()} ResQRide. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
