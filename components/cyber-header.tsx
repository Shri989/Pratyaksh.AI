"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, User, Shield, LogOut, Zap } from "lucide-react"

interface CyberHeaderProps {
  onAdminClick: () => void
}

export function CyberHeader({ onAdminClick }: CyberHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <>
      {/* Cyber Grid Background */}
      <div className="cyber-grid-bg"></div>
      
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-card/60 border-b border-cyber-glow-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand with Cyber Glow */}
            <div className="flex items-center space-x-4">
              <div className="cyber-portal p-3 rounded-lg flex-shrink-0">
                <Shield className="w-8 h-8 text-cyber-glow-primary" />
              </div>
              <div className="flex flex-col min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-wider truncate">
                  PRATYAKSH AI
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 font-mono tracking-widest whitespace-nowrap overflow-hidden">
                  A.I. INTEGRITY PROTOCOL
                </p>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyber-authentic rounded-full animate-pulse"></div>
                <span className="text-xs text-cyber-text-secondary font-mono">SYSTEM ONLINE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-cyber-glow-primary" />
                <span className="text-xs text-cyber-text-secondary font-mono">AI READY</span>
              </div>
            </div>

            {/* User Controls */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onAdminClick}
                className="cyber-glow-border bg-transparent text-cyber-glow-primary hover:bg-cyber-glow-primary/10 font-mono"
              >
                <Settings className="w-4 h-4 mr-2" />
                ADMIN
              </Button>
              
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-1 cyber-glow-border rounded-full"
                >
                  <Avatar className="w-8 h-8 border-2 border-cyber-glow-primary">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-cyber-bg-card text-cyber-glow-primary font-mono">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>

                {showUserMenu && (
                  <div className="absolute right-0 top-12 w-56 bg-card/90 backdrop-blur-xl border border-cyber-glow-primary/30 rounded-xl shadow-xl overflow-hidden">
                    <div className="p-4 border-b border-cyber-glow-primary/20 bg-cyber-bg-secondary/50">
                      <p className="text-sm font-medium text-cyber-text-primary font-mono">GUEST USER</p>
                      <p className="text-xs text-cyber-text-secondary font-mono">guest@deepmind.protocol</p>
                    </div>
                    <div className="p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-cyber-text-secondary hover:text-cyber-glow-primary hover:bg-cyber-glow-primary/10 font-mono"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        DISCONNECT
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}