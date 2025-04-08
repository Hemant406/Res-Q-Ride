import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ServiceCategories from '@/components/home/ServiceCategories';
import HowItWorks from '@/components/home/HowItWorks';
import MechanicProfiles from '@/components/home/MechanicProfiles';
import { Button } from '@/components/ui/button';
import { MessageCircle, ThumbsUp, Clock } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/login');
    toast.info('Sign up functionality will be available soon!');
  };

  const handleLearnAboutMembership = () => {
    toast.info('Membership details will be available soon!');
    // In a real app, this would navigate to a membership page
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Service Categories */}
        <ServiceCategories />
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* Mechanic Profiles */}
        <MechanicProfiles />
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Immediate Assistance?</h2>
              <p className="text-lg opacity-90 mb-8">
                Don't wait until you're stranded. Sign up now for priority service and exclusive member benefits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg"
                  onClick={handleSignUp}
                >
                  Sign Up Now
                </Button>
                <Button 
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
                  onClick={handleLearnAboutMembership}
                >
                  Learn About Membership
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Experiences</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See what our customers are saying about their roadside assistance experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Ram Deshpande",
                  location: "Dwaraka",
                  testimonial: "I was stranded on the highway with a flat tire. ResQRide sent help within 20 minutes! The mechanic was professional and had me back on the road quickly.",
                  icon: Clock
                },
                {
                  name: "Omkar Pawar",
                  location: "Gangapur Road",
                  testimonial: "The app made it so easy to explain my car problem and share my location. The mechanic knew exactly what to bring and fixed my battery issue on the spot.",
                  icon: ThumbsUp
                },
                {
                  name: "Ishita Shinde",
                  location: "Ozar(HAL)",
                  testimonial: "I've used ResQRide three times now, and each experience has been excellent. The communication is clear, and the mechanics are knowledgeable and friendly.",
                  icon: MessageCircle
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="bg-primary-50 text-primary rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                    <testimonial.icon className="h-6 w-6" />
                  </div>
                  <p className="text-gray-600 italic mb-4">"{testimonial.testimonial}"</p>
                  <div className="font-medium">
                    <p className="text-gray-900">{testimonial.name}</p>
                    <p className="text-primary text-sm">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
