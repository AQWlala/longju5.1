/**
 * Token状态相关类型定义
 */

export type WarningLevel = 'normal' | 'warning' | 'critical';

export interface TokenStatus {
  used: number; // 已使用Token数
  total: number; // 总Token数
  percentage: number; // 使用百分比
  warningLevel: WarningLevel;
  remainingRequests?: number; // 剩余请求次数
  resetAt?: Date | string; // 重置时间
}

/**
 * 计算Token使用百分比
 */
export function calculatePercentage(used: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(100, (used / total) * 100);
}

/**
 * 获取警告级别
 */
export function getWarningLevel(percentage: number): WarningLevel {
  if (percentage >= 95) return 'critical';
  if (percentage >= 80) return 'warning';
  return 'normal';
}

/**
 * 创建Token状态
 */
export function createTokenStatus(used: number, total: number): TokenStatus {
  const percentage = calculatePercentage(used, total);
  return {
    used,
    total,
    percentage,
    warningLevel: getWarningLevel(percentage),
  };
}
