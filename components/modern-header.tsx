"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Settings, User, Shield, LogOut } from "lucide-react"

interface ModernHeaderProps {
  onAdminClick: () => void
}

export function ModernHeader({ onAdminClick }: ModernHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-card/80 border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-foreground">DeepMind Sentinel</h1>
              <p className="text-sm text-muted-foreground">A.I. Integrity Shield</p>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onAdminClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              Admin
            </Button>
            
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-1"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>

              {showUserMenu && (
                <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">Guest User</p>
                    <p className="text-xs text-muted-foreground">guest@deepmind.ai</p>
                  </div>
                  <div className="p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-muted-foreground hover:text-foreground"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}