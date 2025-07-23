import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'glass' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  glow = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-xl
    transition-all duration-300 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    relative overflow-hidden
  `;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-3',
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700
      text-white shadow-lg hover:shadow-xl
      focus:ring-blue-500 transform hover:scale-105 active:scale-95
      ${glow ? 'glow-electric' : ''}
    `,
    secondary: `
      bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700
      text-white shadow-lg hover:shadow-xl
      focus:ring-purple-500 transform hover:scale-105 active:scale-95
      ${glow ? 'glow-warning' : ''}
    `,
    ghost: `
      bg-transparent hover:bg-white/10 backdrop-blur-sm
      text-gray-300 hover:text-white border border-white/20 hover:border-white/40
      focus:ring-white/50 transform hover:scale-105 active:scale-95
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
      text-white shadow-lg hover:shadow-xl
      focus:ring-red-500 transform hover:scale-105 active:scale-95
      ${glow ? 'glow-error' : ''}
    `,
    success: `
      bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700
      text-white shadow-lg hover:shadow-xl
      focus:ring-green-500 transform hover:scale-105 active:scale-95
      ${glow ? 'glow-success' : ''}
    `,
    glass: `
      glass-button text-white hover:text-white
      focus:ring-white/50 border-white/20 hover:border-white/40
      backdrop-blur-md hover:backdrop-blur-lg
    `,
    gradient: `
      animated-gradient text-white shadow-lg hover:shadow-xl
      focus:ring-blue-500 transform hover:scale-105 active:scale-95
      ${glow ? 'glow-electric' : ''}
    `,
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${widthClass}
    ${className}
  `.trim();

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Background Shimmer Effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Loading Spinner */}
      {isLoading && (
        <Loader2 className="w-4 h-4 animate-spin" />
      )}
      
      {/* Left Icon */}
      {!isLoading && leftIcon && (
        <span className="flex-shrink-0">
          {leftIcon}
        </span>
      )}
      
      {/* Button Text */}
      <span className={isLoading ? 'opacity-0' : ''}>
        {children}
      </span>
      
      {/* Right Icon */}
      {!isLoading && rightIcon && (
        <span className="flex-shrink-0">
          {rightIcon}
        </span>
      )}
      
      {/* Ripple Effect */}
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute inset-0 bg-white/20 transform scale-0 group-active:scale-100 transition-transform duration-300 rounded-xl"></span>
      </span>
    </motion.button>
  );
};

export default Button;