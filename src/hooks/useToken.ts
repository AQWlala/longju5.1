/**
 * Token监控 Hook
 */

import { useEffect } from 'react';
import { useTokenStore } from '@/stores/tokenStore';

export function useToken() {
  const {
    tokenStatus,
    isMonitoring,
    updateTokenStatus,
    setWarningLevel,
    startMonitoring,
    stopMonitoring,
    reset,
  } = useTokenStore();

  // 自动启动监控
  useEffect(() => {
    startMonitoring();
    
    return () => {
      stopMonitoring();
    };
  }, [startMonitoring, stopMonitoring]);

  // 检查是否应该限制输入
  const shouldLimitInput = () => {
    return tokenStatus.warningLevel === 'critical';
  };

  // 获取警告消息
  const getWarningMessage = () => {
    switch (tokenStatus.warningLevel) {
      case 'critical':
        return 'Token已用完，请等待重置或升级配额';
      case 'warning':
        return `Token使用超过80% (${tokenStatus.percentage.toFixed(1)}%)`;
      default:
        return null;
    }
  };

  // 获取进度条颜色
  const getProgressColor = () => {
    switch (tokenStatus.warningLevel) {
      case 'critical':
        return '#EF4444'; // error
      case 'warning':
        return '#F59E0B'; // warning
      default:
        return '#00FFC8'; // cyan
    }
  };

  return {
    // 状态
    tokenStatus,
    isMonitoring,
    
    // Actions
    updateTokenStatus,
    setWarningLevel,
    startMonitoring,
    stopMonitoring,
    reset,
    
    // Computed
    shouldLimitInput: shouldLimitInput(),
    warningMessage: getWarningMessage(),
    progressColor: getProgressColor(),
  };
}

export default useToken;
