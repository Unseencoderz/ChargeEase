import React, { forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'default',
  showPasswordToggle = false,
  className = '',
  type = 'text',
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const inputType = showPasswordToggle && type === 'password' 
    ? (showPassword ? 'text' : 'password') 
    : type;

  const baseClasses = [
    'w-full transition-all duration-200 outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ];

  const variantClasses = {
    default: [
      'border-b-2 bg-transparent pb-2',
      error ? 'border-red-500' : isFocused ? 'border-orange-500' : 'border-gray-300',
      'focus:border-orange-500'
    ],
    filled: [
      'bg-gray-100 border border-gray-300 rounded-lg px-4 py-2',
      error ? 'border-red-500 bg-red-50' : isFocused ? 'border-orange-500 bg-orange-50' : '',
      'focus:border-orange-500 focus:bg-orange-50',
      'dark:bg-gray-800 dark:border-gray-600',
      'dark:focus:bg-gray-700 dark:focus:border-orange-500'
    ],
    outlined: [
      'border-2 rounded-lg px-4 py-2',
      error ? 'border-red-500' : isFocused ? 'border-orange-500' : 'border-gray-300',
      'focus:border-orange-500',
      'dark:border-gray-600 dark:focus:border-orange-500'
    ]
  };

  const inputClasses = [
    ...baseClasses,
    ...variantClasses[variant],
    leftIcon ? 'pl-10' : '',
    (rightIcon || showPasswordToggle) ? 'pr-10' : '',
    className
  ].join(' ');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium mb-2 transition-colors ${
            error ? 'text-red-600' : isFocused ? 'text-orange-600' : 'text-gray-700 dark:text-gray-300'
          }`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          id={inputId}
          className={inputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {(rightIcon || showPasswordToggle) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {showPasswordToggle && type === 'password' ? (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            ) : (
              rightIcon && <div className="text-gray-400">{rightIcon}</div>
            )}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500 dark:text-gray-400'}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;