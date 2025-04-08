
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, X } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface LocationPickerProps {
  onLocationSelect: (location: { address: string; lat: number; lng: number }) => void;
  placeholder?: string;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ 
  onLocationSelect, 
  placeholder = "Enter your location" 
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{address: string; lat: number; lng: number} | null>(null);
  
  // Common locations that users might select
  const commonLocations = [
    { name: 'Gangapur Road', lat: 40.7128, lng: -74.0060 },
    { name: 'College Road', lat: 34.0522, lng: -118.2437 },
    { name: 'Indira Nagar', lat: 41.8781, lng: -87.6298 },
    { name: 'Ambad', lat: 29.7604, lng: -95.3698 },
    { name: 'Dwaraka', lat: 33.4484, lng: -112.0740 },
    { name: 'Tapovan', lat: 39.9526, lng: -75.1652 },
    { name: 'Ozar(HAL)', lat: 29.4241, lng: -98.4936 },
    { name: 'Amrut Dham', lat: 32.7157, lng: -117.1611 },
    { name: 'Rane Nagar', lat: 32.7767, lng: -96.7970 },
    { name: 'Nimani', lat: 37.7749, lng: -122.4194 }
  ];

  const handleLocationSelect = (location: typeof commonLocations[0]) => {
    setSelectedLocation({
      address: location.name,
      lat: location.lat,
      lng: location.lng
    });
    setAddress(location.name);
  };

  const handleCustomLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.trim()) {
      toast.error('Please enter a location');
      return;
    }
    
    // For a custom location, we'll generate random but reasonable coordinates
    // In a real app, we would use a geocoding service
    const randomLat = 35 + Math.random() * 10; // Roughly US latitudes
    const randomLng = -120 + Math.random() * 50; // Roughly US longitudes
    
    setSelectedLocation({
      address: address,
      lat: randomLat,
      lng: randomLng
    });
    
    setIsDialogOpen(false);
    toast.success(`Location set to ${address}`);
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
      setIsDialogOpen(false);
    } else {
      toast.error('Please select a location first');
    }
  };

  const clearLocation = () => {
    setSelectedLocation(null);
    setAddress('');
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <Input
          value={selectedLocation?.address || ''}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-6 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          onClick={() => setIsDialogOpen(true)}
          readOnly
        />
        {selectedLocation && (
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              clearLocation();
            }}
            aria-label="Clear location"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Choose Your Location</DialogTitle>
            <DialogDescription>
              Select from common locations or enter your address
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Common Locations</h3>
              <div className="grid grid-cols-2 gap-2">
                {commonLocations.map((location, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className={`justify-start ${selectedLocation?.address === location.name ? 'border-primary' : ''}`}
                    onClick={() => handleLocationSelect(location)}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    {location.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Or enter custom address</h3>
              <form onSubmit={handleCustomLocationSubmit} className="flex space-x-2">
                <Input 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter street, city, state" 
                  className="flex-1"
                />
                <Button type="submit">Add</Button>
              </form>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleConfirmLocation}>Confirm Location</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocationPicker;
