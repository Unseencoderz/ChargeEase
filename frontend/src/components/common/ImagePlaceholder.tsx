// src/components/common/ImagePlaceholder.tsx
import React from 'react';
import { ImageIcon } from 'lucide-react';

interface ImagePlaceholderProps {
  width?: number;
  height?: number;
  text?: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width = 300,
  height = 200,
  text = 'Image',
  className = '',
  bgColor = '#374151',
  textColor = '#9CA3AF'
}) => {
  const svgDataUrl = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <g transform="translate(${width/2}, ${height/2})">
        <circle cx="0" cy="-10" r="20" fill="${textColor}" opacity="0.3"/>
        <rect x="-6" y="-6" width="12" height="8" fill="${textColor}" opacity="0.5"/>
        <text x="0" y="25" text-anchor="middle" fill="${textColor}" font-family="Arial, sans-serif" font-size="14">${text}</text>
      </g>
    </svg>
  `)}`;

  return (
    <img
      src={svgDataUrl}
      alt={text}
      width={width}
      height={height}
      className={`object-cover ${className}`}
    />
  );
};

// Predefined image placeholders for common use cases
export const ChargingStationImage: React.FC<{ className?: string }> = ({ className }) => (
  <ImagePlaceholder
    width={400}
    height={250}
    text="Charging Station"
    className={className}
    bgColor="#1F2937"
    textColor="#60A5FA"
  />
);

export const UserAvatarPlaceholder: React.FC<{ className?: string; size?: number }> = ({ 
  className, 
  size = 40 
}) => (
  <ImagePlaceholder
    width={size}
    height={size}
    text=""
    className={`rounded-full ${className}`}
    bgColor="#6366F1"
    textColor="#FFFFFF"
  />
);

export const HeroImagePlaceholder: React.FC<{ className?: string }> = ({ className }) => (
  <ImagePlaceholder
    width={800}
    height={400}
    text="Hero Image"
    className={className}
    bgColor="#0F172A"
    textColor="#3B82F6"
  />
);

export const StationCardImage: React.FC<{ className?: string }> = ({ className }) => (
  <ImagePlaceholder
    width={300}
    height={180}
    text="Station"
    className={className}
    bgColor="#1E293B"
    textColor="#0EA5E9"
  />
);

export default ImagePlaceholder;