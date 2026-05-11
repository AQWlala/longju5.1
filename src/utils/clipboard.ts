/**
 * 剪贴板工具
 */

/**
 * 复制文本到剪贴板
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // 优先使用现代API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // 降级方案：使用document.execCommand
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    
    return success;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * 从剪贴板读取文本
 */
export async function readFromClipboard(): Promise<string> {
  try {
    if (navigator.clipboard && navigator.clipboard.readText) {
      return await navigator.clipboard.readText();
    }
    return '';
  } catch (error) {
    console.error('Failed to read from clipboard:', error);
    return '';
  }
}

/**
 * 检查剪贴板权限
 */
export async function checkClipboardPermission(): Promise<boolean> {
  try {
    if (!navigator.permissions) return true;
    
    const permission = await navigator.permissions.query({ name: 'clipboard-write' as PermissionName });
    return permission.state === 'granted';
  } catch (error) {
    // 不支持permissions API，假设有权限
    return true;
  }
}
