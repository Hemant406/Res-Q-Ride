import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Wrench } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createAppointment, fetchServices, fetchUserProfile } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  details: string;
  address: string;
}

const Appointment = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AppointmentFormData>();

  useEffect(() => {
    // Redirect to login page if user is not logged in
    if (!user) {
      toast.error('Please sign in to book an appointment');
      navigate('/login');
      return;
    }

    // Fetch services and user profile from the database
    const loadData = async () => {
      try {
        const [servicesData, profileData] = await Promise.all([
          fetchServices(),
          fetchUserProfile()
        ]);
        
        setServices(servicesData);
        setUserProfile(profileData);
        
        // Pre-fill the form with user profile data
        if (profileData) {
          setValue('name', `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim());
          setValue('email', profileData.email || '');
          setValue('phone', profileData.phone || '');
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load necessary data');
      }
    };

    loadData();
  }, [user, navigate, setValue]);

  const sendConfirmationEmail = async (appointment: any, service: any) => {
    try {
      // Find the selected service details
      const selectedService = services.find(s => s.id === appointment.service_id);
      
      if (!userProfile || !selectedService) {
        console.error('Missing user profile or service data for email');
        return;
      }
      
      // Call the Supabase Edge Function to send confirmation email
      await supabase.functions.invoke('send-appointment-confirmation', {
        body: {
          user: {
            email: userProfile.email,
            firstName: userProfile.first_name,
            lastName: userProfile.last_name
          },
          appointment: {
            serviceName: selectedService.name,
            scheduledDate: new Date(appointment.scheduled_date).toLocaleDateString(),
            scheduledTime: appointment.scheduled_time,
            address: appointment.user_location_address
          }
        }
      });
      
      console.log('Confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      // We don't want to break the whole flow if just the email fails
      toast.error('Appointment scheduled, but confirmation email failed to send');
    }
  };

  const onSubmit = async (data: AppointmentFormData) => {
    if (!user) {
      toast.error('Please sign in to book an appointment');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const appointmentData = {
        service_id: data.service,
        scheduled_date: data.date,
        scheduled_time: data.time,
        user_location_address: data.address,
        issue_description: data.details
      };

      const createdAppointment = await createAppointment(appointmentData);

      // Find the selected service
      const selectedService = services.find(service => service.id === data.service);

      // Send confirmation email
      await sendConfirmationEmail(createdAppointment, selectedService);

      toast.success('Appointment scheduled successfully!');
      reset();
      
      // Navigate to the account page to show appointments
      navigate('/account');
    } catch (error: any) {
      console.error('Error creating appointment:', error);
      toast.error(error.message || 'Failed to schedule appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Appointment Banner */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Schedule an Appointment</h1>
            <p className="text-lg max-w-2xl mx-auto">
              Book a service appointment with our professional mechanics in just a few steps.
            </p>
          </div>
        </section>
        
        {/* Appointment Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="bg-secondary-50 p-6 md:p-8 md:w-1/3">
                  <h2 className="text-xl font-bold mb-6 text-secondary">How It Works</h2>
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="bg-white rounded-full p-2 mr-4 shadow-sm">
                        <Calendar className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Pick a Date</h3>
                        <p className="text-sm text-gray-600">Select your preferred date and time</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white rounded-full p-2 mr-4 shadow-sm">
                        <Wrench className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Describe the Issue</h3>
                        <p className="text-sm text-gray-600">Tell us what needs attention</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white rounded-full p-2 mr-4 shadow-sm">
                        <MapPin className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Confirm Location</h3>
                        <p className="text-sm text-gray-600">Let us know where to meet you</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-white rounded-full p-2 mr-4 shadow-sm">
                        <Clock className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Get Confirmation</h3>
                        <p className="text-sm text-gray-600">We'll confirm your appointment</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="p-6 md:p-8 md:w-2/3">
                  <h2 className="text-2xl font-bold mb-6">Book Your Service</h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <Input 
                          id="name" 
                          placeholder="John Smith" 
                          {...register('name', { required: 'Name is required' })} 
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="john@example.com" 
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: 'Please enter a valid email'
                            }
                          })} 
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <Input 
                          id="phone" 
                          placeholder="(123) 456-7890" 
                          {...register('phone', { required: 'Phone number is required' })} 
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                        <Input 
                          id="date" 
                          type="date" 
                          {...register('date', { required: 'Date is required' })} 
                        />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                        <Input 
                          id="time" 
                          type="time" 
                          {...register('time', { required: 'Time is required' })} 
                        />
                        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                        <select 
                          id="service" 
                          className="w-full rounded-md border border-gray-300 p-2"
                          {...register('service', { required: 'Please select a service' })}
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.name}
                            </option>
                          ))}
                        </select>
                        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service.message}</p>}
                      </div>
                    </div>
                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Your Location</label>
                      <Input 
                        id="address" 
                        placeholder="123 Main St, City, State, Zip" 
                        {...register('address', { required: 'Address is required' })} 
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                    </div>
                    <div className="mb-6">
                      <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Service Details</label>
                      <Textarea 
                        id="details" 
                        placeholder="Please describe your vehicle issue or service needed" 
                        rows={4} 
                        {...register('details')} 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
                    </Button>
                  </form>
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

export default Appointment;
