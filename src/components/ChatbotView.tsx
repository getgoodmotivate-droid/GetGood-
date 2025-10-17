import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Zap } from 'lucide-react';
import { UserData } from '../types';
import { ChatMessage, FitnessCoachBot, getWelcomeMessage } from '../utils/chatbot';

interface ChatbotViewProps {
  userData: UserData;
}

export const ChatbotView: React.FC<ChatbotViewProps> = ({ userData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([getWelcomeMessage(userData)]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbot = new FitnessCoachBot(userData);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      const response = chatbot.getResponse(messageText);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = chatbot.getQuickActions();

  return (
    <div className="min-h-screen p-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto animate-fade-in flex flex-col" style={{ height: 'calc(100vh - 8rem)' }}>
        {/* Header */}
        <div className="glass-effect rounded-2xl md:rounded-3xl p-4 md:p-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="w-10 h-10 md:w-12 md:h-12 text-primary-400" />
              <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">AI Fitness Coach</h1>
              <p className="text-sm text-slate-300">Your personal training assistant</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(action)}
                className="glass-effect px-4 py-2 rounded-full text-sm whitespace-nowrap hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 text-primary-400" />
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 glass-effect rounded-2xl p-4 md:p-6 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-slide-in-up ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center ${
                message.role === 'user' 
                  ? 'bg-primary-500' 
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <Bot className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`flex-1 max-w-[80%] ${
                message.role === 'user' ? 'text-right' : ''
              }`}>
                <div className={`inline-block p-3 md:p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-primary-500 text-white rounded-tr-sm'
                    : 'glass-effect rounded-tl-sm'
                }`}>
                  <p className="text-sm md:text-base whitespace-pre-line">{message.content}</p>
                </div>
                <p className="text-xs text-slate-500 mt-1 px-2">
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-slide-in-up">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className="glass-effect p-4 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="glass-effect rounded-2xl p-3 md:p-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about fitness..."
            className="flex-1 bg-transparent text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            className="btn-primary px-4 md:px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Suggestions */}
        <div className="text-center mt-3 text-xs text-slate-500">
          Try: "How am I doing?" • "Give me motivation" • "Tips for push-ups"
        </div>
      </div>
    </div>
  );
};

