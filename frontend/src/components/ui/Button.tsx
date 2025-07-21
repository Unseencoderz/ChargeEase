import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = [
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'rounded-lg'
  ];

  const variantClasses = {
    primary: [
      'bg-orange-500 text-white border border-orange-500',
      'hover:bg-orange-600 hover:border-orange-600',
      'active:bg-orange-700 active:border-orange-700'
    ],
    secondary: [
      'bg-gray-100 text-gray-900 border border-gray-300',
      'hover:bg-gray-200 hover:border-gray-400',
      'active:bg-gray-300',
      'dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600',
      'dark:hover:bg-gray-700 dark:hover:border-gray-500'
    ],
    outline: [
      'bg-transparent text-orange-500 border border-orange-500',
      'hover:bg-orange-50 hover:text-orange-600',
      'active:bg-orange-100',
      'dark:hover:bg-orange-900/10'
    ],
    ghost: [
      'bg-transparent text-gray-700 border border-transparent',
      'hover:bg-gray-100 hover:text-gray-900',
      'active:bg-gray-200',
      'dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100'
    ],
    destructive: [
      'bg-red-500 text-white border border-red-500',
      'hover:bg-red-600 hover:border-red-600',
      'active:bg-red-700 active:border-red-700'
    ]
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    icon: 'p-2'
  };

  const classes = [
    ...baseClasses,
    ...variantClasses[variant],
    sizeClasses[size],
    className
  ].join(' ');

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {size !== 'icon' && 'Loading...'}
        </>
      ) : (
        <>
          {leftIcon && leftIcon}
          {size !== 'icon' && children}
          {rightIcon && rightIcon}
        </>
      )}
    </motion.button>
  );
};

export default Button;