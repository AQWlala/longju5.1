/**
 * 虚拟滚动 Hook
 */

import { useRef, useCallback, useState } from 'react';

interface UseVirtualScrollOptions {
  itemCount: number;
  itemHeight: number;
  overscan?: number;
  containerHeight: number;
}

interface VirtualScrollResult {
  startIndex: number;
  endIndex: number;
  visibleItems: number[];
  totalHeight: number;
  offsetY: number;
  onScroll: (scrollTop: number) => void;
}

export function useVirtualScroll(options: UseVirtualScrollOptions): VirtualScrollResult {
  const { itemCount, itemHeight, overscan = 3, containerHeight } = options;
  
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = itemCount * itemHeight;
  
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    itemCount - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );
  
  const visibleItems = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, i) => startIndex + i
  );
  
  const offsetY = startIndex * itemHeight;

  const onScroll = useCallback((newScrollTop: number) => {
    setScrollTop(newScrollTop);
  }, []);

  return {
    startIndex,
    endIndex,
    visibleItems,
    totalHeight,
    offsetY,
    onScroll,
  };
}

export default useVirtualScroll;
