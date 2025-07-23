// src/components/ui/ImagePlaceholder.tsx
import React from 'react';
import { Image, Zap, Car, MapPin, Users, Building, Star } from 'lucide-react';

interface ImagePlaceholderProps {
  width?: number;
  height?: number;
  type?: 'station' | 'car' | 'profile' | 'location' | 'company' | 'general';
  alt?: string;
  className?: string;
  showIcon?: boolean;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width = 400,
  height = 300,
  type = 'general',
  alt = 'Placeholder image',
  className = '',
  showIcon = true,
}) => {
  const getTypeConfig = () => {
    switch (type) {
      case 'station':
        return {
          icon: Zap,
          gradient: 'from-green-500 to-emerald-500',
          pattern: 'charging-station',
          bgColor: '#1A1A1A'
        };
      case 'car':
        return {
          icon: Car,
          gradient: 'from-blue-500 to-cyan-500',
          pattern: 'electric-car',
          bgColor: '#1E293B'
        };
      case 'profile':
        return {
          icon: Users,
          gradient: 'from-purple-500 to-pink-500',
          pattern: 'user-profile',
          bgColor: '#2D1B69'
        };
      case 'location':
        return {
          icon: MapPin,
          gradient: 'from-orange-500 to-red-500',
          pattern: 'location',
          bgColor: '#7C2D12'
        };
      case 'company':
        return {
          icon: Building,
          gradient: 'from-gray-500 to-slate-500',
          pattern: 'company',
          bgColor: '#374151'
        };
      default:
        return {
          icon: Image,
          gradient: 'from-green-500 to-emerald-500',
          pattern: 'general',
          bgColor: '#1A1A1A'
        };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  // Generate SVG background pattern based on type
  const generateSVGPattern = () => {
    const patternId = `pattern-${type}-${Math.random().toString(36).substr(2, 9)}`;
    
    switch (type) {
      case 'station':
        return `
          <defs>
            <pattern id="${patternId}" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="${config.bgColor}"/>
              <circle cx="20" cy="20" r="2" fill="#00D4AA" opacity="0.3"/>
              <path d="M15 15 L25 15 L25 25 L15 25 Z" fill="none" stroke="#00D4AA" stroke-width="0.5" opacity="0.2"/>
            </pattern>
            <linearGradient id="grad-${patternId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#00D4AA;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#00B894;stop-opacity:0.8" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#${patternId})"/>
          <rect width="100%" height="100%" fill="url(#grad-${patternId})"/>
        `;
      case 'car':
        return `
          <defs>
            <pattern id="${patternId}" x="0" y="0" width="60" height="40" patternUnits="userSpaceOnUse">
              <rect width="60" height="40" fill="${config.bgColor}"/>
              <ellipse cx="30" cy="20" rx="25" ry="8" fill="#0066FF" opacity="0.2"/>
              <circle cx="15" cy="25" r="3" fill="#0066FF" opacity="0.3"/>
              <circle cx="45" cy="25" r="3" fill="#0066FF" opacity="0.3"/>
            </pattern>
            <linearGradient id="grad-${patternId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#0066FF;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#0052CC;stop-opacity:0.8" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#${patternId})"/>
          <rect width="100%" height="100%" fill="url(#grad-${patternId})"/>
        `;
      case 'location':
        return `
          <defs>
            <pattern id="${patternId}" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect width="50" height="50" fill="${config.bgColor}"/>
              <circle cx="25" cy="25" r="8" fill="none" stroke="#FF6B35" stroke-width="1" opacity="0.3"/>
              <circle cx="25" cy="25" r="2" fill="#FF6B35" opacity="0.5"/>
            </pattern>
            <linearGradient id="grad-${patternId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#E55722;stop-opacity:0.8" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#${patternId})"/>
          <rect width="100%" height="100%" fill="url(#grad-${patternId})"/>
        `;
      default:
        return `
          <defs>
            <pattern id="${patternId}" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect width="30" height="30" fill="${config.bgColor}"/>
              <rect x="0" y="0" width="15" height="15" fill="#00D4AA" opacity="0.1"/>
              <rect x="15" y="15" width="15" height="15" fill="#00D4AA" opacity="0.1"/>
            </pattern>
            <linearGradient id="grad-${patternId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#00D4AA;stop-opacity:0.7" />
              <stop offset="100%" style="stop-color:#00B894;stop-opacity:0.7" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#${patternId})"/>
          <rect width="100%" height="100%" fill="url(#grad-${patternId})"/>
        `;
    }
  };

  const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${generateSVGPattern()}
      ${showIcon ? `
        <g transform="translate(${width/2}, ${height/2})">
          <circle cx="0" cy="0" r="30" fill="rgba(255,255,255,0.1)" />
          <circle cx="0" cy="0" r="20" fill="rgba(255,255,255,0.2)" />
        </g>
      ` : ''}
    </svg>
  `)}`;

  return (
    <div 
      className={`relative overflow-hidden bg-gray-800 flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      {/* Background Image */}
      <img 
        src={svgDataUrl}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      
      {/* Icon Overlay */}
      {showIcon && (
        <div className="relative z-10 flex items-center justify-center">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${config.gradient} flex items-center justify-center shadow-lg`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
      )}
      
      {/* Loading shimmer effect */}
      <div className="absolute inset-0 loading-shimmer opacity-20"></div>
    </div>
  );
};

export default ImagePlaceholder;