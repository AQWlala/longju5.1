/**
 * 对话管理 Hook
 */

import { useCallback, useRef } from 'react';
import { useConversationStore } from '@/stores/conversationStore';
import type { Message, MessageRole } from '@/types/message';

export function useConversation() {
  const {
    messages,
    scrollPosition,
    inputContent,
    isProcessing,
    isStreaming,
    error,
    loadConversation,
    addMessage,
    updateMessage,
    deleteMessage,
    clearMessages,
    setScrollPosition,
    setInputContent,
    setProcessing,
    setStreaming,
    setError,
  } = useConversationStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 发送消息
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isProcessing) return;

      try {
        setProcessing(true);

        // 添加用户消息
        const userMessage: Message = {
          id: `msg-${Date.now()}`,
          role: 'user' as MessageRole,
          content: content.trim(),
          timestamp: new Date(),
        };
        
        addMessage(userMessage);
        setInputContent('');

        // TODO: 调用运行时API发送消息并接收响应
        // 模拟AI响应
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const assistantMessage: Message = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant' as MessageRole,
          content: '这是一条模拟的AI响应消息。',
          timestamp: new Date(),
        };
        
        addMessage(assistantMessage);
      } catch (err) {
        setError(err instanceof Error ? err.message : '发送消息失败');
      } finally {
        setProcessing(false);
      }
    },
    [isProcessing, addMessage, setInputContent, setProcessing, setError]
  );

  // 自动滚动到底部
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // 处理流式消息
  const handleStreamingMessage = useCallback(
    (chunk: string) => {
      // TODO: 实现流式消息处理
      console.log('Streaming chunk:', chunk);
    },
    []
  );

  return {
    // 状态
    messages,
    scrollPosition,
    inputContent,
    isProcessing,
    isStreaming,
    error,
    messagesEndRef,
    
    // Actions
    loadConversation,
    addMessage,
    updateMessage,
    deleteMessage,
    clearMessages,
    setScrollPosition,
    setInputContent,
    sendMessage,
    scrollToBottom,
    handleStreamingMessage,
  };
}

export default useConversation;
