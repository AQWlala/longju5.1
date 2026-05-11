/**
 * ToolPanel - 右侧工具面板
 * 包含：技能网格、文件操作记录、实时日志
 */

import React from 'react';
import { useLayout } from '@/hooks/useLayout';
import { cn } from '@/utils/cn';
import { TOOL_WIDTH } from '@/constants/layout';

interface ToolPanelProps {
  children?: React.ReactNode;
  className?: string;
}

export const ToolPanel: React.FC<ToolPanelProps> = ({ 
  children,
  className = '' 
}) => {
  const { toggleTool } = useLayout();

  // 技能列表（模拟数据）
  const skills = [
    { id: 1, name: '搜索', icon: '🔍', category: 'search' },
    { id: 2, name: '代码', icon: '💻', category: 'code' },
    { id: 3, name: '文件', icon: '📁', category: 'file' },
    { id: 4, name: '分析', icon: '📊', category: 'analysis' },
    { id: 5, name: '写作', icon: '✍️', category: 'other' },
    { id: 6, name: '翻译', icon: '🌐', category: 'other' },
    { id: 7, name: '图表', icon: '📈', category: 'analysis' },
    { id: 8, name: '笔记', icon: '📝', category: 'other' },
    { id: 9, name: '设置', icon: '⚙️', category: 'other' },
  ];

  return (
    <div 
      className={cn(
        'flex flex-col h-full',
        'bg-bg-secondary',
        'border-l border-border-default',
        className
      )}
      style={{ width: TOOL_WIDTH }}
    >
      {/* 标题栏 */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-border-default">
        <h2 className="text-base font-medium text-text-primary">
          技能面板
        </h2>
        <button
          onClick={toggleTool}
          className="p-1 text-text-secondary hover:text-text-primary transition-colors"
          title="收起工具栏"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* 技能网格 */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* 搜索框 */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="搜索技能..."
            className={cn(
              'w-full',
              'bg-bg-tertiary',
              'text-text-primary',
              'placeholder:text-text-tertiary',
              'border border-border-default',
              'rounded-lg',
              'px-3 py-2',
              'text-sm',
              'focus:outline-none focus:border-accent-primary'
            )}
          />
        </div>

        {/* 分类标签 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {['全部', '搜索', '代码', '文件', '分析'].map((tag) => (
            <button
              key={tag}
              className={cn(
                'px-2 py-1',
                'text-xs',
                'rounded',
                tag === '全部'
                  ? 'bg-accent-primary text-white'
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary',
                'transition-colors'
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* 技能网格 */}
        <div className="grid grid-cols-3 gap-3">
          {skills.map((skill) => (
            <button
              key={skill.id}
              className={cn(
                'aspect-square',
                'flex flex-col items-center justify-center',
                'glass',
                'rounded-lg',
                'hover:bg-bg-tertiary',
                'transition-all',
                'hover:scale-105',
                'group'
              )}
            >
              <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                {skill.icon}
              </span>
              <span className="text-xs text-text-secondary group-hover:text-text-primary">
                {skill.name}
              </span>
            </button>
          ))}
        </div>

        {children}
      </div>

      {/* 底部状态栏 */}
      <div className="border-t border-border-default p-3">
        <div className="text-xs text-text-secondary text-center">
          <p>已安装 {skills.length} 个技能</p>
        </div>
      </div>
    </div>
  );
};

export default ToolPanel;
