"use client"

import { useState } from "react"
import { CyberHeader } from "@/components/cyber-header"
import { VisualizerPortal } from "@/components/visualizer-portal"
import { CyberResults } from "@/components/cyber-results"
import { AdminPanel } from "@/components/admin-panel"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Lock, Shield, Zap, Eye, Users } from "lucide-react"

type AnalysisResult = "authentic" | "suspicious" | "deepfake"
type FileType = "image" | "video" | "audio"

export default function Home() {
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [showDetailedResults, setShowDetailedResults] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [confidence, setConfidence] = useState(0)
  const [analyzedFileName, setAnalyzedFileName] = useState("")
  const [analyzedFileType, setAnalyzedFileType] = useState<FileType>("image")

  const handleAdminLogin = () => {
    if (adminPassword === "pratyaksh2024") {
      setIsAdminAuthenticated(true)
      setShowAdminLogin(false)
      setLoginError("")
    } else {
      setLoginError("ACCESS DENIED - INVALID CREDENTIALS")
    }
  }

  const handleBackToMain = () => {
    setIsAdminAuthenticated(false)
  }

  const handleAnalysisComplete = (result: AnalysisResult, confidenceScore: number, fileType: FileType) => {
    setAnalysisResult(result)
    setConfidence(confidenceScore)
    setAnalyzedFileType(fileType)
    setAnalyzedFileName("sample-media.mp4") // This would come from the actual file
    setShowDetailedResults(true)
  }

  const handleNewAnalysis = () => {
    setShowDetailedResults(false)
    setAnalysisResult(null)
    setConfidence(0)
    setAnalyzedFileName("")
  }

  if (isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-cyber-bg-primary">
        <CyberHeader onAdminClick={() => setShowAdminLogin(true)} />
        <main className="pt-24 p-6">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-card/40 backdrop-blur-xl border border-cyber-glow-primary/30">
              <div className="p-8">
                <AdminPanel onBack={handleBackToMain} />
              </div>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cyber-bg-primary relative overflow-hidden">
      <CyberHeader onAdminClick={() => setShowAdminLogin(true)} />

      <main className="pt-24 p-6 relative z-10">
        <div className="container mx-auto">
          {!showDetailedResults ? (
            <div className="max-w-5xl mx-auto space-y-16">
              {/* Hero Section with Cyber Aesthetics */}
              <div className="text-center space-y-12">
                <div className="space-y-6">
                  <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white font-mono tracking-wider leading-tight">
                    PRATYAKSH AI
                  </h1>
                  <div className="cyber-glow-border bg-cyber-bg-card/30 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto">
                    <p className="text-xl text-cyber-glow-secondary font-mono tracking-wide mb-3">
                      A.I. INTEGRITY PROTOCOL
                    </p>
                    <p className="text-cyber-text-secondary font-mono leading-relaxed">
                      ADVANCED NEURAL MATRIX FOR DEEPFAKE DETECTION & MEDIA AUTHENTICITY VERIFICATION
                    </p>
                  </div>
                </div>

                {/* Enhanced Feature Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="cyber-glow-border bg-cyber-bg-card/20 backdrop-blur-sm rounded-xl p-6 hover:bg-cyber-glow-primary/5 transition-all duration-300 group">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 rounded-full bg-cyber-glow-primary/20 group-hover:bg-cyber-glow-primary/30 transition-colors">
                        <Shield className="w-6 h-6 text-cyber-glow-primary" />
                      </div>
                    </div>
                    <h3 className="font-bold text-cyber-text-primary font-mono mb-2">MULTI-AI ANALYSIS</h3>
                    <p className="text-sm text-cyber-text-secondary font-mono">
                      Ensemble neural networks with 98.7% accuracy rate
                    </p>
                  </div>

                  <div className="cyber-glow-border bg-cyber-bg-card/20 backdrop-blur-sm rounded-xl p-6 hover:bg-cyber-glow-primary/5 transition-all duration-300 group">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 rounded-full bg-cyber-glow-primary/20 group-hover:bg-cyber-glow-primary/30 transition-colors">
                        <Zap className="w-6 h-6 text-cyber-glow-primary" />
                      </div>
                    </div>
                    <h3 className="font-bold text-cyber-text-primary font-mono mb-2">REAL-TIME PROCESSING</h3>
                    <p className="text-sm text-cyber-text-secondary font-mono">
                      Sub-second analysis with quantum acceleration
                    </p>
                  </div>

                  <div className="cyber-glow-border bg-cyber-bg-card/20 backdrop-blur-sm rounded-xl p-6 hover:bg-cyber-glow-primary/5 transition-all duration-300 group">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-3 rounded-full bg-cyber-glow-primary/20 group-hover:bg-cyber-glow-primary/30 transition-colors">
                        <Eye className="w-6 h-6 text-cyber-glow-primary" />
                      </div>
                    </div>
                    <h3 className="font-bold text-cyber-text-primary font-mono mb-2">SECURE & PRIVATE</h3>
                    <p className="text-sm text-cyber-text-secondary font-mono">
                      Zero-knowledge processing with end-to-end encryption
                    </p>
                  </div>
                </div>

                {/* System Status */}
                <div className="flex justify-center items-center space-x-8 text-sm font-mono">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyber-authentic rounded-full animate-pulse"></div>
                    <span className="text-cyber-text-secondary">NEURAL_MATRIX_ONLINE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-cyber-glow-primary rounded-full animate-pulse"></div>
                    <span className="text-cyber-text-secondary">QUANTUM_CORES_ACTIVE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-cyber-glow-primary" />
                    <span className="text-cyber-text-secondary">1,247 ANALYSES_TODAY</span>
                  </div>
                </div>
              </div>

              {/* Visualizer Portal */}
              <VisualizerPortal onAnalysisComplete={handleAnalysisComplete} />
            </div>
          ) : (
            analysisResult && (
              <CyberResults
                result={analysisResult}
                confidence={confidence}
                fileType={analyzedFileType}
                fileName={analyzedFileName}
                onNewAnalysis={handleNewAnalysis}
              />
            )
          )}
        </div>
      </main>

      {/* Admin Login Modal with Cyber Styling */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-cyber-bg-primary/90 backdrop-blur-xl flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-card/40 backdrop-blur-xl border border-cyber-glow-primary/30">
            <div className="p-8 space-y-6">
              <div className="flex items-center space-x-4 text-center justify-center">
                <div className="cyber-portal p-3 rounded-full">
                  <Lock className="w-6 h-6 text-cyber-glow-primary" />
                </div>
                <h3 className="text-xl font-bold text-cyber-glow-primary font-mono">ADMIN ACCESS</h3>
              </div>
              <div className="space-y-4">
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
                  placeholder="ENTER SECURITY CODE"
                  className="w-full px-4 py-3 bg-cyber-bg-card/50 border border-cyber-glow-primary/30 rounded-lg focus:ring-2 focus:ring-cyber-glow-primary/50 focus:outline-none placeholder-cyber-text-secondary text-cyber-text-primary font-mono"
                />
                {loginError && (
                  <p className="text-sm text-cyber-deepfake font-mono font-bold">{loginError}</p>
                )}
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleAdminLogin}
                  className="flex-1 cyber-glow-border bg-cyber-glow-primary/20 hover:bg-cyber-glow-primary/30 text-cyber-glow-primary font-mono"
                >
                  AUTHENTICATE
                </Button>
                <Button
                  onClick={() => {
                    setShowAdminLogin(false)
                    setAdminPassword("")
                    setLoginError("")
                  }}
                  className="flex-1 cyber-glow-border bg-transparent text-cyber-text-secondary hover:bg-cyber-glow-primary/10 font-mono"
                >
                  ABORT
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
