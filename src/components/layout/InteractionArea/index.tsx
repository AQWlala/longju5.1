/**
 * InteractionArea - 中央交互区
 * 包含：消息列表、输入区域、Token监控条
 */

import React from 'react';
import { cn } from '@/utils/cn';

interface InteractionAreaProps {
  children?: React.ReactNode;
  className?: string;
}

export const InteractionArea: React.FC<InteractionAreaProps> = ({ 
  children,
  className = '' 
}) => {
  return (
    <div 
      className={cn(
        'flex flex-col h-full',
        'bg-bg-primary',
        className
      )}
    >
      {/* 顶部Token监控条 */}
      <div className={cn(
        'flex-shrink-0',
        'px-4 py-2',
        'bg-bg-secondary',
        'border-b border-border-default',
        'flex items-center justify-between'
      )}>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>就绪</span>
        </div>
        
        <div className="flex items-center gap-4 text-xs">
          <span className="text-text-secondary">
            Token: <span className="text-highlight-cyan">0</span> / 100,000
          </span>
          <span className="text-text-secondary">
            请求: <span className="text-highlight-cyan">0</span>
          </span>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="flex-1 overflow-hidden">
        {children || (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="glass p-8 rounded-xl max-w-md">
                <h2 className="text-2xl font-semibold text-gradient-cyan-purple mb-4">
                  欢迎使用 Longju 5.1
                </h2>
                <p className="text-text-secondary mb-6">
                  AI原生工作台，沉浸式极客体验
                </p>
                <div className="text-sm text-text-tertiary">
                  <p>🎨 深色主题设计</p>
                  <p>⚡ 高性能交互</p>
                  <p>🤖 智能对话体验</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部输入区域 */}
      <div className={cn(
        'flex-shrink-0',
        'p-4',
        'bg-bg-secondary',
        'border-t border-border-default'
      )}>
        <div className="glass rounded-xl p-3">
          <div className="flex items-end gap-3">
            {/* 输入框 */}
            <div className="flex-1">
              <textarea
                placeholder="输入消息... (Shift+Enter换行，Enter发送)"
                className={cn(
                  'w-full',
                  'bg-bg-tertiary',
                  'text-text-primary',
                  'placeholder:text-text-tertiary',
                  'border border-border-default',
                  'rounded-lg',
                  'px-4 py-3',
                  'resize-none',
                  'focus:outline-none focus:border-accent-primary focus:ring-2 focus:ring-accent-primary focus:ring-opacity-20',
                  'transition-all'
                )}
                rows={1}
                style={{ maxHeight: '200px' }}
              />
            </div>
            
            {/* 发送按钮 */}
            <button
              className={cn(
                'flex-shrink-0',
                'p-3',
                'gradient-cyan-purple',
                'rounded-lg',
                'hover:opacity-90 transition-opacity',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          
          {/* 快捷操作 */}
          <div className="flex items-center gap-2 mt-2 text-xs text-text-tertiary">
            <button className="hover:text-text-secondary transition-colors">
              📎 附件
            </button>
            <button className="hover:text-text-secondary transition-colors">
              🖼️ 截图
            </button>
            <button className="hover:text-text-secondary transition-colors">
              🎤 语音
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionArea;
