
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { fetchUserAppointments, fetchUserProfile } from '@/services/api';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Clock, Calendar, MapPin, User, Phone, Mail, Wrench, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';

const Account = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'profile';
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    enabled: !!user,
  });

  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ['userAppointments'],
    queryFn: fetchUserAppointments,
    enabled: !!user,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-xl">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Your Account</h1>
          
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">My Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
                  
                  {profileLoading ? (
                    <div className="text-center py-10">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p>Loading your profile...</p>
                    </div>
                  ) : userProfile ? (
                    <Card>
                      <CardHeader className="bg-secondary-50 pb-2">
                        <CardTitle>Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <User className="h-5 w-5 mr-3 text-primary" />
                            <div>
                              <div className="text-sm text-gray-500">Name</div>
                              <div className="font-medium">
                                {userProfile.first_name || ''} {userProfile.last_name || ''}
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 mr-3 text-primary" />
                            <div>
                              <div className="text-sm text-gray-500">Email</div>
                              <div className="font-medium">{userProfile.email || ''}</div>
                            </div>
                          </div>
                          <Separator />
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-3 text-primary" />
                            <div>
                              <div className="text-sm text-gray-500">Phone</div>
                              <div className="font-medium">{userProfile.phone || 'Not provided'}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-2">Profile not found</h3>
                      <p className="text-gray-500">Could not load your profile information.</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
                  
                  {appointmentsLoading ? (
                    <div className="text-center py-10">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p>Loading your appointments...</p>
                    </div>
                  ) : appointments && appointments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {appointments.map((appointment) => (
                        <Card key={appointment.id} className="overflow-hidden">
                          <CardHeader className="bg-secondary-50 pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">
                                {appointment.services?.name || 'Service'}
                              </CardTitle>
                              <Badge className={
                                appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                appointment.status === 'canceled' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                              }>
                                {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1) || 'Pending'}
                              </Badge>
                            </div>
                            <CardDescription>
                              {appointment.services?.description || 'Car service appointment'}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-primary" />
                                <span>{new Date(appointment.scheduled_date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-primary" />
                                <span>{appointment.scheduled_time}</span>
                              </div>
                              <div className="flex items-start">
                                <MapPin className="h-4 w-4 mr-2 mt-1 text-primary" />
                                <span>{appointment.user_location_address}</span>
                              </div>
                              {appointment.issue_description && (
                                <div className="flex items-start">
                                  <AlertTriangle className="h-4 w-4 mr-2 mt-1 text-primary" />
                                  <span className="text-sm">{appointment.issue_description}</span>
                                </div>
                              )}
                              {appointment.mechanics && (
                                <div className="mt-4 pt-4 border-t">
                                  <div className="flex items-center">
                                    <Wrench className="h-4 w-4 mr-2 text-secondary" />
                                    <span className="font-medium">
                                      {appointment.mechanics.profiles?.first_name} {appointment.mechanics.profiles?.last_name}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-600 ml-6 mt-1">
                                    {appointment.mechanics.specialization}
                                  </div>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-2">No appointments yet</h3>
                      <p className="text-gray-500 mb-4">You haven't scheduled any appointments.</p>
                      <button 
                        onClick={() => navigate('/appointment')}
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-600 transition-colors"
                      >
                        Schedule an Appointment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
