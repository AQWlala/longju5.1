/**
 * 日期处理工具
 */

/**
 * 格式化时间 (HH:mm)
 */
export function formatTime(date: Date | string | number): string {
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

/**
 * 格式化日期 (YYYY-MM-DD)
 */
export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const day = d.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 格式化日期时间 (YYYY-MM-DD HH:mm)
 */
export function formatDateTime(date: Date | string | number): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

/**
 * 相对时间描述
 */
export function formatRelativeTime(date: Date | string | number): string {
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return '刚刚';
  if (minutes < 60) return `${minutes}分钟前`;
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;
  
  return formatDate(date);
}

/**
 * 按时间段分组
 */
export type DateGroup = 'today' | 'yesterday' | 'thisWeek' | 'earlier';

export function groupDatesByPeriod(date: Date | string | number): DateGroup {
  const now = new Date();
  const d = new Date(date);
  
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  if (d >= today) return 'today';
  if (d >= yesterday) return 'yesterday';
  if (d >= weekAgo) return 'thisWeek';
  return 'earlier';
}

/**
 * 获取日期分组标题
 */
export function getDateGroupLabel(group: DateGroup): string {
  const labels: Record<DateGroup, string> = {
    today: '今天',
    yesterday: '昨天',
    thisWeek: '本周',
    earlier: '更早',
  };
  return labels[group];
}

/**
 * 计算日期差（天数）
 */
export function calculateDaysDiff(date1: Date | string | number, date2: Date | string | number): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diff = Math.abs(d1.getTime() - d2.getTime());
  return Math.floor(diff / (24 * 60 * 60 * 1000));
}
