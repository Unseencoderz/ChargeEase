import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Mail, 
  ArrowLeft,
  Zap,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

interface ForgotPasswordForm {
  email: string;
}

const ForgotPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<ForgotPasswordForm>();

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8"
        >
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg px-8 py-12 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Check your email
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We've sent a password reset link to{' '}
              <span className="font-medium text-gray-900 dark:text-white">
                {getValues('email')}
              </span>
            </p>
            
            <div className="space-y-4">
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="w-full"
              >
                Send another email
              </Button>
              
              <Link to="/login">
                <Button variant="ghost" className="w-full">
                  Back to login
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">ChargeEase</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Forgot password?
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-lg px-8 py-8"
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </motion.div>
            )}

            <div>
              <Input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address'
                  }
                })}
                type="email"
                label="Email address"
                placeholder="Enter your email"
                leftIcon={<Mail className="w-4 h-4" />}
                error={errors.email?.message}
                variant="outlined"
              />
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send reset link'}
              </Button>
            </div>
          </form>

          {/* Back to login */}
          <div className="mt-6">
            <Link
              to="/login"
              className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to login</span>
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-orange-600 hover:text-orange-500 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;