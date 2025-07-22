
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check,
  X,
  Star,
  Crown,
  Zap,
  Users,
  DollarSign,
  Clock,
  Shield,
  MapPin,
  Gift,
  ArrowRight
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const MembershipPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for occasional charging',
      price: { monthly: 0, yearly: 0 },
      icon: Users,
      color: 'gray',
      popular: false,
      features: [
        { name: 'Find charging stations', included: true },
        { name: 'Basic search filters', included: true },
        { name: 'Station reviews', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced booking', included: false },
        { name: 'Premium support', included: false },
        { name: 'Exclusive discounts', included: false },
        { name: 'Priority reservations', included: false }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Best for regular EV drivers',
      price: { monthly: 9.99, yearly: 99.99 },
      icon: Star,
      color: 'orange',
      popular: true,
      features: [
        { name: 'Find charging stations', included: true },
        { name: 'Advanced search filters', included: true },
        { name: 'Station reviews & ratings', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Advanced booking (24h ahead)', included: true },
        { name: 'Up to 10% charging discounts', included: true },
        { name: 'Trip planning tools', included: true },
        { name: 'Premium support', included: false },
        { name: 'Exclusive partner deals', included: false }
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For power users and businesses',
      price: { monthly: 24.99, yearly: 249.99 },
      icon: Crown,
      color: 'purple',
      popular: false,
      features: [
        { name: 'Everything in Premium', included: true },
        { name: 'Priority reservations', included: true },
        { name: 'Up to 20% charging discounts', included: true },
        { name: '24/7 phone support', included: true },
        { name: 'Advanced trip planning', included: true },
        { name: 'Fleet management tools', included: true },
        { name: 'Custom reporting', included: true },
        { name: 'API access', included: true },
        { name: 'Dedicated account manager', included: true }
      ]
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Access to the fastest charging networks with 99.9% uptime.'
    },
    {
      icon: DollarSign,
      title: 'Save Money',
      description: 'Exclusive discounts at partner charging stations save you up to 20%.'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Skip the lines with priority reservations and advanced booking.'
    },
    {
      icon: Shield,
      title: 'Peace of Mind',
      description: '24/7 support and guaranteed charging station availability.'
    },
    {
      icon: MapPin,
      title: 'Nationwide Coverage',
      description: 'Access to over 10,000 charging stations across the country.'
    },
    {
      icon: Gift,
      title: 'Exclusive Perks',
      description: 'Partner discounts, free charging credits, and special offers.'
    }
  ];

  const faqs = [
    {
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely.'
    },
    {
      question: 'Is there a contract or commitment?',
      answer: 'No, all our plans are month-to-month with no long-term contracts. You can cancel anytime.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all premium plans. No questions asked.'
    }
  ];

  const PlanCard: React.FC<{ plan: typeof plans[0] }> = ({ plan }) => {
    const Icon = plan.icon;
    const price = plan.price[billingCycle];
    const savings = billingCycle === 'yearly' ? (plan.price.monthly * 12 - plan.price.yearly) : 0;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 ${
          plan.popular ? 'ring-2 ring-orange-500 scale-105' : ''
        }`}
      >
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
        )}

        <div className="text-center mb-6">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            plan.color === 'gray' ? 'bg-gray-100 dark:bg-gray-700' :
            plan.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/20' :
            'bg-purple-100 dark:bg-purple-900/20'
          }`}>
            <Icon className={`w-8 h-8 ${
              plan.color === 'gray' ? 'text-gray-600 dark:text-gray-400' :
              plan.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
              'text-purple-600 dark:text-purple-400'
            }`} />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {plan.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {plan.description}
          </p>
          
          <div className="mb-4">
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                ${price}
              </span>
              {price > 0 && (
                <span className="text-gray-600 dark:text-gray-400 ml-1">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              )}
            </div>
            {savings > 0 && (
              <p className="text-green-600 text-sm mt-1">
                Save ${savings.toFixed(2)} per year
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center">
              {feature.included ? (
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              )}
              <span className={`text-sm ${
                feature.included 
                  ? 'text-gray-900 dark:text-white' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {feature.name}
              </span>
            </div>
          ))}
        </div>

        <Button
          className={`w-full ${
            plan.popular ? '' : 'variant-outline'
          } ${
            user?.membershipLevel === plan.name ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={user?.membershipLevel === plan.name}
        >
          {user?.membershipLevel === plan.name 
            ? 'Current Plan' 
            : plan.price[billingCycle] === 0 
              ? 'Get Started' 
              : 'Upgrade Now'
          }
        </Button>
      </motion.div>
    );
  };

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
              Choose Your Plan
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-8">
              Unlock exclusive benefits, save money on charging, and enjoy priority access to the best charging stations.
            </p>
            
            {isAuthenticated && user?.membershipLevel && (
              <div className="inline-flex items-center bg-white/20 rounded-lg px-4 py-2">
                <Crown className="w-5 h-5 mr-2" />
                <span>Current plan: {user.membershipLevel}</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Save 15%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose ChargeEase?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of satisfied EV drivers who trust ChargeEase for their charging needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center"
                >
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Have questions? We have answers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to upgrade your EV experience?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Join thousands of drivers who save time and money with ChargeEase Premium.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-orange-600"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MembershipPage;
