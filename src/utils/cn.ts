/**
 * 类名合并工具 - 基于clsx实现
 */

type ClassValue = string | number | boolean | undefined | null | ClassValue[] | { [key: string]: any };

function clsx(...args: ClassValue[]): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === 'string' || typeof arg === 'number') {
      classes.push(String(arg));
    } else if (Array.isArray(arg)) {
      const inner = clsx(...arg);
      if (inner) classes.push(inner);
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}

/**
 * 合并类名（支持Tailwind CSS）
 * @example cn('px-4 py-2', isActive && 'bg-blue-500', { 'text-white': isActive })
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}

export default cn;
