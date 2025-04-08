
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Battery, Car, Wrench, Truck, Fuel, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

// Service data with detailed information
const serviceData = [
  {
    icon: Battery,
    title: "Battery Services",
    description: "Jump starts and battery replacements to get you back on the road quickly.",
    slug: "battery-services",
    fullDescription: "Our comprehensive battery services include jump-starts, testing, replacement, and recycling of old batteries. We use high-quality batteries that come with extended warranties, ensuring reliable performance in all weather conditions. Our technicians can diagnose battery issues quickly and provide on-the-spot solutions.",
    features: [
      "24/7 emergency jump-start assistance",
      "Comprehensive battery health testing",
      "Wide range of battery options for all vehicle types",
      "Proper disposal and recycling of old batteries",
      "Battery terminal cleaning and maintenance"
    ],
    pricing: "Starting at ₹1,500 for basic service, with premium options available"
  },
  {
    icon: Wrench,
    title: "Flat Tire Repair",
    description: "Quick tire changes and repairs for unexpected flats and blowouts.",
    slug: "flat-tire-repair",
    fullDescription: "Our flat tire repair service offers quick solutions when you're stranded with a flat or blown tire. Our mobile mechanics will come to your location, assess the damage, and either repair your tire on the spot or replace it with your spare. For more severe damage, we can tow your vehicle to our partner repair shops.",
    features: [
      "Fast response mobile tire repair",
      "Tire patching and plugging",
      "Spare tire installation",
      "Tire pressure adjustment",
      "Tire rotation recommendations"
    ],
    pricing: "Starting at ₹800 for basic repair, additional costs for replacement parts if needed"
  },
  {
    icon: Fuel,
    title: "Fuel Delivery",
    description: "Emergency fuel delivery when you're stranded with an empty tank.",
    slug: "fuel-delivery",
    fullDescription: "Running out of fuel happens to the best of us. Our emergency fuel delivery service brings gasoline or diesel directly to your location, getting you back on the road without the hassle of finding the nearest gas station. We deliver enough fuel to get you to the nearest station safely.",
    features: [
      "Rapid response fuel delivery",
      "Available for gasoline and diesel vehicles",
      "Delivery to remote locations",
      "No markup on fuel prices",
      "Basic vehicle inspection during service"
    ],
    pricing: "Service fee of ₹500 plus the cost of fuel delivered"
  },
  {
    icon: Wrench,
    title: "General Repairs",
    description: "On-site mechanical repairs for common breakdown issues.",
    slug: "general-repairs",
    fullDescription: "Our mobile mechanics can handle many common vehicle issues right where your car is parked. From belt replacements to fluid leaks, electrical problems to cooling system issues, our technicians bring their expertise to your location, saving you time and towing expenses.",
    features: [
      "Diagnostic services using advanced equipment",
      "Belt and hose replacements",
      "Fluid leak repairs",
      "Cooling system repairs",
      "Battery and electrical system repairs"
    ],
    pricing: "Starting at ₹1,000/hour plus parts, with accurate quotes provided before work begins"
  },
  {
    icon: Car,
    title: "Lockout Service",
    description: "Fast assistance when you're locked out of your vehicle.",
    slug: "lockout-service",
    fullDescription: "Being locked out of your vehicle can be stressful and potentially dangerous. Our professional lockout services use specialized tools to safely unlock your vehicle without causing damage. Our technicians are trained in the latest entry techniques for all types of vehicles.",
    features: [
      "Non-destructive vehicle entry techniques",
      "Service for all vehicle makes and models",
      "Key extraction for broken keys",
      "Trunk unlocking",
      "Child rescue priority service"
    ],
    pricing: "Basic service starts at ₹800, with additional costs for specialized situations"
  },
  {
    icon: Truck,
    title: "Towing Service",
    description: "Reliable towing to your preferred repair shop or dealership.",
    slug: "towing-service",
    fullDescription: "When your vehicle can't be repaired on-site, our reliable towing service gets your car safely to your preferred destination. We use flatbed trucks and wheel-lift equipment to ensure damage-free transport. Our drivers are certified, insured, and trained in proper vehicle handling.",
    features: [
      "Flatbed towing for all vehicle types",
      "Wheel-lift towing for appropriate vehicles",
      "Dolly systems for AWD/4WD vehicles",
      "Motorcycle and specialty vehicle transport",
      "Long-distance towing available"
    ],
    pricing: "Starting at ₹1,200 for local towing (up to 5 km), with additional distance charges"
  }
];

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find the service based on the slug
  const service = serviceData.find(s => s.slug === slug);
  
  // If service is not found, display error and redirect
  if (!service) {
    React.useEffect(() => {
      toast.error("Service not found");
      navigate('/services');
    }, [navigate]);
    
    return null;
  }
  
  const Icon = service.icon;
  
  const handleScheduleService = () => {
    toast.success('Redirecting to appointment page');
    navigate('/appointment');
  };
  
  const handleBack = () => {
    navigate('/services');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Service Detail Header */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <button 
              onClick={handleBack}
              className="flex items-center text-white mb-6 hover:underline"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Services
            </button>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-white text-primary rounded-full w-24 h-24 flex items-center justify-center">
                <Icon className="h-12 w-12" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{service.title}</h1>
                <p className="text-lg opacity-90">{service.description}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Service Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-semibold mb-6">About this Service</h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  {service.fullDescription}
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Pricing</h3>
                  <p className="text-gray-700">
                    {service.pricing}
                  </p>
                </div>
                
                <Button 
                  className="bg-primary hover:bg-primary-600 w-full md:w-auto"
                  onClick={handleScheduleService}
                >
                  Schedule This Service
                </Button>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">Service Features</h3>
                <ul className="space-y-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-8 text-center">You might also be interested in</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {serviceData
                .filter(s => s.slug !== slug)
                .slice(0, 3)
                .map((relatedService, index) => {
                  const RelatedIcon = relatedService.icon;
                  return (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-center mb-4">
                        <div className="bg-primary-50 text-primary rounded-full w-12 h-12 flex items-center justify-center mr-4">
                          <RelatedIcon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold">{relatedService.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{relatedService.description}</p>
                      <button 
                        onClick={() => navigate(`/services/${relatedService.slug}`)}
                        className="text-primary font-medium text-sm flex items-center hover:underline"
                      >
                        Learn more <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
