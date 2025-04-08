import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type MechanicProfile = {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  specialization: string;
  available: boolean;
};

const MechanicCard = ({ profile }: { profile: MechanicProfile }) => {
  const handleContactMechanic = () => {
    if (profile.available) {
      toast.success(`Connecting you with ${profile.name}...`);
      
      // Simulate a connection delay
      setTimeout(() => {
        toast.success(`${profile.name} has been notified and will contact you shortly.`);
      }, 1500);
    } else {
      toast.error(`${profile.name} is currently unavailable. Please try another mechanic.`);
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <img 
          src={profile.image} 
          alt={profile.name}
          className="w-full h-48 object-cover object-center" 
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center">
          <Star className="h-4 w-4 text-secondary fill-secondary" />
          <span className="ml-1 font-medium">{profile.rating}</span>
          <span className="text-gray-500 text-sm ml-1">({profile.reviews})</span>
        </div>
        <div 
          className={`absolute bottom-2 left-2 px-3 py-1 rounded-full text-sm font-medium ${
            profile.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {profile.available ? 'Available Now' : 'Unavailable'}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
        <p className="text-primary font-medium mb-2">{profile.specialization}</p>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm">{profile.location}</span>
        </div>
        <Button 
          className="w-full bg-primary hover:bg-primary-600 flex items-center justify-center" 
          onClick={handleContactMechanic}
          disabled={!profile.available}
        >
          <Phone className="h-4 w-4 mr-2" /> Contact Mechanic
        </Button>
      </CardContent>
    </Card>
  );
};

const MechanicProfiles = () => {
  const mechanics: MechanicProfile[] = [
    {
      id: 1,
      name: "Alex Thompson",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=480",
      rating: 4.9,
      reviews: 124,
      location: "Downtown, 3.2 miles away",
      specialization: "Engine Specialist",
      available: true
    },
    {
      id: 2,
      name: "Jessica Reynolds",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=480",
      rating: 4.7,
      reviews: 98,
      location: "East Side, 1.5 miles away",
      specialization: "Electrical Systems",
      available: true
    },
    {
      id: 3,
      name: "Marcus Wilson",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=480",
      rating: 4.8,
      reviews: 156,
      location: "North District, 4.7 miles away",
      specialization: "Transmission Expert",
      available: false
    },
    {
      id: 4,
      name: "Sarah Martinez",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=480",
      rating: 4.6,
      reviews: 87,
      location: "West End, 2.8 miles away",
      specialization: "Brake Specialist",
      available: true
    }
  ];

  const handleViewAllMechanics = () => {
    toast.info("More mechanics will be available soon!");
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Top Mechanics</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our highly-rated mechanics ready to help you with any vehicle issues
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mechanics.map((mechanic) => (
            <MechanicCard key={mechanic.id} profile={mechanic} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary hover:text-white"
            onClick={handleViewAllMechanics}
          >
            View All Mechanics
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MechanicProfiles;
