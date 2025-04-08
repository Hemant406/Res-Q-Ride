
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Mechanics
export const fetchMechanics = async () => {
  try {
    const { data, error } = await supabase
      .from('mechanics')
      .select(`
        id,
        specialization,
        experience_years,
        hourly_rate,
        is_available,
        location_address,
        lat,
        lng,
        profiles (
          first_name,
          last_name,
          email,
          phone
        )
      `);

    if (error) throw error;
    return data;
  } catch (error: any) {
    toast.error(`Error fetching mechanics: ${error.message}`);
    throw error;
  }
};

// Services
export const fetchServices = async () => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*');

    if (error) throw error;
    return data;
  } catch (error: any) {
    toast.error(`Error fetching services: ${error.message}`);
    throw error;
  }
};

// Appointments
export const createAppointment = async (appointmentData: {
  service_id: string;
  scheduled_date: string;
  scheduled_time: string;
  user_location_address: string;
  user_lat?: number;
  user_lng?: number;
  issue_description?: string;
}) => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData.user) throw new Error('You must be logged in to book appointments');
    
    const { data, error } = await supabase
      .from('appointments')
      .insert({
        user_id: userData.user.id,
        ...appointmentData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    toast.error(`Error creating appointment: ${error.message}`);
    throw error;
  }
};

export const fetchUserAppointments = async () => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData.user) return [];
    
    const { data, error } = await supabase
      .from('appointments')
      .select(`
        *,
        services (name, description, category, base_price),
        mechanics (
          id,
          specialization,
          hourly_rate,
          profiles (first_name, last_name)
        )
      `)
      .eq('user_id', userData.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error: any) {
    toast.error(`Error fetching appointments: ${error.message}`);
    throw error;
  }
};

// Reviews
export const createReview = async (reviewData: {
  appointment_id: string;
  mechanic_id: string;
  rating: number;
  comment?: string;
}) => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData.user) throw new Error('You must be logged in to leave reviews');
    
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        user_id: userData.user.id,
        ...reviewData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    toast.error(`Error creating review: ${error.message}`);
    throw error;
  }
};

// User profile
export const fetchUserProfile = async () => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData.user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userData.user.id)
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    toast.error(`Error fetching profile: ${error.message}`);
    throw error;
  }
};

export const updateUserProfile = async (profileData: {
  first_name?: string;
  last_name?: string;
  phone?: string;
}) => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    
    if (!userData.user) throw new Error('You must be logged in to update your profile');
    
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userData.user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error: any) {
    toast.error(`Error updating profile: ${error.message}`);
    throw error;
  }
};
