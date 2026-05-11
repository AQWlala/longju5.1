/**
 * Token状态管理 Store
 */

import { create } from 'zustand';
import type { TokenStatus, WarningLevel } from '@/types/token';
import { createTokenStatus } from '@/types/token';
import { TOKEN_UPDATE_INTERVAL } from '@/constants/layout';

interface TokenStore {
  // State
  tokenStatus: TokenStatus;
  isMonitoring: boolean;
  updateInterval: NodeJS.Timeout | null;

  // Actions
  updateTokenStatus: (used: number, total: number) => void;
  setWarningLevel: (level: WarningLevel) => void;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  reset: () => void;
}

const initialTokenStatus: TokenStatus = {
  used: 0,
  total: 100000,
  percentage: 0,
  warningLevel: 'normal',
};

export const useTokenStore = create<TokenStore>((set, get) => ({
  tokenStatus: initialTokenStatus,
  isMonitoring: false,
  updateInterval: null,

  updateTokenStatus: (used: number, total: number) => {
    const tokenStatus = createTokenStatus(used, total);
    set({ tokenStatus });
  },

  setWarningLevel: (level: WarningLevel) => {
    set((state) => ({
      tokenStatus: {
        ...state.tokenStatus,
        warningLevel: level,
      },
    }));
  },

  startMonitoring: () => {
    const state = get();
    if (state.isMonitoring) return;

    // 这里可以集成实际的API调用
    const interval = setInterval(() => {
      // TODO: 调用运行时API获取Token状态
      console.log('Token monitoring tick');
    }, TOKEN_UPDATE_INTERVAL);

    set({ isMonitoring: true, updateInterval: interval });
  },

  stopMonitoring: () => {
    const state = get();
    if (state.updateInterval) {
      clearInterval(state.updateInterval);
    }
    set({ isMonitoring: false, updateInterval: null });
  },

  reset: () => {
    const state = get();
    if (state.updateInterval) {
      clearInterval(state.updateInterval);
    }
    set({
      tokenStatus: initialTokenStatus,
      isMonitoring: false,
      updateInterval: null,
    });
  },
}));

export default useTokenStore;
