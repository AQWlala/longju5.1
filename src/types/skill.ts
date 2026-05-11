/**
 * 技能相关类型定义
 */

export type SkillStatus = 'idle' | 'running' | 'success' | 'error';
export type SkillCategory = 'search' | 'code' | 'file' | 'analysis' | 'other';

export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: string; // 图标名称
  category: SkillCategory;
  status: SkillStatus;
  lastExecuted?: Date | string;
  executionCount: number;
}

export interface SkillResult {
  skillId: string;
  status: 'success' | 'error';
  output?: string;
  error?: string;
  duration: number; // 执行时长(毫秒)
  timestamp: Date | string;
}

export interface SkillExecutionOptions {
  skillId: string;
  input?: string;
  timeout?: number;
  onProgress?: (progress: number) => void;
}

/**
 * 类型守卫 - 验证Skill对象
 */
export function validateSkill(data: unknown): data is Skill {
  if (typeof data !== 'object' || data === null) return false;
  
  const skill = data as Partial<Skill>;
  return (
    typeof skill.id === 'string' &&
    typeof skill.name === 'string' &&
    typeof skill.description === 'string' &&
    typeof skill.icon === 'string' &&
    typeof skill.category === 'string' &&
    typeof skill.status === 'string' &&
    typeof skill.executionCount === 'number'
  );
}
