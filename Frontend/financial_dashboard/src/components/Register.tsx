
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, CreditCard, Shield, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      alert('Registered successfully');
      navigate('/login');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Registration Form */}
        <div className="w-full max-w-md mx-auto lg:order-2">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-2 text-center">
              <div className="lg:hidden flex items-center justify-center space-x-2 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">FinanceFlow</h1>
              </div>
              <CardTitle className="text-2xl font-bold">Join your company</CardTitle>
              <CardDescription className="text-gray-600">
                Create your account to access the financial dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className=" text-gray-600 space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-11 bg-white text-black"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password text-gray-600">Password</Label>
                  <div className="relative ">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10 bg-white text-black"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <input type="checkbox" className="mt-1 rounded border-gray-300" required />
                  <p className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="#" className="text-blue-600 hover:text-blue-800 font-medium">
                      Privacy Policy
                    </Link>
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right side - Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 pr-8 lg:order-1">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-600 rounded-xl">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">FinanceFlow</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-md">
              Join your company's smart financial management platform.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-700">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>Enterprise-level security & encryption</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Advanced financial analytics & insights</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Trusted by finance teams worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
