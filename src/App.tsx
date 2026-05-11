/**
 * Longju 5.1 Desktop UI - 主应用
 */

import React from 'react';
import { MainLayout, NavigationPanel, InteractionArea, ToolPanel } from '@/components/layout';
import { useLayout } from '@/hooks/useLayout';
import { cn } from '@/utils/cn';

function App() {
  const { toolExpanded, toggleTool } = useLayout();

  return (
    <MainLayout>
      <NavigationPanel>
        {/* 会话列表示例 */}
        <div className="space-y-2">
          <div className="glass rounded-lg p-3 hover:bg-bg-tertiary transition-colors cursor-pointer">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-highlight-cyan mt-2" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate">React组件开发讨论</p>
                <p className="text-xs text-text-secondary mt-1">2小时前 · 12条消息</p>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-lg p-3 hover:bg-bg-tertiary transition-colors cursor-pointer">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-text-tertiary mt-2" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate">Python数据分析</p>
                <p className="text-xs text-text-secondary mt-1">昨天 · 45条消息</p>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-lg p-3 hover:bg-bg-tertiary transition-colors cursor-pointer">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full bg-text-tertiary mt-2" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary truncate">API设计最佳实践</p>
                <p className="text-xs text-text-secondary mt-1">3天前 · 28条消息</p>
              </div>
            </div>
          </div>
        </div>
      </NavigationPanel>

      <InteractionArea>
        <div className="h-full flex flex-col">
          {/* 消息列表示例 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* AI消息 */}
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full gradient-cyan-purple flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">AI</span>
              </div>
              <div className="flex-1">
                <div className="glass rounded-lg p-4">
                  <p className="text-text-primary text-sm leading-relaxed">
                    你好！我是Longju 5.1 AI助手。我可以帮助你进行代码开发、问题解答、文件操作等任务。
                    <br /><br />
                    🎨 这是一个深色主题的AI原生工作台，采用沉浸式极客设计风格。
                    <br /><br />
                    你可以尝试：
                  </p>
                  <ul className="text-text-secondary text-sm mt-2 space-y-1">
                    <li>• 点击左侧会话列表切换对话</li>
                    <li>• 使用右侧技能面板执行工具</li>
                    <li>• 在底部输入框发送消息</li>
                  </ul>
                </div>
                <p className="text-xs text-text-tertiary mt-1">10:30</p>
              </div>
            </div>

            {/* 用户消息 */}
            <div className="flex gap-3 justify-end animate-fade-in">
              <div className="flex-1 flex flex-col items-end">
                <div className="gradient-cyan-purple rounded-lg p-4 max-w-2xl">
                  <p className="text-white text-sm leading-relaxed">
                    帮我创建一个React按钮组件，支持多种变体样式。
                  </p>
                </div>
                <p className="text-xs text-text-tertiary mt-1">10:32</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">你</span>
              </div>
            </div>

            {/* AI响应消息 */}
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full gradient-cyan-purple flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">AI</span>
              </div>
              <div className="flex-1">
                <div className="glass rounded-lg p-4">
                  <p className="text-text-primary text-sm mb-3">
                    好的！这是一个支持多种变体的Button组件：
                  </p>
                  <div className="bg-bg-tertiary rounded-lg p-3 font-mono text-xs">
                    <pre className="text-highlight-cyan overflow-x-auto">{`<Button variant="primary">
  主要按钮
</Button>

<Button variant="gradient">
  渐变按钮
</Button>`}</pre>
                  </div>
                </div>
                <p className="text-xs text-text-tertiary mt-1">10:33</p>
              </div>
            </div>
          </div>

          {/* 工具栏切换按钮 */}
          {!toolExpanded && (
            <div className="absolute right-4 top-20">
              <button
                onClick={toggleTool}
                className={cn(
                  'p-2',
                  'glass',
                  'rounded-lg',
                  'text-text-secondary hover:text-text-primary',
                  'transition-colors'
                )}
                title="打开工具栏"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </InteractionArea>

      {toolExpanded && <ToolPanel />}
    </MainLayout>
  );
}

export default App;
