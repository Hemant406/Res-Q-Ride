
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AppointmentData {
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
  appointment: {
    serviceName: string;
    scheduledDate: string;
    scheduledTime: string;
    address: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { user, appointment }: AppointmentData = await req.json();

    if (!user.email) {
      throw new Error("User email is required");
    }

    console.log("Sending confirmation email to:", user.email);

    const emailResponse = await resend.emails.send({
      from: "MechanicMate <onboarding@resend.dev>",
      to: [user.email],
      subject: "Your Appointment Confirmation",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4f46e5;">Appointment Confirmed!</h1>
          <p>Hello ${user.firstName || 'there'},</p>
          <p>Your appointment has been successfully scheduled:</p>
          <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Service:</strong> ${appointment.serviceName}</p>
            <p><strong>Date:</strong> ${appointment.scheduledDate}</p>
            <p><strong>Time:</strong> ${appointment.scheduledTime}</p>
            <p><strong>Location:</strong> ${appointment.address}</p>
          </div>
          <p>Our mechanic will arrive at the scheduled time. You'll receive a notification when they're on their way.</p>
          <p>If you need to reschedule or cancel, please contact us at least 2 hours before your appointment.</p>
          <p>Thank you for choosing MechanicMate!</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
