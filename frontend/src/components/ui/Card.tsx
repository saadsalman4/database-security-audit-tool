import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'sql' | 'mongo' | 'neutral';
  bordered?: boolean;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  theme = 'neutral',
  bordered = true,
  hoverable = false,
}) => {
  const getBorderClass = () => {
    if (!bordered) return '';
    
    switch (theme) {
      case 'sql':
        return 'border-sql-light';
      case 'mongo':
        return 'border-mongo-light';
      default:
        return 'border-gray-200';
    }
  };
  
  const getHoverClass = () => {
    if (!hoverable) return '';
    
    switch (theme) {
      case 'sql':
        return 'hover:border-sql-primary hover:shadow-md';
      case 'mongo':
        return 'hover:border-mongo-primary hover:shadow-md';
      default:
        return 'hover:border-gray-300 hover:shadow-md';
    }
  };

  const cardClasses = classNames(
    'bg-white rounded-lg shadow-sm',
    bordered ? 'border' : '',
    getBorderClass(),
    getHoverClass(),
    'transition-all duration-200',
    className
  );

  return (
    <motion.div 
      className={cardClasses}
      whileHover={hoverable ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;