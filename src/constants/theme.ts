/**
 * 主题常量定义
 */

// 背景色
export const COLORS = {
  // 背景
  BG_PRIMARY: '#0F0F12',
  BG_SECONDARY: '#1A1A1F',
  BG_TERTIARY: '#25252B',
  BG_ELEVATED: '#2D2D35',
  
  // 文本
  TEXT_PRIMARY: '#EDEDED',
  TEXT_SECONDARY: '#A1A1AA',
  TEXT_TERTIARY: '#6E6E76',
  
  // 品牌色
  ACCENT_PRIMARY: '#6366F1',
  ACCENT_SECONDARY: '#818CF8',
  ACCENT_GLOW: 'rgba(99, 102, 241, 0.3)',
  
  // 高亮色
  HIGHLIGHT_CYAN: '#00FFC8',
  HIGHLIGHT_PURPLE: '#B04EFF',
  
  // 功能色
  SUCCESS: '#10B981',
  SUCCESS_LIGHT: '#34D399',
  WARNING: '#F59E0B',
  WARNING_LIGHT: '#FBBF24',
  ERROR: '#EF4444',
  ERROR_LIGHT: '#F87171',
  INFO: '#3B82F6',
  INFO_LIGHT: '#60A5FA',
} as const;

// 字体
export const FONTS = {
  UI: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  MONO: '"JetBrains Mono", "Fira Code", Consolas, Monaco, monospace',
} as const;

// 动画时长
export const DURATIONS = {
  INSTANT: 50,
  FAST: 150,
  NORMAL: 200,
  SLOW: 300,
  SLOWER: 500,
} as const;

// 圆角
export const RADII = {
  NONE: 0,
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  '2XL': 24,
  FULL: 9999,
} as const;
