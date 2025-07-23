// src/pages/SignupPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User,
  Phone,
  Zap, 
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Loader2,
  Chrome,
  Apple,
  Shield,
  Check
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  newsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const watchedFields = watch();
  const password = watch('password');

  const passwordStrength = {
    length: password?.length >= 8,
    uppercase: /[A-Z]/.test(password || ''),
    lowercase: /[a-z]/.test(password || ''),
    number: /[0-9]/.test(password || ''),
    special: /[^A-Za-z0-9]/.test(password || ''),
  };

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length;

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call for now - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock successful signup
      const mockUser = {
        id: '1',
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        avatar: null,
      };
      
      // In real implementation, this would be:
      // await signup(data);
      console.log('Signup data:', data);
      console.log('Mock user created:', mockUser);
      
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: 'Chrome' | 'apple') => {
    setIsLoading(true);
    try {
      // Simulate social signup
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log(`${provider} signup initiated`);
      navigate('/dashboard');
    } catch (err) {
      setError(`Failed to sign up with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = step === 1 
      ? ['firstName', 'lastName', 'email'] 
      : ['password', 'confirmPassword'];
    
    const isStepValid = await trigger(fieldsToValidate as any);
    if (isStepValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link to="/" className="inline-flex items-center space-x-2 group mb-8">
            <div className="w-12 h-12 glass-button rounded-xl flex items-center justify-center glow-electric">
              <Zap className="w-7 h-7 text-blue-400 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold gradient-text">ChargeEase</h1>
              <p className="text-xs text-gray-400 -mt-1">Power Your Journey</p>
            </div>
          </Link>
          
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join thousands of EV drivers worldwide</p>
          
          {/* Progress Indicator */}
          <div className="mt-6 flex items-center justify-center space-x-4">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
            <div className={`w-8 h-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-600'}`}></div>
          </div>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-8"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className={`pl-12 ${errors.firstName ? 'border-red-500/50 focus:border-red-500' : 'focus:border-blue-500'}`}
                        {...register('firstName')}
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-400">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className={`pl-12 ${errors.lastName ? 'border-red-500/50 focus:border-red-500' : 'focus:border-blue-500'}`}
                        {...register('lastName')}
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-400">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className={`pl-12 ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'focus:border-blue-500'}`}
                      {...register('email')}
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    {watchedFields.email && !errors.email && (
                      <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                    )}
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email.message}</span>
                    </p>
                  )}
                </div>

                {/* Phone Field (Optional) */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number <span className="text-gray-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="pl-12 focus:border-blue-500"
                      {...register('phone')}
                    />
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <Button
                  type="button"
                  variant="gradient"
                  size="lg"
                  fullWidth
                  onClick={nextStep}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="group"
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      className={`pl-12 pr-12 ${errors.password ? 'border-red-500/50 focus:border-red-500' : 'focus:border-blue-500'}`}
                      {...register('password')}
                    />
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              strengthScore <= 2 ? 'bg-red-500 w-1/3' :
                              strengthScore <= 3 ? 'bg-yellow-500 w-2/3' :
                              'bg-green-500 w-full'
                            }`}
                          />
                        </div>
                        <span className={`text-xs font-medium ${
                          strengthScore <= 2 ? 'text-red-400' :
                          strengthScore <= 3 ? 'text-yellow-400' :
                          'text-green-400'
                        }`}>
                          {strengthScore <= 2 ? 'Weak' : strengthScore <= 3 ? 'Good' : 'Strong'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(passwordStrength).map(([key, met]) => (
                          <div key={key} className={`flex items-center space-x-1 ${met ? 'text-green-400' : 'text-gray-500'}`}>
                            {met ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-gray-500" />}
                            <span>
                              {key === 'length' ? '8+ characters' :
                               key === 'uppercase' ? 'Uppercase' :
                               key === 'lowercase' ? 'Lowercase' :
                               key === 'number' ? 'Number' :
                               'Special char'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.password.message}</span>
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className={`pl-12 pr-12 ${errors.confirmPassword ? 'border-red-500/50 focus:border-red-500' : 'focus:border-blue-500'}`}
                      {...register('confirmPassword')}
                    />
                    <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.confirmPassword.message}</span>
                    </p>
                  )}
                </div>

                {/* Terms and Newsletter */}
                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-500 bg-transparent border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                      {...register('acceptTerms')}
                    />
                    <span className="text-sm text-gray-300">
                      I agree to the{' '}
                      <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="text-sm text-red-400 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.acceptTerms.message}</span>
                    </p>
                  )}

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-500 bg-transparent border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                      {...register('newsletter')}
                    />
                    <span className="text-sm text-gray-300">
                      Subscribe to our newsletter for updates and exclusive offers
                    </span>
                  </label>
                </div>

                {/* Navigation Buttons */}
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    onClick={prevStep}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    glow
                    isLoading={isLoading}
                    disabled={!isValid}
                    rightIcon={!isLoading && <ArrowRight className="w-5 h-5" />}
                    className="flex-1 group"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>

          {step === 1 && (
            <>
              {/* Divider */}
              <div className="mt-8 mb-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-800/50 text-gray-400">Or sign up with</span>
                </div>
              </div>

              {/* Social Signup */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="glass"
                  onClick={() => handleSocialSignup('Chrome')}
                  disabled={isLoading}
                  leftIcon={<Chrome className="w-5 h-5" />}
                  className="group"
                >
                  Chrome
                </Button>
                <Button
                  variant="glass"
                  onClick={() => handleSocialSignup('apple')}
                  disabled={isLoading}
                  leftIcon={<Apple className="w-5 h-5" />}
                  className="group"
                >
                  Apple
                </Button>
              </div>
            </>
          )}

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
