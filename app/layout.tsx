import type React from "react"
import type { Metadata } from "next"
import { Space_Mono } from "next/font/google"
import "./globals.css"

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
})

export const metadata: Metadata = {
  title: "PRATYAKSH AI - AI Deepfake Detection Matrix",
  description:
    "Advanced neural network system for deepfake detection using quantum-accelerated AI analysis. Upload media files to verify authenticity with 98.7% accuracy.",
  generator: "Pratyaksh AI",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#00ffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceMono.className} ${spaceMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
