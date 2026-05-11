/**
 * 会话相关类型定义
 */

export interface Session {
  id: string;
  title: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  messageCount: number;
  preview?: string; // 最后一条消息预览
}

export interface SessionGroup {
  label: string;
  sessions: Session[];
}

export type SessionSortBy = 'updatedAt' | 'createdAt' | 'messageCount';
export type SessionSortOrder = 'asc' | 'desc';

export interface SessionFilter {
  searchQuery?: string;
  sortBy?: SessionSortBy;
  sortOrder?: SessionSortOrder;
}

/**
 * 类型守卫 - 验证Session对象
 */
export function validateSession(data: unknown): data is Session {
  if (typeof data !== 'object' || data === null) return false;
  
  const session = data as Partial<Session>;
  return (
    typeof session.id === 'string' &&
    typeof session.title === 'string' &&
    (session.createdAt instanceof Date || typeof session.createdAt === 'string') &&
    (session.updatedAt instanceof Date || typeof session.updatedAt === 'string') &&
    typeof session.messageCount === 'number'
  );
}

/**
 * 验证会话数据数组
 */
export function validateSessionData(data: unknown[]): Session[] {
  return data.filter(validateSession);
}
