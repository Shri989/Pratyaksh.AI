"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  Upload, 
  FileImage, 
  FileVideo, 
  FileAudio, 
  AlertCircle, 
  Loader2, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  Eye,
  Shield
} from "lucide-react"

type FileType = "image" | "video" | "audio"
type AnalysisState = "idle" | "uploading" | "analyzing" | "scanning" | "completed"
type AnalysisResult = "authentic" | "suspicious" | "deepfake"

interface VisualizerPortalProps {
  onAnalysisComplete?: (result: AnalysisResult, confidence: number, fileType: FileType) => void
}

export function VisualizerPortal({ onAnalysisComplete }: VisualizerPortalProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle")
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [confidence, setConfidence] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [particles, setParticles] = useState<Array<{ id: number; delay: number }>>([])
  const [scanningProgress, setScanningProgress] = useState(0)
  const portalRef = useRef<HTMLDivElement>(null)

  const getFileType = (file: File): FileType => {
    if (file.type.startsWith("image/")) return "image"
    if (file.type.startsWith("video/")) return "video"
    if (file.type.startsWith("audio/")) return "audio"
    return "image"
  }

  const validateFile = (file: File): string | null => {
    const maxSizes = {
      image: 10 * 1024 * 1024,
      video: 100 * 1024 * 1024,
      audio: 50 * 1024 * 1024,
    }

    const allowedTypes = [
      "image/jpeg", "image/png", "image/webp",
      "video/mp4", "video/quicktime", "video/webm",
      "audio/mpeg", "audio/wav", "audio/mp3"
    ]

    if (!allowedTypes.includes(file.type)) {
      return "UNSUPPORTED FILE TYPE. PROTOCOL ACCEPTS: JPG, PNG, WEBP, MP4, MOV, WEBM, MP3, WAV"
    }

    const fileType = getFileType(file)
    if (file.size > maxSizes[fileType]) {
      const maxMB = maxSizes[fileType] / (1024 * 1024)
      return `FILE SIZE EXCEEDS LIMIT. MAXIMUM ${maxMB}MB FOR ${fileType.toUpperCase()} FILES.`
    }

    return null
  }

  const createParticles = () => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      delay: i * 200
    }))
    setParticles(newParticles)
  }

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return
    }

    setSelectedFile(file)
    setError(null)
    setResult(null)
    setProgress(0)
    createParticles()
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [])

  const simulateAnalysis = async () => {
    if (!selectedFile) return

    setAnalysisState("uploading")
    setProgress(0)

    // Upload phase
    for (let i = 0; i <= 20; i += 2) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    setAnalysisState("analyzing")

    // Analysis phase
    for (let i = 20; i <= 60; i += 5) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 150))
    }

    setAnalysisState("scanning")

    // Scanning phase with visual feedback
    for (let i = 60; i <= 100; i += 4) {
      setProgress(i)
      setScanningProgress(i - 60)
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    // Generate result
    const results: AnalysisResult[] = ["authentic", "suspicious", "deepfake"]
    const randomResult = results[Math.floor(Math.random() * results.length)]
    const randomConfidence = Math.floor(Math.random() * 30) + 70

    setResult(randomResult)
    setConfidence(randomConfidence)
    setAnalysisState("completed")
    onAnalysisComplete?.(randomResult, randomConfidence, getFileType(selectedFile))
  }

  const resetAnalysis = () => {
    setSelectedFile(null)
    setAnalysisState("idle")
    setProgress(0)
    setScanningProgress(0)
    setResult(null)
    setConfidence(0)
    setError(null)
    setParticles([])
  }

  const getResultIcon = () => {
    switch (result) {
      case "authentic":
        return <CheckCircle className="w-8 h-8 text-cyber-authentic" />
      case "suspicious":
        return <AlertTriangle className="w-8 h-8 text-cyber-suspicious" />
      case "deepfake":
        return <XCircle className="w-8 h-8 text-cyber-deepfake" />
      default:
        return null
    }
  }

  const getResultText = () => {
    switch (result) {
      case "authentic":
        return { title: "AUTHENTIC SIGNATURE VERIFIED", subtitle: "MEDIA INTEGRITY CONFIRMED" }
      case "suspicious":
        return { title: "ANOMALOUS PATTERNS DETECTED", subtitle: "MANUAL REVIEW REQUIRED" }
      case "deepfake":
        return { title: "SYNTHETIC MEDIA IDENTIFIED", subtitle: "DEEPFAKE PROTOCOL TRIGGERED" }
      default:
        return { title: "", subtitle: "" }
    }
  }

  const getResultColor = () => {
    switch (result) {
      case "authentic":
        return "text-cyber-authentic"
      case "suspicious":
        return "text-cyber-suspicious"
      case "deepfake":
        return "text-cyber-deepfake"
      default:
        return "text-cyber-text-primary"
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Main Visualizer Portal */}
      {analysisState === "idle" || analysisState === "uploading" ? (
        <Card className="bg-card/40 backdrop-blur-xl border border-cyber-glow-primary/30">
          <div className="p-12">
            <div
              ref={portalRef}
              className={`
                cyber-portal relative rounded-3xl p-16 text-center transition-all duration-500
                ${isDragOver 
                  ? "bg-cyber-glow-primary/20 border-cyber-glow-secondary" 
                  : selectedFile 
                    ? "bg-cyber-glow-primary/10 border-cyber-glow-primary" 
                    : "bg-cyber-bg-secondary/30 border-cyber-glow-primary/50"
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Particles Animation */}
              {particles.map((particle) => (
                <div
                  key={particle.id}
                  className="particle"
                  style={{
                    animationDelay: `${particle.delay}ms`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}

              <div className="space-y-6 relative z-10">
                {!selectedFile ? (
                  <>
                    <div className="mx-auto w-24 h-24 cyber-glow-border rounded-full flex items-center justify-center bg-cyber-glow-primary/10">
                      <Upload className="w-12 h-12 text-cyber-glow-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-cyber-text-primary font-mono mb-3">
                        VISUALIZER PORTAL
                      </h3>
                      <p className="text-cyber-text-secondary font-mono mb-6 tracking-wide">
                        INITIALIZE MEDIA INGESTION PROTOCOL
                      </p>
                      <Button
                        onClick={() => document.getElementById("file-input")?.click()}
                        className="cyber-glow-border bg-cyber-glow-primary/20 hover:bg-cyber-glow-primary/30 text-cyber-glow-primary font-mono tracking-wider"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        ACTIVATE PORTAL
                      </Button>
                    </div>
                    <div className="text-sm text-cyber-text-secondary font-mono tracking-wider">
                      COMPATIBLE FORMATS: JPG • PNG • WEBP • MP4 • MOV • WEBM • MP3 • WAV
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-4">
                      {getFileType(selectedFile) === "image" && <FileImage className="w-10 h-10 text-cyber-glow-primary" />}
                      {getFileType(selectedFile) === "video" && <FileVideo className="w-10 h-10 text-cyber-glow-primary" />}
                      {getFileType(selectedFile) === "audio" && <FileAudio className="w-10 h-10 text-cyber-glow-primary" />}
                      <div className="text-left">
                        <p className="font-bold text-cyber-text-primary font-mono">{selectedFile.name}</p>
                        <p className="text-sm text-cyber-text-secondary font-mono">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {getFileType(selectedFile).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    
                    {analysisState === "idle" && (
                      <div className="flex space-x-4">
                        <Button 
                          onClick={simulateAnalysis} 
                          className="cyber-glow-border bg-cyber-authentic/20 hover:bg-cyber-authentic/30 text-cyber-authentic font-mono"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          INITIATE SCAN
                        </Button>
                        <Button 
                          onClick={resetAnalysis} 
                          variant="outline"
                          className="cyber-glow-border bg-transparent text-cyber-text-secondary hover:bg-cyber-glow-primary/10 font-mono"
                        >
                          PURGE DATA
                        </Button>
                      </div>
                    )}

                    {analysisState === "uploading" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-3">
                          <Loader2 className="w-6 h-6 animate-spin text-cyber-glow-primary" />
                          <span className="text-cyber-glow-primary font-mono">UPLOADING TO NEURAL MATRIX...</span>
                        </div>
                        <Progress value={progress} className="w-full h-2 bg-cyber-bg-secondary" />
                        <p className="text-sm text-cyber-text-secondary font-mono">{progress}% COMPLETE</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <input
                id="file-input"
                type="file"
                accept="image/*,video/*,audio/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileSelect(file)
                }}
              />
            </div>

            {error && (
              <div className="mt-6 p-4 bg-cyber-deepfake/10 border border-cyber-deepfake/30 rounded-lg flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-cyber-deepfake" />
                <p className="text-cyber-deepfake font-mono font-bold">{error}</p>
              </div>
            )}
          </div>
        </Card>
      ) : null}

      {/* Analysis Progress with Scanning Visual */}
      {(analysisState === "analyzing" || analysisState === "scanning") && (
        <Card className="bg-card/40 backdrop-blur-xl border border-cyber-glow-primary/30">
          <div className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-cyber-glow-primary font-mono mb-2">
                  {analysisState === "analyzing" ? "NEURAL ANALYSIS IN PROGRESS" : "DEEP SCAN PROTOCOL ACTIVE"}
                </h3>
                <p className="text-cyber-text-secondary font-mono">
                  {analysisState === "analyzing" 
                    ? "AI MODELS PROCESSING MEDIA DATA" 
                    : "PIXEL-LEVEL AUTHENTICITY VERIFICATION"
                  }
                </p>
              </div>

              {analysisState === "scanning" && selectedFile && (
                <div className="relative bg-cyber-bg-secondary/50 rounded-lg p-4 overflow-hidden">
                  <div className="scan-line"></div>
                  <div className="text-center">
                    <p className="text-cyber-glow-primary font-mono text-sm">SCANNING: {selectedFile.name}</p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Progress value={progress} className="w-full h-3 bg-cyber-bg-secondary" />
                <div className="flex justify-between text-sm font-mono">
                  <span className="text-cyber-text-secondary">{progress}% ANALYZED</span>
                  <span className="text-cyber-glow-primary">
                    {analysisState === "analyzing" ? "PROCESSING..." : "SCANNING..."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Results Preview */}
      {analysisState === "completed" && result && (
        <Card className="bg-card/40 backdrop-blur-xl border border-cyber-glow-primary/30">
          <div className="p-8">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-4">
                {getResultIcon()}
                <div>
                  <h2 className={`text-2xl font-bold ${getResultColor()} font-mono`}>
                    {getResultText().title}
                  </h2>
                  <p className="text-cyber-text-secondary font-mono">
                    {getResultText().subtitle}
                  </p>
                </div>
              </div>

              <div className="bg-cyber-bg-secondary/50 rounded-lg p-4 max-w-xs mx-auto">
                <p className="text-sm text-cyber-text-secondary font-mono mb-1">CONFIDENCE LEVEL</p>
                <p className={`text-4xl font-bold ${getResultColor()} font-mono`}>
                  {confidence}%
                </p>
              </div>

              <Button 
                onClick={resetAnalysis} 
                className="cyber-glow-border bg-transparent text-cyber-glow-primary hover:bg-cyber-glow-primary/10 font-mono"
              >
                <Shield className="w-4 h-4 mr-2" />
                NEW ANALYSIS
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}