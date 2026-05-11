/**
 * 布局相关 Hook
 */

import { useEffect, useCallback } from 'react';
import { useLayoutStore } from '@/stores/layoutStore';
import { MIN_WINDOW_WIDTH, MIN_WINDOW_HEIGHT } from '@/constants/layout';

export function useLayout() {
  const {
    navigationExpanded,
    toolExpanded,
    screenMode,
    windowWidth,
    windowHeight,
    toggleNavigation,
    toggleTool,
    setNavigationExpanded,
    setToolExpanded,
    updateScreenMode,
  } = useLayoutStore();

  // 监听窗口尺寸变化
  useEffect(() => {
    const handleResize = () => {
      updateScreenMode(window.innerWidth, window.innerHeight);
    };

    // 初始化
    handleResize();

    // 添加监听器
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScreenMode]);

  // 计算实际面板宽度
  const getNavigationWidth = useCallback(() => {
    return navigationExpanded ? 240 : 60;
  }, [navigationExpanded]);

  const getToolWidth = useCallback(() => {
    return toolExpanded ? 300 : 0;
  }, [toolExpanded]);

  // 计算中央区域宽度
  const getCenterWidth = useCallback(() => {
    return windowWidth - getNavigationWidth() - getToolWidth();
  }, [windowWidth, getNavigationWidth, getToolWidth]);

  return {
    // 状态
    navigationExpanded,
    toolExpanded,
    screenMode,
    windowWidth,
    windowHeight,
    
    // Actions
    toggleNavigation,
    toggleTool,
    setNavigationExpanded,
    setToolExpanded,
    
    // Computed
    navigationWidth: getNavigationWidth(),
    toolWidth: getToolWidth(),
    centerWidth: getCenterWidth(),
  };
}

export default useLayout;
