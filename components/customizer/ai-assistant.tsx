'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Send, X, Lightbulb, Wand2, Palette, Layout, Code, Image, Mic, MicOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEditorStore } from '@/store/editor-store'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: string[]
}

const quickActions = [
  { icon: Layout, label: 'Improve Layout', prompt: 'Suggest layout improvements for my portfolio' },
  { icon: Palette, label: 'Color Scheme', prompt: 'Suggest a professional color scheme' },
  { icon: Wand2, label: 'Add Animation', prompt: 'Add smooth animations to my sections' },
  { icon: Code, label: 'Optimize Code', prompt: 'Optimize the code structure' },
  { icon: Image, label: 'Image Tips', prompt: 'Give me tips for portfolio images' },
]

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "👋 Hi! I'm your AI portfolio assistant. I can help you with design suggestions, code optimization, content ideas, and more. What would you like to work on?",
      timestamp: new Date(),
      suggestions: ['Improve my hero section', 'Suggest color palette', 'Add animations'],
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { addHistoryEntry } = useEditorStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (content: string = input) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you want to ${content.toLowerCase()}. Here are my suggestions:\n\n1. Use a consistent color scheme throughout\n2. Add smooth scroll animations\n3. Optimize images for web performance\n4. Use clear, readable typography\n\nWould you like me to apply any of these changes?`,
        timestamp: new Date(),
        suggestions: ['Apply all changes', 'Show me examples', 'Tell me more'],
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
      addHistoryEntry('AI suggestion applied')
    }, 1500)
  }

  const handleQuickAction = (prompt: string) => {
    handleSend(prompt)
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // Voice recognition logic would go here
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg hover:shadow-cyan-500/50 transition-shadow"
        data-tutorial="ai-assistant"
      >
        <Sparkles className="w-6 h-6 text-white" />
      </motion.button>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Powered by AI</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-3 border-b border-border bg-background/50">
              <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickAction(action.prompt)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent hover:bg-accent/80 text-xs whitespace-nowrap border border-border"
                  >
                    <action.icon className="w-3 h-3" />
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                          : 'bg-accent border border-border'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.suggestions && (
                        <div className="mt-2 space-y-1">
                          {message.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSend(suggestion)}
                              className="block w-full text-left text-xs px-2 py-1 rounded bg-background/50 hover:bg-background/80 transition-colors"
                            >
                              <Lightbulb className="w-3 h-3 inline mr-1" />
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-accent border border-border rounded-lg px-4 py-2">
                      <div className="flex gap-1">
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-current rounded-full"
                        />
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-current rounded-full"
                        />
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-current rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border bg-background/50">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                    placeholder="Ask me anything..."
                    className="min-h-[44px] max-h-32 resize-none pr-10"
                  />
                  <button
                    onClick={toggleVoiceInput}
                    className={`absolute right-2 top-2 p-1.5 rounded-lg transition-colors ${
                      isListening
                        ? 'bg-red-500 text-white'
                        : 'hover:bg-accent text-muted-foreground'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="h-11 w-11 p-0 bg-gradient-to-r from-cyan-500 to-purple-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                AI can make mistakes. Review important changes.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
