import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Battery, Car, Wrench, Truck, Fuel } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const ServiceItem = ({ icon: Icon, title, description, slug }: { 
  icon: React.ElementType, 
  title: string, 
  description: string,
  slug: string 
}) => {
  const navigate = useNavigate();
  
  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/services/${slug}`);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary border-2 border-transparent">
      <CardContent className="p-6">
        <div className="bg-primary-50 text-primary rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a href="#" onClick={handleLearnMore} className="inline-flex items-center text-primary font-medium">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
};

const ServiceCategories = () => {
  const services = [
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

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From flat tires to dead batteries, our skilled mechanics provide fast, reliable assistance wherever you are.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceItem 
              key={index} 
              icon={service.icon} 
              title={service.title} 
              description={service.description}
              slug={service.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
