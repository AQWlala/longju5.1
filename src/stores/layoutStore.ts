/**
 * 布局状态管理 Store
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LayoutState, ScreenMode } from '@/types/layout';
import { calculateScreenMode, shouldAutoCollapseNavigation, shouldAutoCollapseTool } from '@/types/layout';
import { MIN_WINDOW_WIDTH, MIN_WINDOW_HEIGHT } from '@/constants/layout';

interface LayoutStore extends LayoutState {
  // Actions
  toggleNavigation: () => void;
  toggleTool: () => void;
  setNavigationExpanded: (expanded: boolean) => void;
  setToolExpanded: (expanded: boolean) => void;
  updateScreenMode: (width: number, height: number) => void;
  reset: () => void;
}

const initialState: LayoutState = {
  navigationExpanded: true,
  toolExpanded: false,
  screenMode: 'standard',
  windowWidth: 1280,
  windowHeight: 720,
};

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      toggleNavigation: () => {
        set((state) => ({
          navigationExpanded: !state.navigationExpanded,
        }));
      },

      toggleTool: () => {
        set((state) => ({
          toolExpanded: !state.toolExpanded,
        }));
      },

      setNavigationExpanded: (expanded: boolean) => {
        set({ navigationExpanded: expanded });
      },

      setToolExpanded: (expanded: boolean) => {
        set({ toolExpanded: expanded });
      },

      updateScreenMode: (width: number, height: number) => {
        const screenMode = calculateScreenMode(width);
        const currentState = get();
        
        // 限制最小窗口尺寸
        const clampedWidth = Math.max(width, MIN_WINDOW_WIDTH);
        const clampedHeight = Math.max(height, MIN_WINDOW_HEIGHT);
        
        const updates: Partial<LayoutState> = {
          windowWidth: clampedWidth,
          windowHeight: clampedHeight,
          screenMode,
        };

        // 自动折叠逻辑
        if (shouldAutoCollapseNavigation(screenMode) && currentState.navigationExpanded) {
          updates.navigationExpanded = false;
        }
        
        if (shouldAutoCollapseTool(screenMode) && currentState.toolExpanded) {
          updates.toolExpanded = false;
        }

        set(updates);
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'longju-layout',
      partialize: (state) => ({
        navigationExpanded: state.navigationExpanded,
        toolExpanded: state.toolExpanded,
      }),
    }
  )
);

export default useLayoutStore;
