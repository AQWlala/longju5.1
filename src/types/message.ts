/**
 * 消息相关类型定义
 */

export type MessageRole = 'user' | 'assistant' | 'system';

export type ContentBlockType = 'text' | 'code' | 'image' | 'file';

export interface ContentBlock {
  type: ContentBlockType;
  content: string;
  language?: string; // 代码块语言
  filename?: string; // 文件名
  size?: number; // 文件大小
}

export interface Attachment {
  id: string;
  filename: string;
  size: number;
  type: string; // MIME类型
  url?: string; // 文件URL
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  contentBlocks?: ContentBlock[];
  attachments?: Attachment[];
  timestamp: Date | string;
  isStreaming?: boolean; // 是否正在流式输出
  error?: string; // 错误信息
}

export interface ConversationState {
  messages: Message[];
  scrollPosition: number;
  inputContent: string;
  isProcessing: boolean;
}

/**
 * 类型守卫 - 验证Message对象
 */
export function validateMessage(data: unknown): data is Message {
  if (typeof data !== 'object' || data === null) return false;
  
  const message = data as Partial<Message>;
  return (
    typeof message.id === 'string' &&
    (message.role === 'user' || message.role === 'assistant' || message.role === 'system') &&
    typeof message.content === 'string' &&
    (message.timestamp instanceof Date || typeof message.timestamp === 'string')
  );
}
