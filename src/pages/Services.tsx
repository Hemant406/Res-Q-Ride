
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ServiceCategories from '@/components/home/ServiceCategories';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Services = () => {
  const navigate = useNavigate();

  const handleScheduleService = () => {
    toast.success('Redirecting to appointment page');
    navigate('/appointment');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Services Banner */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Automotive Services</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Professional automotive solutions for all your vehicle needs. From emergency roadside assistance to routine maintenance.
            </p>
          </div>
        </section>
        
        {/* Service Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Explore Our Services</h2>
            <ServiceCategories />
          </div>
        </section>
        
        {/* Additional Service Info */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Professional Automotive Care</h2>
                <p className="text-gray-700 mb-4">
                  Our team of certified mechanics brings years of experience and expertise to every job. We utilize the latest technologies and tools to diagnose and fix your vehicle issues quickly and effectively.
                </p>
                <p className="text-gray-700 mb-6">
                  Whether you need emergency roadside assistance, routine maintenance, or complex repairs, we've got you covered with transparent pricing and quality service.
                </p>
                <Button 
                  className="bg-primary hover:bg-primary-600"
                  onClick={handleScheduleService}
                >
                  Schedule a Service
                </Button>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-primary">Why Choose Our Services</h3>
                <ul className="space-y-3">
                  {[
                    "Certified mechanics with years of experience",
                    "Transparent pricing with no hidden fees",
                    "Fast response times for emergency services",
                    "Modern equipment and diagnostic tools",
                    "Warranty on parts and labor",
                    "Convenient online booking system"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-secondary font-bold mr-2">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
