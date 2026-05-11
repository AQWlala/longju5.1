/**
 * 对话状态管理 Store
 */

import { create } from 'zustand';
import type { Message } from '@/types/message';

interface ConversationStore {
  // State
  messages: Message[];
  scrollPosition: number;
  inputContent: string;
  isProcessing: boolean;
  isStreaming: boolean;
  error: string | null;

  // Actions
  loadConversation: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  updateMessage: (messageId: string, updates: Partial<Message>) => void;
  deleteMessage: (messageId: string) => void;
  clearMessages: () => void;
  setScrollPosition: (position: number) => void;
  setInputContent: (content: string) => void;
  setProcessing: (processing: boolean) => void;
  setStreaming: (streaming: boolean) => void;
  setError: (error: string | null) => void;
}

export const useConversationStore = create<ConversationStore>((set, get) => ({
  messages: [],
  scrollPosition: 0,
  inputContent: '',
  isProcessing: false,
  isStreaming: false,
  error: null,

  loadConversation: (messages: Message[]) => {
    set({ messages, error: null });
  },

  addMessage: (message: Message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  updateMessage: (messageId: string, updates: Partial<Message>) => {
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === messageId ? { ...m, ...updates } : m
      ),
    }));
  },

  deleteMessage: (messageId: string) => {
    set((state) => ({
      messages: state.messages.filter((m) => m.id !== messageId),
    }));
  },

  clearMessages: () => {
    set({ messages: [], inputContent: '' });
  },

  setScrollPosition: (position: number) => {
    set({ scrollPosition: position });
  },

  setInputContent: (content: string) => {
    set({ inputContent: content });
  },

  setProcessing: (processing: boolean) => {
    set({ isProcessing: processing });
  },

  setStreaming: (streaming: boolean) => {
    set({ isStreaming: streaming });
  },

  setError: (error: string | null) => {
    set({ error });
  },
}));

export default useConversationStore;
