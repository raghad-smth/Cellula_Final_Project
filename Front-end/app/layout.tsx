import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Agent - Experience the Future",
  description: "Meet your intelligent AI agent powered by cutting-edge technology",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
        style={
          {
            "--font-space-grotesk": spaceGrotesk.style.fontFamily,
          } as React.CSSProperties
        }
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
