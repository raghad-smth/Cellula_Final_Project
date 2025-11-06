"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import AgentStructure from "@/components/agent-structure"
import RobotChat from "@/components/robot-chat"
import Footer from "@/components/footer"

export default function Home() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex flex-col">
      <Header />
      <div className="flex-1">
        {!showChat ? (
          <>
            <Hero onStartChat={() => setShowChat(true)} />
            <AgentStructure onStartChat={() => setShowChat(true)} />
          </>
        ) : (
          <RobotChat onClose={() => setShowChat(false)} />
        )}
      </div>
      <Footer />
    </div>
  )
}
