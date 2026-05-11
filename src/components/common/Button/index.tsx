/**
 * Button组件 - Longju 5.1按钮组件
 * 支持多种变体：default、primary、ghost、danger、gradient
 */

import React from 'react';
import { ButtonProps } from './types';

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

const variantClasses = {
  default: 'bg-bg-tertiary text-text-primary hover:bg-bg-elevated border border-border-default',
  primary: 'bg-accent-primary text-white hover:bg-accent-secondary',
  ghost: 'bg-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary',
  danger: 'bg-error text-white hover:bg-error-light',
  gradient: 'gradient-cyan-purple text-white hover:opacity-90',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  className = '',
  type = 'button',
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-lg font-medium
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-bg-primary
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95
  `;

  const hoverScale = !disabled && !loading ? 'hover:scale-105' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${hoverScale}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
};

export default Button;
