
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import LocationPicker from './LocationPicker';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    lat: number;
    lng: number;
  } | null>(null);

  const handleFindMechanics = () => {
    if (!selectedLocation) {
      toast.error('Please select your location first');
      return;
    }
    
    // In a real app, this would connect to a database or API to find mechanics near the location
    toast.success(`Searching for mechanics near ${selectedLocation.address}`);
    
    // For demo purposes only - simulating database connection
    setTimeout(() => {
      toast.success('Found 5 mechanics in your area!');
      // Navigate to mechanics page (using the services page for now)
      navigate('/services');
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Roadside Assistance <span className="text-primary">When You Need It Most</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Connect with skilled mechanics in your area for fast, reliable service. Help is just a few clicks away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <LocationPicker 
                  onLocationSelect={setSelectedLocation}
                  placeholder="Choose your location"
                />
              </div>
              <Button 
                className="sm:flex-initial bg-secondary hover:bg-secondary-600 px-8 py-6 text-lg"
                onClick={handleFindMechanics}
              >
                Find Mechanics
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
            <img 
              src="https://autoaid.in/wp-content/uploads/2023/12/Image-2-1.jpg"
              alt="Mechanic helping with roadside assistance" 
              className="w-full h-[400px] rounded-lg shadow-xl object-cover bg-red-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
