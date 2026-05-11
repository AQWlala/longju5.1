/**
 * 会话管理 Hook
 */

import { useCallback } from 'react';
import { useSessionStore } from '@/stores/sessionStore';
import type { Session } from '@/types/session';

export function useSession() {
  const {
    sessions,
    currentSessionId,
    searchQuery,
    isLoading,
    error,
    filteredSessions,
    sessionGroups,
    loadSessions,
    createSession,
    deleteSession,
    switchSession,
    updateSession,
    setSearchQuery,
    setLoading,
    setError,
    getCurrentSession,
  } = useSessionStore();

  // 创建新会话
  const handleCreateSession = useCallback(async () => {
    try {
      setLoading(true);
      
      // TODO: 调用运行时API创建会话
      const newSession: Session = {
        id: `session-${Date.now()}`,
        title: '新对话',
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 0,
      };
      
      createSession(newSession);
      
      return newSession;
    } catch (err) {
      setError(err instanceof Error ? err.message : '创建会话失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [createSession, setLoading, setError]);

  // 删除会话
  const handleDeleteSession = useCallback(
    async (sessionId: string) => {
      try {
        setLoading(true);
        
        // TODO: 调用运行时API删除会话
        deleteSession(sessionId);
      } catch (err) {
        setError(err instanceof Error ? err.message : '删除会话失败');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [deleteSession, setLoading, setError]
  );

  // 切换会话
  const handleSwitchSession = useCallback(
    (sessionId: string) => {
      // TODO: 保存当前会话状态
      switchSession(sessionId);
    },
    [switchSession]
  );

  return {
    // 状态
    sessions,
    currentSessionId,
    currentSession: getCurrentSession(),
    searchQuery,
    isLoading,
    error,
    filteredSessions,
    sessionGroups,
    
    // Actions
    loadSessions,
    createSession: handleCreateSession,
    deleteSession: handleDeleteSession,
    switchSession: handleSwitchSession,
    updateSession,
    setSearchQuery,
    setLoading,
    setError,
  };
}

export default useSession;
