"use client"

import { Brain, Zap, CheckCircle, RotateCcw, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface AgentStructureProps {
  onStartChat: () => void
}

export default function AgentStructure({ onStartChat }: AgentStructureProps) {
  const techStack = [
    { name: "LangChain", description: "The backbone that connects reasoning and tools" },
    { name: "LangGraph", description: "Enables modular, dynamic workflows" },
    { name: "LangSmith", description: "For debugging and fine-tuning" },
    { name: "FastAPI", description: "Powers deployment with speed and reliability" },
    { name: "GPT-4o-mini", description: "Ensures high performance with minimal latency" },
  ]

  const tools = [
    {
      icon: Brain,
      title: "Context Presence Judge",
      description:
        "Detects whether the user provided background information and helps Kairos decide when to ask for more context.",
    },
    {
      icon: Zap,
      title: "Web Search Tool",
      description:
        "Searches the internet for up-to-date data when needed, preventing outdated or fabricated responses.",
    },
    {
      icon: CheckCircle,
      title: "Context Relevance Checker",
      description:
        "Evaluates whether the generated answer truly matches the user's question for coherence and factual consistency.",
    },
    {
      icon: RotateCcw,
      title: "Memory Module",
      description: "Remembers what you've said across the conversation, giving Kairos continuity and personalization.",
    },
  ]

  const differences = [
    "Built entirely with free open-source tools",
    "Dynamic, not static. Adapts its reasoning based on your context",
    "Smarter decisions. Blends logic, memory, and relevance checking",
    "Continuously aware. Always learning from each interaction",
  ]

  return (
    <section id="structure" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            The Structure Behind Kairos
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Kairos isn't just another chatbot — it's a context-aware AI agent built entirely with open-source
            technologies and designed for precision, memory, and dynamic decision-making.
          </p>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Image src="/kairo-logo.png" alt="Kairo" width={32} height={32} className="rounded-lg" />
            <h3 className="font-display text-2xl font-bold text-slate-900">Built on a Smart Foundation</h3>
          </div>
          <p className="text-slate-600 mb-8 max-w-2xl">Kairos is powered by a lightweight yet powerful stack:</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-xl border border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:bg-blue-50 animate-slide-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <h4 className="font-bold text-sm text-slate-900 mb-2">{tech.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Tools Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <Image src="/kairo-logo.png" alt="Kairo" width={32} height={32} className="rounded-lg" />
            <h3 className="font-display text-2xl font-bold text-slate-900">Core Intelligence Tools</h3>
          </div>
          <p className="text-slate-600 mb-8 max-w-2xl">
            Kairos relies on four interconnected tools that make it context-aware and trustworthy:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, i) => {
              const Icon = tool.icon
              return (
                <div
                  key={i}
                  className="group relative p-6 bg-white rounded-2xl border border-blue-100 hover:border-blue-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
                      <Icon size={24} className="text-white" />
                    </div>
                    <h4 className="font-bold text-base text-slate-900 mb-2">{tool.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{tool.description}</p>
                    <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full w-0 group-hover:w-12 transition-all duration-300"></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Why Different Section */}
        <div className="py-16 px-8 bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 rounded-2xl border border-blue-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Image src="/kairo-logo.png" alt="Kairo" width={40} height={40} className="rounded-lg" />
              <h3 className="font-display text-3xl font-bold text-slate-900">Why Kairos Is Different</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {differences.map((diff, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-xl border border-blue-200 hover:border-blue-400 transition-all duration-300 animate-slide-up flex items-start gap-4 shadow-sm hover:shadow-md"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <p className="text-slate-700 font-medium">{diff}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                onClick={onStartChat}
                className="px-10 py-7 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                Start Chatting Now <ArrowRight size={22} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
