/**
 * 文件相关类型定义
 */

export type FileType = 'code' | 'markdown' | 'image' | 'document' | 'data' | 'other';

export interface FilePreview {
  id: string;
  filename: string;
  path: string;
  type: FileType;
  size: number;
  content?: string; // 文件内容(文本文件)
  url?: string; // 文件URL(图片等)
  language?: string; // 代码语言
}

export interface FileStats {
  size: number;
  created: Date | string;
  modified: Date | string;
  type: FileType;
}

/**
 * 检测文件类型
 */
export function detectFileType(filename: string): FileType {
  const ext = filename.split('.').pop()?.toLowerCase();
  
  if (!ext) return 'other';
  
  const codeExtensions = ['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'c', 'go', 'rs', 'rb'];
  const markdownExtensions = ['md', 'markdown'];
  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'];
  const documentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
  const dataExtensions = ['json', 'yaml', 'yml', 'xml', 'csv', 'toml'];
  
  if (codeExtensions.includes(ext)) return 'code';
  if (markdownExtensions.includes(ext)) return 'markdown';
  if (imageExtensions.includes(ext)) return 'image';
  if (documentExtensions.includes(ext)) return 'document';
  if (dataExtensions.includes(ext)) return 'data';
  
  return 'other';
}

/**
 * 判断是否为代码文件
 */
export function isCodeFile(filename: string): boolean {
  return detectFileType(filename) === 'code';
}

/**
 * 判断是否为Markdown文件
 */
export function isMarkdownFile(filename: string): boolean {
  return detectFileType(filename) === 'markdown';
}

/**
 * 判断是否为图片文件
 */
export function isImageFile(filename: string): boolean {
  return detectFileType(filename) === 'image';
}
