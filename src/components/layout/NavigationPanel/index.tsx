/**
 * NavigationPanel - 左侧导航面板
 * 包含：会话列表、新建会话按钮、Token监控
 */

import React from 'react';
import { useLayout } from '@/hooks/useLayout';
import { Button } from '@/components/common/Button';
import { cn } from '@/utils/cn';
import { NAV_WIDTH, NAV_WIDTH_COLLAPSED } from '@/constants/layout';

interface NavigationPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({ 
  children,
  className = '' 
}) => {
  const { navigationExpanded, toggleNavigation } = useLayout();

  if (!navigationExpanded) {
    // 折叠状态 - 只显示图标
    return (
      <div 
        className={cn(
          'flex flex-col h-full',
          'bg-bg-secondary',
          'border-r border-border-default',
          className
        )}
        style={{ width: NAV_WIDTH_COLLAPSED }}
      >
        {/* 展开按钮 */}
        <button
          onClick={toggleNavigation}
          className={cn(
            'p-3 m-2',
            'text-text-secondary hover:text-text-primary',
            'hover:bg-bg-tertiary rounded-lg',
            'transition-colors'
          )}
          title="展开导航栏"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* 图标列表 */}
        <div className="flex-1 flex flex-col items-center py-4 space-y-4">
          {/* 会话图标 */}
          <button className="p-2 text-text-secondary hover:text-highlight-cyan transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          {/* 设置图标 */}
          <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // 展开状态 - 完整导航栏
  return (
    <div 
      className={cn(
        'flex flex-col h-full',
        'bg-bg-secondary',
        'border-r border-border-default',
        className
      )}
      style={{ width: NAV_WIDTH }}
    >
      {/* 标题栏 */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-border-default">
        <h1 className="text-lg font-semibold text-gradient-cyan-purple">
          Longju 5.1
        </h1>
        <button
          onClick={toggleNavigation}
          className="p-1 text-text-secondary hover:text-text-primary transition-colors"
          title="收起导航栏"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* 新建会话按钮 */}
      <div className="px-3 py-4">
        <Button variant="gradient" fullWidth>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          新建对话
        </Button>
      </div>

      {/* 会话列表区域 */}
      <div className="flex-1 overflow-y-auto px-3">
        {children || (
          <div className="text-center py-8 text-text-tertiary">
            <p className="text-sm">暂无会话</p>
            <p className="text-xs mt-2">点击上方按钮创建新对话</p>
          </div>
        )}
      </div>

      {/* 底部Token监控 */}
      <div className="border-t border-border-default p-3">
        <div className="glass rounded-lg p-3">
          <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
            <span>Token 使用</span>
            <span className="text-highlight-cyan">0 / 100,000</span>
          </div>
          <div className="w-full bg-bg-tertiary rounded-full h-2">
            <div 
              className="bg-highlight-cyan rounded-full h-2 transition-all"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPanel;
