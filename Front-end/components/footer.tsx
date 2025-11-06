"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const teamMembers = [
    {
      name: "Raghad Mohamed",
      role: "AI Engineer",
      linkedin: "https://www.linkedin.com/in/raghad-mohamed-012867293/",
      image: "/Raghad.jpg", 
    },
    {
      name: "Abdelrahman Elaraby",
      role: "ML/AI Engineer",
      linkedin: "https://www.linkedin.com/in/abdelrahman-elaraby",
      image: "/Abdelrahman.jpg", 
    },
  ]

  return (
    <footer id="contact" className="bg-gradient-to-b from-[#0A1A3F] to-[#132B5C]">
      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-[#E8EAF6] mb-4">Meet the Team Behind Kairo</h2>
          <p className="text-[#B0B4D9] text-lg">
            Developed with passion and precision by the creators of Kairo — your context-aware AI assistant.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group bg-gradient-to-br from-[#1a2a5c]/70 to-[#0f1f3f]/70 border-2 border-[#3b5bdb]/50 rounded-2xl p-12 text-center hover:border-[#5b7fff]/80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 animate-slide-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-32 h-32 mx-auto mb-8 relative">
                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6] to-[#0ea5e9] rounded-full opacity-75 blur-md group-hover:blur-lg transition-all group-hover:scale-110" />
                
                {/* Profile Image */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#E8EAF6]/30">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-[#E8EAF6] mb-2">{member.name}</h3>
              <p className="text-[#B0B4D9] mb-8 text-lg">{member.role}</p>

              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#3b5bdb]/40 hover:bg-[#5b7fff]/60 border border-[#3b5bdb]/30 hover:border-[#5b7fff] transition-all text-[#E8EAF6] hover:text-white hover:shadow-lg hover:shadow-blue-400/30"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.437-.103.25-.129.599-.129.948v5.42h-3.554s.035-8.087 0-8.929h3.554v1.26c.391-.603 1.093-1.463 2.662-1.463 1.942 0 3.399 1.269 3.399 3.998v5.134zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.956.77-1.71 1.944-1.71 1.172 0 1.915.754 1.938 1.71 0 .951-.766 1.71-1.967 1.71zm1.581 11.597H3.715V8.523h3.203v11.929zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#3b5bdb]/40 to-transparent mb-8" />

        {/* Credits Section */}
        <div className="bg-gradient-to-br from-[#1a2a5c]/40 to-[#0f1f3f]/40 border border-[#3b5bdb]/20 rounded-xl p-8 md:p-12 text-center animate-slide-up">
          <p className="text-[#E8EAF6] text-lg mb-4">
            This project was completed under the supervision of{" "}
            <a
              href="https://linkedin.com/company/cellula"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5b9fff] hover:text-[#7bb7ff] underline underline-offset-2 transition-colors inline-flex items-center gap-2 group"
            >
              Cellula Company
              <svg
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.437-.103.25-.129.599-.129.948v5.42h-3.554s.035-8.087 0-8.929h3.554v1.26c.391-.603 1.093-1.463 2.662-1.463 1.942 0 3.399 1.269 3.399 3.998v5.134zM5.337 8.855c-1.144 0-1.915-.759-1.915-1.71 0-.956.77-1.71 1.944-1.71 1.172 0 1.915.754 1.938 1.71 0 .951-.766 1.71-1.967 1.71zm1.581 11.597H3.715V8.523h3.203v11.929zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>{" "}
            as part of our internship program.
          </p>
          <p className="text-[#B0B4D9] text-sm">
            Special thanks to our mentors and the Cellula team for their guidance and support.
          </p>
          <div className="border-t border-[#3b5bdb]/20 mt-6 pt-6">
            <p className="text-[#B0B4D9] text-sm opacity-80">
              © 2025 Kairo AI Agent. All rights reserved to the creators and Cellula Company.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
