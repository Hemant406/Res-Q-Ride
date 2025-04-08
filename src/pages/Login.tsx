import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, UserPlus, Lock, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Login = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  if (!loading && user) {
    return <Navigate to="/" />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      await signIn(email, password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password, { 
        first_name: firstName, 
        last_name: lastName,
        phone: phoneNumber 
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <Card className="shadow-lg">
                  <CardHeader className="text-center space-y-1">
                    <div className="flex justify-center">
                      <div className="p-2 rounded-full bg-primary-50">
                        <Lock className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription>Sign in to access your ResQRide account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleSignIn} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your@email.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                          <a href="#" className="text-sm text-primary hover:underline">Forgot Password?</a>
                        </div>
                        <Input 
                          id="password" 
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id="remember" 
                          className="rounded text-primary focus:ring-primary"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary-600"
                        disabled={isLoading}
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="signup">
                <Card className="shadow-lg">
                  <CardHeader className="text-center space-y-1">
                    <div className="flex justify-center">
                      <div className="p-2 rounded-full bg-primary-50">
                        <UserPlus className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
                    <CardDescription>Sign up to get started with ResQRide</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="firstname" className="text-sm font-medium text-gray-700">First Name</label>
                          <Input 
                            id="firstname" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastname" className="text-sm font-medium text-gray-700">Last Name</label>
                          <Input 
                            id="lastname" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">Mobile Number</label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm">
                            +91
                          </span>
                          <Input 
                            id="phone" 
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="9876543210" 
                            className="rounded-l-none"
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit Indian mobile number"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Example: 9876543210 (10 digits)</p>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="signup-email" className="text-sm font-medium text-gray-700">Email Address</label>
                        <Input 
                          id="signup-email" 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com" 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="signup-password" className="text-sm font-medium text-gray-700">Password</label>
                        <Input 
                          id="signup-password" 
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required 
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary-600"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
