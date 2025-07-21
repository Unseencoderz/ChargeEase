import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Building
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
}

const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Contact form submitted:', data);
    setIsSubmitted(true);
    setIsLoading(false);
    reset();
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'support@chargeease.com',
      description: 'Send us an email anytime!'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '123 Innovation Drive, San Francisco, CA 94107',
      description: 'Come say hello at our office'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      content: '24/7 Online Support',
      description: 'We\'re here when you need us'
    }
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'feedback', label: 'Feedback' }
  ];

  const faqs = [
    {
      question: 'How do I find charging stations near me?',
      answer: 'Use our search feature on the homepage or in our mobile app. You can search by location, filter by charging speed, connector type, and more.'
    },
    {
      question: 'Can I reserve a charging station in advance?',
      answer: 'Yes! You can book charging sessions up to 24 hours in advance through our platform. This ensures you have a spot when you need it.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and Apple Pay. You can also use our ChargeEase membership for simplified billing.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes, our mobile app is available for both iOS and Android. Download it from the App Store or Google Play Store.'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full mx-4"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Message Sent!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="w-full">
              Send Another Message
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send us a message
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    {...register('name', { required: 'Name is required' })}
                    label="Full Name"
                    placeholder="Your full name"
                    error={errors.name?.message}
                    variant="outlined"
                  />
                  
                  <Input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                    type="email"
                    label="Email Address"
                    placeholder="your.email@example.com"
                    error={errors.email?.message}
                    variant="outlined"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    {...register('category', { required: 'Please select a category' })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
                  )}
                </div>

                <Input
                  {...register('subject', { required: 'Subject is required' })}
                  label="Subject"
                  placeholder="Brief description of your inquiry"
                  error={errors.subject?.message}
                  variant="outlined"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Get in touch
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={info.title} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {info.title}
                        </h3>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {info.content}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Our Location
              </h3>
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Building className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Quick answers to questions you may have. Can't find what you're looking for? Contact our support team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                View All FAQs
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;