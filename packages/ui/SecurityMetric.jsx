import React from 'react';

export const SecurityMetric = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  variant = 'default',
  className = '' 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'danger':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-900 bg-white border-gray-200';
    }
  };

  return (
    <div className={`p-6 rounded-lg border ${getVariantStyles()} ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}
    </div>
  );
};
