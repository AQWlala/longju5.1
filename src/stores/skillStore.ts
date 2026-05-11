/**
 * 技能状态管理 Store
 */

import { create } from 'zustand';
import type { Skill, SkillResult, SkillCategory } from '@/types/skill';

interface SkillStore {
  // State
  skills: Skill[];
  activeCategory: SkillCategory | 'all';
  searchQuery: string;
  executingSkillId: string | null;

  // Computed
  filteredSkills: Skill[];

  // Actions
  loadSkills: (skills: Skill[]) => void;
  executeSkill: (skillId: string) => Promise<SkillResult>;
  updateSkillStatus: (skillId: string, status: Skill['status']) => void;
  setActiveCategory: (category: SkillCategory | 'all') => void;
  setSearchQuery: (query: string) => void;
  getSkillById: (skillId: string) => Skill | undefined;
}

export const useSkillStore = create<SkillStore>((set, get) => ({
  skills: [],
  activeCategory: 'all',
  searchQuery: '',
  executingSkillId: null,
  filteredSkills: [],

  loadSkills: (skills: Skill[]) => {
    set({ skills });
    get().setSearchQuery(get().searchQuery);
  },

  executeSkill: async (skillId: string): Promise<SkillResult> => {
    const startTime = Date.now();
    set({ executingSkillId: skillId });
    
    try {
      // 更新状态为运行中
      get().updateSkillStatus(skillId, 'running');
      
      // TODO: 调用实际的技能执行API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const result: SkillResult = {
        skillId,
        status: 'success',
        output: '执行成功',
        duration: Date.now() - startTime,
        timestamp: new Date(),
      };
      
      // 更新状态为成功
      get().updateSkillStatus(skillId, 'success');
      
      return result;
    } catch (error) {
      const result: SkillResult = {
        skillId,
        status: 'error',
        error: String(error),
        duration: Date.now() - startTime,
        timestamp: new Date(),
      };
      
      // 更新状态为错误
      get().updateSkillStatus(skillId, 'error');
      
      return result;
    } finally {
      set({ executingSkillId: null });
    }
  },

  updateSkillStatus: (skillId: string, status: Skill['status']) => {
    set((state) => ({
      skills: state.skills.map((s) =>
        s.id === skillId
          ? { ...s, status, lastExecuted: new Date() }
          : s
      ),
    }));
    get().setSearchQuery(get().searchQuery);
  },

  setActiveCategory: (category: SkillCategory | 'all') => {
    set({ activeCategory: category });
    get().setSearchQuery(get().searchQuery);
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    
    const state = get();
    
    let filteredSkills = state.skills;
    
    // 分类过滤
    if (state.activeCategory !== 'all') {
      filteredSkills = filteredSkills.filter(
        (s) => s.category === state.activeCategory
      );
    }
    
    // 搜索过滤
    if (query) {
      filteredSkills = filteredSkills.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    set({ filteredSkills });
  },

  getSkillById: (skillId: string) => {
    return get().skills.find((s) => s.id === skillId);
  },
}));

export default useSkillStore;
