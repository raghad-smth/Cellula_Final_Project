"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroProps {
  onStartChat: () => void
}

export default function Hero({ onStartChat }: HeroProps) {
  return (
    <section id="features" className="relative pt-20 pb-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        
       <Sparkles size={20} className="text-blue-600" />
        <h3
          className="font-display text-5xl md:text-7xl font-bold mb-6 animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">
            Meet Kairos — your context-aware AI assistant
          </span>
          
        </h3>

        <p
          className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          An intelligent companion that tracks your conversation, understands your intent, and delivers final answers
          that truly align with your goals.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: "300ms" }}
        >
          <Button
            onClick={onStartChat}
            className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            Chat with Kairos <ArrowRight size={20} />
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-20 max-w-2xl mx-auto">
          {[
            { value: "24/7", label: "Availability" },
            { value: "~0.6s", label: "Response time" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, i) => (
            <div key={i} className="animate-slide-up" style={{ animationDelay: `${400 + i * 100}ms` }}>
              <div className="text-2xl md:text-3xl font-display font-bold text-blue-600">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}

        </div>
        <div
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12 animate-slide-up"
          style={{ animationDelay: "250ms" }}
        >
        <div> </div>
         <div> </div>
          <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 hover:border-blue-400 transition-all">
            <div className="font-semibold text-blue-900 mb-2">Never lose track of context</div>
            <p className="text-sm text-blue-700">
              Kairos remembers everything you say and uses it to inform the next move.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 hover:border-blue-400 transition-all">
            <div className="font-semibold text-blue-900 mb-2">Ensures relevance</div>
            <p className="text-sm text-blue-700">
              Before giving you an answer, Kairos checks whether it actually answers your initial query — no more
              off-target responses.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 hover:border-blue-400 transition-all">
            <div className="font-semibold text-blue-900 mb-2">Powered by advanced reasoning</div>
            <p className="text-sm text-blue-700">
              Real-time web search and advanced reasoning to scour the web for up-to-date information with clarity and
              confidence.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 hover:border-blue-400 transition-all">
            <div className="font-semibold text-blue-900 mb-2">Built to be reliable</div>
            <p className="text-sm text-blue-700">
              Always on-call and ready to assist, your intelligent partner for research, investigation, or simply
              getting things done.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
