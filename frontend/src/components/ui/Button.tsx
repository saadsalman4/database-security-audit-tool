import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  theme?: 'sql' | 'mongo' | 'neutral';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  theme = 'neutral',
  isLoading = false,
  icon,
  fullWidth = false,
  className,
  disabled,
  ...props
}) => {
  const getVariantClasses = () => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none transition duration-150 ease-in-out';
    
    const variantClasses = {
      primary: {
        sql: 'bg-sql-primary hover:bg-sql-dark text-white shadow-sm',
        mongo: 'bg-mongo-primary hover:bg-mongo-dark text-white shadow-sm',
        neutral: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm',
      },
      secondary: {
        sql: 'bg-sql-light hover:bg-blue-100 text-sql-primary',
        mongo: 'bg-mongo-light hover:bg-green-100 text-mongo-primary',
        neutral: 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700',
      },
      outline: {
        sql: 'border border-sql-primary text-sql-primary hover:bg-sql-light',
        mongo: 'border border-mongo-primary text-mongo-primary hover:bg-mongo-light',
        neutral: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
      },
      text: {
        sql: 'text-sql-primary hover:bg-sql-light',
        mongo: 'text-mongo-primary hover:bg-mongo-light',
        neutral: 'text-gray-700 hover:bg-gray-100',
      },
    };
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };
    
    const widthClass = fullWidth ? 'w-full' : '';
    const disabledClass = disabled || isLoading ? 'opacity-60 cursor-not-allowed' : '';
    
    return classNames(
      baseClasses,
      variantClasses[variant][theme],
      sizeClasses[size],
      widthClass,
      disabledClass,
      className
    );
  };
  
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={getVariantClasses()}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !isLoading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
    </motion.button>
  );
};

export default Button;