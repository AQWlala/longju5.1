/**
 * 自动滚动 Hook
 */

import { useEffect, useRef, useCallback } from 'react';

interface UseAutoScrollOptions {
  threshold?: number; // 距离底部的阈值
  smooth?: boolean; // 是否平滑滚动
}

export function useAutoScroll(options: UseAutoScrollOptions = {}) {
  const { threshold = 100, smooth = true } = options;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);
  const scrollPositionRef = useRef(0);

  // 检查是否在底部附近
  const isNearBottom = useCallback(() => {
    const container = containerRef.current;
    if (!container) return false;
    
    const { scrollTop, scrollHeight, clientHeight } = container;
    return scrollHeight - scrollTop - clientHeight < threshold;
  }, [threshold]);

  // 滚动到底部
  const scrollToBottom = useCallback(() => {
    const container = containerRef.current;
    if (!container || !shouldAutoScrollRef.current) return;
    
    container.scrollTo({
      top: container.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, [smooth]);

  // 处理滚动事件
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // 保存滚动位置
    scrollPositionRef.current = container.scrollTop;
    
    // 如果用户向上滚动，停止自动滚动
    // 如果用户滚动到底部，恢复自动滚动
    shouldAutoScrollRef.current = isNearBottom();
  }, [isNearBottom]);

  // 恢复滚动位置
  const restoreScrollPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.scrollTop = scrollPositionRef.current;
  }, []);

  // 监听滚动
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    containerRef,
    scrollToBottom,
    restoreScrollPosition,
    shouldAutoScroll: shouldAutoScrollRef.current,
  };
}

export default useAutoScroll;
