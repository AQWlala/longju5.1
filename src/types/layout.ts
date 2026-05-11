/**
 * 布局相关类型定义
 */

export type ScreenMode = 'wide' | 'standard' | 'narrow';

export interface LayoutState {
  navigationExpanded: boolean; // 左侧导航是否展开
  toolExpanded: boolean; // 右侧工具栏是否展开
  screenMode: ScreenMode;
  windowWidth: number;
  windowHeight: number;
}

/**
 * 根据窗口宽度计算屏幕模式
 */
export function calculateScreenMode(width: number): ScreenMode {
  if (width >= 1920) return 'wide';
  if (width >= 1024) return 'standard';
  return 'narrow';
}

/**
 * 判断是否应该自动收起导航栏
 */
export function shouldAutoCollapseNavigation(screenMode: ScreenMode): boolean {
  return screenMode === 'narrow';
}

/**
 * 判断是否应该自动收起工具栏
 */
export function shouldAutoCollapseTool(screenMode: ScreenMode): boolean {
  return screenMode === 'narrow' || screenMode === 'standard';
}
