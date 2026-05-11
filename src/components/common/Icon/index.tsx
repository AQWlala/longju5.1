/**
 * Icon组件 - Lucide React图标包装器
 */

import React from 'react';
import * as LucideIcons from 'lucide-react';

export type IconName = keyof typeof LucideIcons;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color = 'currentColor',
  className = '',
  strokeWidth = 2,
}) => {
  const IconComponent = LucideIcons[name] as React.ComponentType<any>;
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      strokeWidth={strokeWidth}
    />
  );
};

export default Icon;

// 导出所有图标名称供TypeScript使用
export const iconNames = Object.keys(LucideIcons) as IconName[];
