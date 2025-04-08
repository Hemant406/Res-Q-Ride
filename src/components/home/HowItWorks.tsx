
import React from 'react';
import { ClipboardCheck, MapPin, Search, Wrench } from 'lucide-react';

const StepItem = ({ number, icon: Icon, title, description }: { number: number, icon: React.ElementType, title: string, description: string }) => (
  <div className="relative">
    <div className="flex flex-col items-center">
      <div className="relative z-10 bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4">
        {number}
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 text-center relative z-10">
        <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting help is quick and easy with our simple process
          </p>
        </div>
        
        {/* Desktop version with connecting lines */}
        <div className="hidden lg:block relative">
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-primary-100 -translate-y-1/2" aria-hidden="true"></div>
          <div className="grid grid-cols-4 gap-8">
            <StepItem 
              number={1} 
              icon={MapPin} 
              title="Share Your Location" 
              description="Enter your current location or use GPS to let us know where you are." 
            />
            <StepItem 
              number={2} 
              icon={Search} 
              title="Describe the Issue" 
              description="Tell us what's wrong with your vehicle so we can send the right help." 
            />
            <StepItem 
              number={3} 
              icon={Wrench} 
              title="Get Matched" 
              description="We'll connect you with nearby mechanics with the right skills." 
            />
            <StepItem 
              number={4} 
              icon={ClipboardCheck} 
              title="Problem Solved" 
              description="The mechanic arrives and gets you back on the road quickly." 
            />
          </div>
        </div>
        
        {/* Mobile version without connecting lines */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8">
          <StepItem 
            number={1} 
            icon={MapPin} 
            title="Share Your Location" 
            description="Enter your current location or use GPS to let us know where you are." 
          />
          <StepItem 
            number={2} 
            icon={Search} 
            title="Describe the Issue" 
            description="Tell us what's wrong with your vehicle so we can send the right help." 
          />
          <StepItem 
            number={3} 
            icon={Wrench} 
            title="Get Matched" 
            description="We'll connect you with nearby mechanics with the right skills." 
          />
          <StepItem 
            number={4} 
            icon={ClipboardCheck} 
            title="Problem Solved" 
            description="The mechanic arrives and gets you back on the road quickly." 
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
