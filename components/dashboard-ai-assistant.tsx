'use client';

import { useState } from 'react';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';

export function DashboardAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: string; text: string; isUser: boolean }>>([
    {
      id: '1',
      text: 'Hi! I\'m your AI assistant. How can I help you today?',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');

  const quickActions = [
    'Help me optimize my portfolio',
    "What's missing in my portfolio?",
    'Suggest improvements',
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now().toString(), text, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: 'I\'ve analyzed your portfolio. Here are some suggestions: ...',
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);

    setInput('');
  };

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-cyan-DEFAULT to-secondary rounded-full flex items-center justify-center text-deep-bg shadow-lg hover:scale-110 transition-all duration-300 z-50 group animate-pulse"
        >
          <Sparkles className="w-7 h-7 group-hover:rotate-360" />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-screen md:h-96 md:max-h-96 neu-card rounded-lg flex flex-col shadow-2xl z-50 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-DEFAULT to-secondary rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-deep-bg" />
              </div>
              <h3 className="font-semibold text-foreground">AI Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-deep-card rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 1 && (
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleSendMessage(action)}
                    className="w-full p-3 text-left text-sm text-foreground bg-deep-card hover:bg-deep-card/80 rounded-lg transition-colors border border-border hover:border-cyan-DEFAULT"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-cyan-DEFAULT text-deep-bg rounded-br-none'
                      : 'bg-deep-card text-foreground rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(input);
                  }
                }}
                placeholder="Ask me anything..."
                className="flex-1 bg-deep-card rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-cyan-DEFAULT transition-all"
              />
              <button
                onClick={() => handleSendMessage(input)}
                className="w-10 h-10 bg-cyan-DEFAULT rounded-lg flex items-center justify-center text-deep-bg hover:scale-105 transition-transform"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
