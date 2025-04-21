import React from 'react';
import classNames from 'classnames';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'lg',
}) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  const containerClasses = classNames(
    'w-full mx-auto px-4 sm:px-6',
    sizeClasses[size],
    className
  );

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
};

export default Container;