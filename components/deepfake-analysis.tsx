"use client"

import { useState, useCallback } from "react"
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
  AlertTriangle
} from "lucide-react"

type FileType = "image" | "video" | "audio"
type AnalysisState = "idle" | "uploading" | "analyzing" | "completed"
type AnalysisResult = "authentic" | "suspicious" | "deepfake"

interface DeepfakeAnalysisProps {
  onAnalysisComplete?: (result: AnalysisResult, confidence: number) => void
}

export function DeepfakeAnalysis({ onAnalysisComplete }: DeepfakeAnalysisProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle")
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [confidence, setConfidence] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const getFileType = (file: File): FileType => {
    if (file.type.startsWith("image/")) return "image"
    if (file.type.startsWith("video/")) return "video"
    if (file.type.startsWith("audio/")) return "audio"
    return "image" // fallback
  }

  const validateFile = (file: File): string | null => {
    const maxSizes = {
      image: 10 * 1024 * 1024, // 10MB
      video: 100 * 1024 * 1024, // 100MB
      audio: 50 * 1024 * 1024, // 50MB
    }

    const allowedTypes = [
      "image/jpeg", "image/png", "image/webp",
      "video/mp4", "video/quicktime", "video/webm",
      "audio/mpeg", "audio/wav", "audio/mp3"
    ]

    if (!allowedTypes.includes(file.type)) {
      return "Unsupported file type. Please upload JPG, PNG, WebP, MP4, MOV, WebM, MP3, or WAV files."
    }

    const fileType = getFileType(file)
    if (file.size > maxSizes[fileType]) {
      const maxMB = maxSizes[fileType] / (1024 * 1024)
      return `File too large. Maximum size for ${fileType} files is ${maxMB}MB.`
    }

    return null
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
    setAnalysisState("uploading")
    setProgress(0)

    // Simulate upload progress
    for (let i = 0; i <= 30; i += 5) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    setAnalysisState("analyzing")

    // Simulate analysis progress
    for (let i = 30; i <= 100; i += 10) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    // Simulate random result
    const results: AnalysisResult[] = ["authentic", "suspicious", "deepfake"]
    const randomResult = results[Math.floor(Math.random() * results.length)]
    const randomConfidence = Math.floor(Math.random() * 30) + 70 // 70-99%

    setResult(randomResult)
    setConfidence(randomConfidence)
    setAnalysisState("completed")
    onAnalysisComplete?.(randomResult, randomConfidence)
  }

  const resetAnalysis = () => {
    setSelectedFile(null)
    setAnalysisState("idle")
    setProgress(0)
    setResult(null)
    setConfidence(0)
    setError(null)
  }

  const getResultIcon = () => {
    switch (result) {
      case "authentic":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "suspicious":
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />
      case "deepfake":
        return <XCircle className="w-6 h-6 text-red-500" />
      default:
        return null
    }
  }

  const getResultText = () => {
    switch (result) {
      case "authentic":
        return { title: "Authentic Content Detected", subtitle: "This media appears to be genuine" }
      case "suspicious":
        return { title: "Suspicious Elements Detected", subtitle: "Some irregularities found, requires review" }
      case "deepfake":
        return { title: "Deepfake Detected", subtitle: "This media appears to be artificially generated" }
      default:
        return { title: "", subtitle: "" }
    }
  }

  const getResultColor = () => {
    switch (result) {
      case "authentic":
        return "text-green-500"
      case "suspicious":
        return "text-yellow-500"
      case "deepfake":
        return "text-red-500"
      default:
        return "text-foreground"
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Area */}
      <Card className="bg-card border-border">
        <div className="p-8">
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
              ${isDragOver 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
              }
              ${selectedFile ? "border-primary bg-primary/5" : ""}
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              {!selectedFile ? (
                <>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Upload Media for Analysis
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop your file here, or click to browse
                    </p>
                    <Button
                      onClick={() => document.getElementById("file-input")?.click()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Browse Files
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Supports: JPG, PNG, WebP, MP4, MOV, WebM, MP3, WAV
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    {getFileType(selectedFile) === "image" && <FileImage className="w-8 h-8 text-primary" />}
                    {getFileType(selectedFile) === "video" && <FileVideo className="w-8 h-8 text-primary" />}
                    {getFileType(selectedFile) === "audio" && <FileAudio className="w-8 h-8 text-primary" />}
                    <div className="text-left">
                      <p className="font-medium text-foreground">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  {analysisState === "idle" && (
                    <div className="flex space-x-3">
                      <Button onClick={simulateAnalysis} className="bg-primary hover:bg-primary/90">
                        Start Analysis
                      </Button>
                      <Button onClick={resetAnalysis} variant="outline">
                        Remove
                      </Button>
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
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-destructive font-medium">{error}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Analysis Progress */}
      {(analysisState === "uploading" || analysisState === "analyzing") && (
        <Card className="bg-card border-border">
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {analysisState === "uploading" ? "Uploading..." : "Analyzing..."}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {analysisState === "uploading" 
                      ? "Uploading your file securely" 
                      : "Running AI analysis to detect deepfakes"
                    }
                  </p>
                </div>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground text-center">{progress}% Complete</p>
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      {analysisState === "completed" && result && (
        <Card className="bg-card border-border">
          <div className="p-8">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-3">
                {getResultIcon()}
                <div>
                  <h2 className={`text-2xl font-bold ${getResultColor()}`}>
                    {getResultText().title}
                  </h2>
                  <p className="text-muted-foreground">
                    {getResultText().subtitle}
                  </p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Confidence Score</p>
                <p className={`text-3xl font-bold ${getResultColor()}`}>
                  {confidence}%
                </p>
              </div>

              <Button onClick={resetAnalysis} variant="outline" className="w-full">
                Analyze Another File
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}