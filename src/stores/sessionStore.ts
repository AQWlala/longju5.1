/**
 * 会话状态管理 Store
 */

import { create } from 'zustand';
import type { Session, SessionGroup, SessionFilter } from '@/types/session';
import { groupDatesByPeriod, getDateGroupLabel } from '@/utils/date';

interface SessionStore {
  // State
  sessions: Session[];
  currentSessionId: string | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;

  // Computed
  filteredSessions: Session[];
  sessionGroups: SessionGroup[];

  // Actions
  loadSessions: (sessions: Session[]) => void;
  createSession: (session: Session) => void;
  deleteSession: (sessionId: string) => void;
  switchSession: (sessionId: string) => void;
  updateSession: (sessionId: string, updates: Partial<Session>) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getCurrentSession: () => Session | null;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  sessions: [],
  currentSessionId: null,
  searchQuery: '',
  isLoading: false,
  error: null,
  filteredSessions: [],
  sessionGroups: [],

  loadSessions: (sessions: Session[]) => {
    set({ sessions, isLoading: false, error: null });
    get().setSearchQuery(get().searchQuery); // 重新应用过滤
  },

  createSession: (session: Session) => {
    set((state) => {
      const sessions = [session, ...state.sessions];
      return {
        sessions,
        currentSessionId: session.id,
      };
    });
    get().setSearchQuery(get().searchQuery);
  },

  deleteSession: (sessionId: string) => {
    set((state) => {
      const sessions = state.sessions.filter((s) => s.id !== sessionId);
      const currentSessionId =
        state.currentSessionId === sessionId
          ? sessions[0]?.id || null
          : state.currentSessionId;
      
      return { sessions, currentSessionId };
    });
    get().setSearchQuery(get().searchQuery);
  },

  switchSession: (sessionId: string) => {
    set({ currentSessionId: sessionId });
  },

  updateSession: (sessionId: string, updates: Partial<Session>) => {
    set((state) => ({
      sessions: state.sessions.map((s) =>
        s.id === sessionId ? { ...s, ...updates } : s
      ),
    }));
    get().setSearchQuery(get().searchQuery);
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    
    const state = get();
    
    // 过滤会话
    const filteredSessions = query
      ? state.sessions.filter(
          (s) =>
            s.title.toLowerCase().includes(query.toLowerCase()) ||
            s.preview?.toLowerCase().includes(query.toLowerCase())
        )
      : state.sessions;
    
    // 按日期分组
    const groupMap = new Map<string, Session[]>();
    
    filteredSessions.forEach((session) => {
      const group = groupDatesByPeriod(session.updatedAt);
      const label = getDateGroupLabel(group);
      
      if (!groupMap.has(label)) {
        groupMap.set(label, []);
      }
      groupMap.get(label)!.push(session);
    });
    
    const sessionGroups = Array.from(groupMap.entries()).map(
      ([label, sessions]) => ({ label, sessions })
    );
    
    set({ filteredSessions, sessionGroups });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  getCurrentSession: () => {
    const state = get();
    return state.sessions.find((s) => s.id === state.currentSessionId) || null;
  },
}));

export default useSessionStore;
