"use client"

import { useState, useRef, useEffect } from "react"
import { Send, X, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface RobotChatProps {
  onClose: () => void
}

export default function RobotChat({ onClose }: RobotChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI agent. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      })

      if (!response.ok) throw new Error("Backend error")

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "I'm sorry, I didn’t quite get that.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error communicating with backend:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Hmm, something went wrong connecting to the server. Please try again later.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 md:p-6">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>

      {/* Chat Window */}
      <div className="relative w-full max-w-2xl h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-t-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse-glow">
              <Image src="/kairo-logo.png" alt="Kairo" width={40} height={40} className="rounded-full" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white">AI Agent Assistant</h3>
              <p className="text-blue-100 text-sm">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/20 rounded-lg transition text-white">
              <Minimize2 size={20} />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition text-white">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-50 to-blue-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
            >
              {message.role === "assistant" ? (
                <div className="flex gap-3 max-w-xs">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <Image src="/kairo-logo.png" alt="Kairo" width={32} height={32} className="rounded-full" />
                  </div>
                  <div className="bg-white border border-blue-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                    <p className="text-slate-900">{message.content}</p>
                    <span className="text-xs text-slate-400 mt-2 block">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 max-w-xs">
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl rounded-tr-none px-4 py-3 shadow-lg">
                    <p className="text-white">{message.content}</p>
                    <span className="text-xs text-blue-100 mt-2 block">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 animate-slide-up">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <Image src="/kairo-logo.png" alt="Kairo" width={32} height={32} className="rounded-full" />
              </div>
              <div className="bg-white border border-blue-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-blue-100 p-4 bg-white rounded-b-2xl">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-semibold flex items-center gap-2"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
