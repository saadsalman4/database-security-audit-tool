import React from 'react';
import classNames from 'classnames';

type SeverityLevel = 'critical' | 'high' | 'medium' | 'low';

interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
}

const SeverityBadge: React.FC<SeverityBadgeProps> = ({ severity, className }) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const getSeverityClasses = () => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={classNames(baseClasses, getSeverityClasses(), className)}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
};

export default SeverityBadge;