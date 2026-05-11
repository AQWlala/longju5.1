/**
 * Tooltip组件 - 提示框
 */

import React, { useState, useRef, useEffect } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'click';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  trigger?: TooltipTrigger;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  trigger = 'hover',
  delay = 200,
  children,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (trigger === 'hover') {
      timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    } else {
      setIsVisible(true);
    }
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const placementClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      ref={triggerRef}
      className="relative inline-block"
      onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
      onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
      onClick={trigger === 'click' ? () => setIsVisible(!isVisible) : undefined}
    >
      {children}
      {isVisible && (
        <div
          className={`
            absolute
            z-tooltip
            px-2
            py-1
            text-sm
            text-text-primary
            bg-bg-elevated
            border
            border-border-default
            rounded
            shadow-lg
            whitespace-nowrap
            animate-fade-in
            ${placementClasses[placement]}
            ${className}
          `}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
