/**
 * MainLayout - 主布局容器
 * 三栏式布局：左侧导航 + 中央交互区 + 右侧工具栏
 */

import React from 'react';
import { useLayout } from '@/hooks/useLayout';
import { cn } from '@/utils/cn';

interface MainLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ 
  children,
  className = '' 
}) => {
  const {
    navigationExpanded,
    toolExpanded,
    navigationWidth,
    toolWidth,
    centerWidth,
  } = useLayout();

  return (
    <div 
      className={cn(
        'flex h-screen w-screen overflow-hidden',
        'bg-bg-primary',
        className
      )}
    >
      {/* 左侧导航栏 */}
      <aside
        className={cn(
          'flex-shrink-0 h-full',
          'transition-all duration-300 ease-in-out',
          'border-r border-border-default',
        )}
        style={{ width: navigationWidth }}
      >
        {/* NavigationPanel 将在这里渲染 */}
        <div className="h-full bg-bg-secondary">
          {/* 占位内容 */}
          <div className="p-4 text-text-secondary">
            导航栏 ({navigationWidth}px)
          </div>
        </div>
      </aside>

      {/* 中央交互区 */}
      <main
        className={cn(
          'flex-1 h-full',
          'flex flex-col',
          'min-w-0', // 防止flex子项溢出
        )}
        style={{ width: centerWidth }}
      >
        {children || (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-text-secondary">
              中央交互区 ({centerWidth}px)
            </div>
          </div>
        )}
      </main>

      {/* 右侧工具栏 */}
      {toolExpanded && (
        <aside
          className={cn(
            'flex-shrink-0 h-full',
            'transition-all duration-300 ease-in-out',
            'border-l border-border-default',
            'animate-slide-in-right',
          )}
          style={{ width: toolWidth }}
        >
          {/* ToolPanel 将在这里渲染 */}
          <div className="h-full bg-bg-secondary">
            <div className="p-4 text-text-secondary">
              工具栏 ({toolWidth}px)
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};

export default MainLayout;
