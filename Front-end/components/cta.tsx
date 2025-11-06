"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CTAProps {
  onStartChat: () => void
}

export default function CTA({ onStartChat }: CTAProps) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 p-1">
          <div className="bg-white rounded-3xl p-12 md:p-16 text-center relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Ready to Experience the Future?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Start chatting with our AI agent now and discover what intelligent automation can do for you.
            </p>
            <Button
              onClick={onStartChat}
              className="px-10 py-7 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-bold flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all"
            >
              Start Chatting Now <ArrowRight size={22} />
            </Button>

            {/* Floating elements */}
            <div className="absolute top-6 left-6 w-20 h-20 bg-blue-100 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute bottom-6 right-6 w-32 h-32 bg-cyan-100 rounded-full opacity-30 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
