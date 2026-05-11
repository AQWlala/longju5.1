/**
 * 技能管理 Hook
 */

import { useCallback } from 'react';
import { useSkillStore } from '@/stores/skillStore';
import type { SkillCategory } from '@/types/skill';

export function useSkills() {
  const {
    skills,
    activeCategory,
    searchQuery,
    executingSkillId,
    filteredSkills,
    loadSkills,
    executeSkill,
    updateSkillStatus,
    setActiveCategory,
    setSearchQuery,
    getSkillById,
  } = useSkillStore();

  // 执行技能
  const handleExecuteSkill = useCallback(
    async (skillId: string, input?: string) => {
      try {
        const result = await executeSkill(skillId);
        
        if (result.status === 'success') {
          console.log('Skill executed successfully:', result.output);
        } else {
          console.error('Skill execution failed:', result.error);
        }
        
        return result;
      } catch (error) {
        console.error('Skill execution error:', error);
        throw error;
      }
    },
    [executeSkill]
  );

  // 过滤技能
  const filterSkills = useCallback(
    (category: SkillCategory | 'all', query: string) => {
      setActiveCategory(category);
      setSearchQuery(query);
    },
    [setActiveCategory, setSearchQuery]
  );

  // 获取正在执行的技能
  const getExecutingSkill = useCallback(() => {
    if (!executingSkillId) return null;
    return getSkillById(executingSkillId);
  }, [executingSkillId, getSkillById]);

  return {
    // 状态
    skills,
    activeCategory,
    searchQuery,
    executingSkillId,
    executingSkill: getExecutingSkill(),
    filteredSkills,
    
    // Actions
    loadSkills,
    executeSkill: handleExecuteSkill,
    updateSkillStatus,
    setActiveCategory,
    setSearchQuery,
    filterSkills,
    getSkillById,
  };
}

export default useSkills;
