import React from 'react';
import classNames from 'classnames';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
  theme?: 'sql' | 'mongo' | 'neutral';
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  className,
  theme = 'neutral',
}) => {
  const getThemeClasses = () => {
    const baseClasses = 'block w-full rounded-md shadow-sm focus:ring-2 focus:outline-none border-gray-300';
    
    switch (theme) {
      case 'sql':
        return 'focus:ring-sql-primary focus:border-sql-primary';
      case 'mongo':
        return 'focus:ring-mongo-primary focus:border-mongo-primary';
      default:
        return 'focus:ring-indigo-500 focus:border-indigo-500';
    }
  };

  const labelClasses = classNames(
    'block text-sm font-medium text-gray-700 mb-1',
    {
      'text-sql-dark': theme === 'sql',
      'text-mongo-dark': theme === 'mongo',
    }
  );

  const inputClasses = classNames(
    'py-2 px-3',
    getThemeClasses(),
    error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300',
    className
  );

  return (
    <div className="mb-4">
      <label htmlFor={name} className={labelClasses}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClasses}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;