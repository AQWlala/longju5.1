/**
 * Input组件 - Longju 5.1输入框组件
 */

import React from 'react';
import { InputProps } from './types';

const sizeClasses = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

export const Input: React.FC<InputProps> = ({
  type = 'text',
  size = 'md',
  placeholder,
  value,
  defaultValue,
  disabled = false,
  error = false,
  errorMessage,
  prefixIcon,
  suffixIcon,
  maxLength,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  className = '',
  id,
  name,
  autoComplete,
}) => {
  const baseClasses = `
    w-full
    bg-bg-tertiary
    text-text-primary
    border
    rounded-lg
    outline-none
    transition-all duration-200
    placeholder:text-text-tertiary
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const stateClasses = error
    ? 'border-error focus:border-error-light focus:ring-2 focus:ring-error focus:ring-opacity-20'
    : 'border-border-default focus:border-accent-primary focus:ring-2 focus:ring-accent-primary focus:ring-opacity-20';

  return (
    <div className={`relative ${className}`}>
      <div className="relative flex items-center">
        {prefixIcon && (
          <div className="absolute left-3 text-text-secondary pointer-events-none">
            {prefixIcon}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          autoComplete={autoComplete}
          className={`
            ${baseClasses}
            ${sizeClasses[size]}
            ${stateClasses}
            ${prefixIcon ? 'pl-10' : ''}
            ${suffixIcon ? 'pr-10' : ''}
          `}
        />
        {suffixIcon && (
          <div className="absolute right-3 text-text-secondary pointer-events-none">
            {suffixIcon}
          </div>
        )}
      </div>
      {error && errorMessage && (
        <p className="mt-1 text-sm text-error">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
