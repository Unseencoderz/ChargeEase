// src/components/home/Hero.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, MapPin, Clock, Shield, Star, Play } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: MapPin, label: 'Charging Stations', value: '1M+', color: 'from-green-500 to-emerald-500' },
    { icon: Clock, label: 'Avg. Wait Time', value: '<5min', color: 'from-blue-500 to-cyan-500' },
    { icon: Shield, label: 'Uptime', value: '99.9%', color: 'from-purple-500 to-pink-500' },
    { icon: Star, label: 'User Rating', value: '4.8/5', color: 'from-orange-500 to-red-500' },
  ];

  // Create a beautiful EV charging background using CSS gradients and shapes
  const evChargingBackground = `
    data:image/svg+xml,${encodeURIComponent(`
      <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="70%">
            <stop offset="0%" style="stop-color:#1A1A1A;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0F172A;stop-opacity:1" />
          </radialGradient>
          <linearGradient id="car" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#00D4AA;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#0066FF;stop-opacity:0.8" />
          </linearGradient>
          <linearGradient id="station" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#E55722;stop-opacity:0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="100%" height="100%" fill="url(#bg)"/>
        
        <!-- Grid pattern -->
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#00D4AA" stroke-width="0.5" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        <!-- Charging Station -->
        <rect x="200" y="300" width="40" height="200" fill="url(#station)" rx="5" filter="url(#glow)"/>
        <rect x="210" y="280" width="20" height="30" fill="#00D4AA" rx="3"/>
        <circle cx="220" cy="295" r="3" fill="#ffffff"/>
        
        <!-- Charging Cable -->
        <path d="M 240 320 Q 280 340 320 360 Q 360 380 400 360" stroke="#00D4AA" stroke-width="6" fill="none" opacity="0.8"/>
        
        <!-- Electric Car Silhouette -->
        <g transform="translate(400, 360)">
          <!-- Car Body -->
          <ellipse cx="0" cy="0" rx="120" ry="35" fill="url(#car)" opacity="0.9"/>
          <rect x="-100" y="-25" width="200" height="40" fill="url(#car)" rx="20" opacity="0.8"/>
          
          <!-- Car Windows -->
          <rect x="-80" y="-35" width="60" height="20" fill="#1A1A1A" rx="10" opacity="0.6"/>
          <rect x="-10" y="-35" width="60" height="20" fill="#1A1A1A" rx="10" opacity="0.6"/>
          
          <!-- Wheels -->
          <circle cx="-60" cy="25" r="15" fill="#333" opacity="0.8"/>
          <circle cx="60" cy="25" r="15" fill="#333" opacity="0.8"/>
          <circle cx="-60" cy="25" r="8" fill="#00D4AA" opacity="0.6"/>
          <circle cx="60" cy="25" r="8" fill="#00D4AA" opacity="0.6"/>
        </g>
        
        <!-- Energy Flow Animation Dots -->
        <circle cx="250" cy="330" r="3" fill="#00D4AA" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="280" cy="345" r="3" fill="#00D4AA" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" begin="0.3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="320" cy="365" r="3" fill="#00D4AA" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" begin="0.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="360" cy="375" r="3" fill="#00D4AA" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.3;0.6" dur="2s" begin="0.9s" repeatCount="indefinite"/>
        </circle>
        
        <!-- Background Elements -->
        <circle cx="100" cy="150" r="40" fill="#00D4AA" opacity="0.1"/>
        <circle cx="1000" cy="200" r="60" fill="#0066FF" opacity="0.08"/>
        <circle cx="900" cy="600" r="80" fill="#FF6B35" opacity="0.06"/>
        
        <!-- Lightning Bolts -->
        <g transform="translate(220, 295)" filter="url(#glow)">
          <path d="M-5 -10 L5 -5 L-2 0 L8 10 L-8 5 L2 0 Z" fill="#ffffff" opacity="0.9"/>
        </g>
      </svg>
    `)}
  `;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero Background with EV Charging Scene */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url("${evChargingBackground}")`,
        }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500/10 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ 
            y: [0, 15, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Hero Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 modern-card px-6 py-3 mb-8"
          >
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-gray-300">
              Powering the Future of Transportation
            </span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">Charge</span>
            <br />
            <span className="text-white">Your Journey</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Discover over <span className="text-primary font-semibold">1 million</span> charging stations worldwide. 
            Find, book, and charge with ease using our intelligent platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button
              variant="primary"
              size="xl"
              onClick={() => navigate('/search')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
              className="btn-primary glow-primary"
            >
              Find Charging Stations
            </Button>
            <Button
              variant="ghost"
              size="xl"
              onClick={() => navigate('/about')}
              leftIcon={<Play className="w-5 h-5" />}
              className="btn-ghost"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="modern-card p-6 text-center group cursor-pointer"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.color} p-3 group-hover:shadow-lg transition-all duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-primary rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;