
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill out all required fields');
      return;
    }

    // In a real app, this would send the form data to a server
    toast.success('Your message has been sent!');
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Contact Banner */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Reach out to our team through any of the methods below.
            </p>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <Input 
                      id="name" 
                      placeholder="John Smith" 
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <Input 
                      id="subject" 
                      placeholder="How can we help you?" 
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us more about your inquiry..." 
                      rows={5} 
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary-600">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary-50 p-2 rounded-full mr-4">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Our Location</h3>
                        <p className="text-gray-600">123 Repair Street, Auto City, AC 12345</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary-50 p-2 rounded-full mr-4">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Phone Numbers</h3>
                        <p className="text-gray-600">Main: (555) 123-4567</p>
                        <p className="text-gray-600">Emergency: 800-555-0123</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary-50 p-2 rounded-full mr-4">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Email Address</h3>
                        <p className="text-gray-600">info@mechanicmate.com</p>
                        <p className="text-gray-600">support@mechanicmate.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary-50 p-2 rounded-full mr-4">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Business Hours</h3>
                        <p className="text-gray-600">Monday-Friday: 8:00 AM - 6:00 PM</p>
                        <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                        <p className="text-gray-600">Sunday: Closed (Emergency Service Available)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-200 h-64 rounded-lg overflow-hidden">
                  {/* This would be replaced with an actual Google Map */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Map Location
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
