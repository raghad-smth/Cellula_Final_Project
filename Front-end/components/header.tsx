"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-blue-100">
      <nav className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/kairo-logo.png" alt="Kairo" width={56} height={56} className="rounded-lg" />
          <span className="font-display font-bold text-2xl" style={{ color: "#001f3f" }}>
            Kairo
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-slate-600 hover:text-blue-600 transition">
            Features
          </a>
          <a href="#structure" className="text-slate-600 hover:text-blue-600 transition">
            Structure
          </a>
          <a href="#contact" className="text-slate-600 hover:text-blue-600 transition">
            Contact
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-blue-50 rounded-lg">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="md:hidden border-t border-blue-100 p-4 space-y-4 animate-slide-up">
          <a href="#features" className="block text-slate-600 hover:text-blue-600">
            Features
          </a>
          <a href="#structure" className="block text-slate-600 hover:text-blue-600">
            Structure
          </a>
          <a href="#contact" className="block text-slate-600 hover:text-blue-600">
            Contact
          </a>
        </div>
      )}
    </header>
  )
}
