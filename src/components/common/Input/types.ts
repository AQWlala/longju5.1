/**
 * Input组件类型定义
 */

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'search';
  size?: InputSize;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  name?: string;
  autoComplete?: string;
}
