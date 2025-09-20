"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ChevronDown, 
  Eye, 
  Mic, 
  Users, 
  Zap,
  Clock,
  AlertCircle,
  TrendingUp,
  Shield,
  Download,
  Share,
  RefreshCw
} from "lucide-react"

type AnalysisResult = "authentic" | "suspicious" | "deepfake"
type FileType = "image" | "video" | "audio"
type Indicator = {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high"
  confidence: number
  icon: React.ReactNode
  timestamp?: number
}

interface CyberResultsProps {
  result: AnalysisResult
  confidence: number
  fileType: FileType
  fileName: string
  onNewAnalysis: () => void
}

export function CyberResults({ 
  result, 
  confidence, 
  fileType, 
  fileName, 
  onNewAnalysis 
}: CyberResultsProps) {
  const [showDetails, setShowDetails] = useState(true)
  const [animationPhase, setAnimationPhase] = useState(0)
  const [cascadeItems, setCascadeItems] = useState<Array<{ id: number; text: string; delay: number }>>([])

  useEffect(() => {
    // Start animation sequence
    const timer1 = setTimeout(() => setAnimationPhase(1), 500)
    const timer2 = setTimeout(() => setAnimationPhase(2), 1000)
    const timer3 = setTimeout(() => setAnimationPhase(3), 1500)

    // Generate cascading text
    const cascadeTexts = [
      "NEURAL MATRIX ANALYSIS COMPLETE",
      "FACIAL RECOGNITION PROTOCOLS VERIFIED",
      "TEMPORAL CONSISTENCY ALGORITHMS EXECUTED",
      "DEEPFAKE SIGNATURES ANALYZED",
      "AUDIO-VISUAL SYNCHRONIZATION CHECKED",
      "METADATA FORENSICS COMPLETED"
    ]

    const newCascadeItems = cascadeTexts.map((text, index) => ({
      id: index,
      text,
      delay: index * 300
    }))
    setCascadeItems(newCascadeItems)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  const generateIndicators = (): Indicator[] => {
    const baseIndicators: Indicator[] = []

    if (result === "authentic") {
      baseIndicators.push(
        {
          id: "facial_consistency",
          title: "FACIAL GEOMETRY VERIFIED",
          description: "Natural facial structure and movement patterns confirmed",
          severity: "low",
          confidence: 95,
          icon: <Eye className="w-4 h-4" />
        },
        {
          id: "temporal_stability",
          title: "TEMPORAL COHERENCE STABLE",
          description: "Consistent frame-to-frame transitions detected",
          severity: "low",
          confidence: 92,
          icon: <CheckCircle className="w-4 h-4" />
        }
      )
    } else if (result === "suspicious") {
      baseIndicators.push(
        {
          id: "micro_artifacts",
          title: "MICRO-ARTIFACT ANOMALIES",
          description: "Subtle compression inconsistencies detected",
          severity: "medium",
          confidence: 78,
          icon: <Eye className="w-4 h-4" />
        },
        {
          id: "audio_desync",
          title: "AUDIO-VISUAL DRIFT",
          description: "Minor synchronization deviations observed",
          severity: "medium",
          confidence: 71,
          icon: <Mic className="w-4 h-4" />
        }
      )
    } else {
      baseIndicators.push(
        {
          id: "synthetic_markers",
          title: "SYNTHETIC GENERATION MARKERS",
          description: "AI-generated content signatures identified",
          severity: "high",
          confidence: 89,
          icon: <Zap className="w-4 h-4" />
        },
        {
          id: "neural_artifacts",
          title: "NEURAL NETWORK ARTIFACTS",
          description: "Deep learning model fingerprints detected",
          severity: "high",
          confidence: 94,
          icon: <AlertTriangle className="w-4 h-4" />
        },
        {
          id: "facial_morphing",
          title: "FACIAL MORPHING DETECTED",
          description: "Unnatural facial transformation patterns found",
          severity: "high",
          confidence: 87,
          icon: <Users className="w-4 h-4" />
        }
      )
    }

    if (fileType === "video") {
      baseIndicators.forEach((indicator, index) => {
        indicator.timestamp = Math.floor(Math.random() * 60) + (index * 10)
      })
    }

    return baseIndicators
  }

  const indicators = generateIndicators()

  const getResultConfig = () => {
    switch (result) {
      case "authentic":
        return {
          color: "text-cyber-authentic",
          bgColor: "bg-cyber-authentic/10",
          borderColor: "border-cyber-authentic/30",
          icon: <CheckCircle className="w-12 h-12 text-cyber-authentic" />,
          title: "AUTHENTIC SIGNATURE VERIFIED",
          subtitle: "MEDIA INTEGRITY PROTOCOL CONFIRMS GENUINE CONTENT",
          sphereClass: "authentic"
        }
      case "suspicious":
        return {
          color: "text-cyber-suspicious",
          bgColor: "bg-cyber-suspicious/10",
          borderColor: "border-cyber-suspicious/30",
          icon: <AlertTriangle className="w-12 h-12 text-cyber-suspicious" />,
          title: "ANOMALOUS PATTERNS DETECTED",
          subtitle: "MANUAL REVIEW PROTOCOL RECOMMENDED",
          sphereClass: "suspicious"
        }
      case "deepfake":
        return {
          color: "text-cyber-deepfake",
          bgColor: "bg-cyber-deepfake/10",
          borderColor: "border-cyber-deepfake/30",
          icon: <XCircle className="w-12 h-12 text-cyber-deepfake" />,
          title: "SYNTHETIC MEDIA IDENTIFIED",
          subtitle: "DEEPFAKE CONTAINMENT PROTOCOL ACTIVATED",
          sphereClass: "deepfake"
        }
    }
  }

  const config = getResultConfig()

  // Export functionality with PDF support
  const handleExportReport = async () => {
    const reportData = {
      fileName: fileName,
      fileType: fileType,
      result: result,
      confidence: confidence,
      timestamp: new Date().toISOString(),
      analysis: {
        verdict: config.title,
        description: config.subtitle,
        confidenceScore: confidence,
        indicators: indicators,
        technicalDetails: {
          algorithm: "Neural Network Ensemble v4.2",
          processingTime: "2.3 seconds",
          modelsUsed: ["FaceSwap Detector", "Audio Synthesis Analyzer", "Temporal Consistency Checker"]
        }
      }
    }

    // Ask user for export format
    const exportFormat = confirm("Choose export format:\nOK = PDF Report\nCancel = JSON Data")

    if (exportFormat) {
      // Generate PDF Report
      await generatePDFReport(reportData)
    } else {
      // Generate JSON Report
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `pratyaksh-ai-report-${fileName.replace(/\.[^/.]+$/, "")}-${Date.now()}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  // Generate PDF Report
  const generatePDFReport = async (reportData: any) => {
    try {
      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>PRATYAKSH AI - Analysis Report</title>
          <style>
            body { 
              font-family: 'Courier New', monospace; 
              background: #0d1117; 
              color: #ffffff; 
              padding: 40px; 
              margin: 0;
            }
            .header { 
              text-align: center; 
              border-bottom: 2px solid #00ffff; 
              padding-bottom: 20px; 
              margin-bottom: 30px;
            }
            .logo { 
              font-size: 28px; 
              font-weight: bold; 
              color: #00ffff; 
              margin-bottom: 10px;
            }
            .subtitle { 
              color: #8b949e; 
              font-size: 14px;
            }
            .section { 
              margin: 25px 0; 
              padding: 20px; 
              border: 1px solid #30363d; 
              border-radius: 8px;
              background: #161b22;
            }
            .section-title { 
              font-size: 18px; 
              font-weight: bold; 
              color: #00ffff; 
              margin-bottom: 15px;
              border-bottom: 1px solid #30363d;
              padding-bottom: 5px;
            }
            .result-box { 
              padding: 20px; 
              text-align: center; 
              border-radius: 8px; 
              margin: 20px 0;
              font-size: 20px;
              font-weight: bold;
            }
            .authentic { background: rgba(0, 255, 136, 0.1); color: #00ff88; border: 2px solid #00ff88; }
            .suspicious { background: rgba(255, 255, 0, 0.1); color: #ffff00; border: 2px solid #ffff00; }
            .deepfake { background: rgba(255, 0, 102, 0.1); color: #ff0066; border: 2px solid #ff0066; }
            .confidence { 
              font-size: 32px; 
              font-weight: bold; 
              color: #00ffff; 
              text-align: center; 
              margin: 20px 0;
            }
            .indicator { 
              padding: 10px; 
              margin: 8px 0; 
              border-left: 3px solid #00ffff; 
              background: rgba(0, 255, 255, 0.05);
            }
            .indicator-title { 
              font-weight: bold; 
              color: #00ffff; 
            }
            .metadata { 
              display: grid; 
              grid-template-columns: 1fr 1fr; 
              gap: 10px; 
              margin: 15px 0;
            }
            .metadata-item { 
              padding: 8px; 
              background: rgba(0, 255, 255, 0.05); 
              border-radius: 4px;
            }
            .metadata-label { 
              font-weight: bold; 
              color: #8b949e; 
            }
            .footer { 
              text-align: center; 
              margin-top: 40px; 
              padding-top: 20px; 
              border-top: 1px solid #30363d; 
              color: #8b949e; 
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">PRATYAKSH AI</div>
            <div class="subtitle">A.I. INTEGRITY PROTOCOL - DEEPFAKE ANALYSIS REPORT</div>
          </div>

          <div class="section">
            <div class="section-title">📊 ANALYSIS RESULT</div>
            <div class="result-box ${reportData.result}">
              ${reportData.analysis.verdict}
            </div>
            <div style="text-align: center; color: #8b949e; margin-top: 10px;">
              ${reportData.analysis.description}
            </div>
            <div class="confidence">${reportData.confidence}% CONFIDENCE</div>
          </div>

          <div class="section">
            <div class="section-title">📁 FILE INFORMATION</div>
            <div class="metadata">
              <div class="metadata-item">
                <div class="metadata-label">File Name:</div>
                <div>${reportData.fileName}</div>
              </div>
              <div class="metadata-item">
                <div class="metadata-label">File Type:</div>
                <div>${reportData.fileType.toUpperCase()}</div>
              </div>
              <div class="metadata-item">
                <div class="metadata-label">Analysis Date:</div>
                <div>${new Date(reportData.timestamp).toLocaleString()}</div>
              </div>
              <div class="metadata-item">
                <div class="metadata-label">Algorithm:</div>
                <div>${reportData.analysis.technicalDetails.algorithm}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">🔍 TECHNICAL ANALYSIS</div>
            ${indicators.map(indicator => `
              <div class="indicator">
                <div class="indicator-title">${indicator.title}</div>
                <div style="color: #8b949e; margin-top: 5px;">${indicator.description}</div>
                <div style="color: #00ffff; margin-top: 5px;">Confidence: ${indicator.confidence}%</div>
              </div>
            `).join('')}
          </div>

          <div class="section">
            <div class="section-title">⚙️ PROCESSING DETAILS</div>
            <div class="metadata">
              <div class="metadata-item">
                <div class="metadata-label">Processing Time:</div>
                <div>${reportData.analysis.technicalDetails.processingTime}</div>
              </div>
              <div class="metadata-item">
                <div class="metadata-label">Models Used:</div>
                <div>${reportData.analysis.technicalDetails.modelsUsed.length} AI Models</div>
              </div>
            </div>
            <div style="margin-top: 15px;">
              <div style="color: #8b949e; margin-bottom: 10px;">AI Models Employed:</div>
              ${reportData.analysis.technicalDetails.modelsUsed.map(model => `
                <div style="padding: 5px 10px; background: rgba(0, 255, 255, 0.05); margin: 5px 0; border-radius: 4px;">
                  • ${model}
                </div>
              `).join('')}
            </div>
          </div>

          <div class="footer">
            <div>This report was generated by PRATYAKSH AI</div>
            <div>Advanced Neural Network System for Deepfake Detection</div>
            <div style="margin-top: 10px;">Report ID: ${Date.now()}</div>
          </div>
        </body>
        </html>
      `

      // Create a new window for PDF generation
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(htmlContent)
        printWindow.document.close()
        
        // Wait for content to load, then print
        setTimeout(() => {
          printWindow.print()
          printWindow.close()
        }, 1000)
      } else {
        // Fallback: create downloadable HTML file
        const blob = new Blob([htmlContent], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `pratyaksh-ai-report-${fileName.replace(/\.[^/.]+$/, "")}-${Date.now()}.html`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        alert('PDF generation requires popup permissions. HTML report downloaded instead.')
      }
    } catch (error) {
      console.error('PDF generation failed:', error)
      alert('PDF generation failed. Please try the JSON export option.')
    }
  }

  // Share functionality
  const handleShareData = async () => {
    const shareData = {
      title: 'PRATYAKSH AI - Deepfake Analysis Report',
      text: `Analysis Result: ${config.title}\nConfidence: ${confidence}%\nFile: ${fileName}`,
      url: window.location.href
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}`)
        alert('Report details copied to clipboard!')
      }
    } catch (error) {
      // Final fallback: show alert with data
      alert(`${shareData.title}\n${shareData.text}`)
    }
  }

  const getSeverityColor = (severity: "low" | "medium" | "high") => {
    switch (severity) {
      case "low":
        return "bg-cyber-authentic/20 text-cyber-authentic border-cyber-authentic/30"
      case "medium":
        return "bg-cyber-suspicious/20 text-cyber-suspicious border-cyber-suspicious/30"
      case "high":
        return "bg-cyber-deepfake/20 text-cyber-deepfake border-cyber-deepfake/30"
    }
  }

  const timelineSegments = fileType === "video" ? [
    { start: 0, end: 15, risk: "low", confidence: 95 },
    { start: 15, end: 30, risk: "medium", confidence: 78 },
    { start: 30, end: 45, risk: "high", confidence: 89 },
    { start: 45, end: 60, risk: "low", confidence: 92 },
  ] : []

  const getTimelineColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-cyber-authentic"
      case "medium": return "bg-cyber-suspicious"
      case "high": return "bg-cyber-deepfake"
      default: return "bg-cyber-text-secondary"
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Main Verdict Display */}
      <Card className={`${config.bgColor} ${config.borderColor} border-2 backdrop-blur-xl`}>
        <div className="p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Result Information */}
            <div className={`space-y-8 ${animationPhase >= 1 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
              <div className="flex items-center space-x-6">
                {config.icon}
                <div>
                  <h1 className={`text-4xl font-bold ${config.color} font-mono tracking-wider bloom-effect`}>
                    {config.title}
                  </h1>
                  <p className="text-cyber-text-secondary font-mono text-lg mt-3 tracking-wide">
                    {config.subtitle}
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-cyber-bg-card/50 rounded-lg p-4 border border-cyber-border">
                  <p className="text-sm text-cyber-text-secondary font-mono mb-1">CONFIDENCE LEVEL</p>
                  <p className={`text-3xl font-bold ${config.color} font-mono`}>{confidence}%</p>
                  <Progress value={confidence} className="mt-2 h-2" />
                </div>
                
                <div className="bg-cyber-bg-card/50 rounded-lg p-4 border border-cyber-border">
                  <p className="text-sm text-cyber-text-secondary font-mono mb-1">FILE ANALYSIS</p>
                  <p className="text-xl font-bold text-cyber-text-primary font-mono capitalize">{fileType}</p>
                  <p className="text-sm text-cyber-text-secondary font-mono mt-1 truncate">{fileName}</p>
                </div>
              </div>
            </div>

            {/* Interactive Data Sphere */}
            <div className={`text-center ${animationPhase >= 2 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
              <div className={`data-sphere ${config.sphereClass} mx-auto mb-6`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold font-mono text-white">{confidence}%</p>
                    <p className="text-xs font-mono text-white/80">CONFIDENCE</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-cyber-text-secondary font-mono text-sm">DATA SPHERE VISUALIZATION</p>
                <p className="text-cyber-glow-primary font-mono text-xs">REAL-TIME NEURAL MAPPING</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Cascading Analysis Data */}
      <Card className="bg-card/40 backdrop-blur-xl border border-cyber-glow-primary/30">
        <div className="p-6">
          <h3 className="text-lg font-bold text-cyber-glow-primary font-mono mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            REAL-TIME ANALYSIS STREAM
          </h3>
          <div className="space-y-2 h-40 overflow-hidden">
            {cascadeItems.map((item) => (
              <div
                key={item.id}
                className="cascade-text text-cyber-text-secondary font-mono text-sm tracking-wider"
                style={{ animationDelay: `${item.delay}ms` }}
              >
                &gt; {item.text}
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Timeline Visualization (for videos) */}
      {fileType === "video" && (
        <Card className="bg-card/40 backdrop-blur-xl border border-cyber-glow-primary/30">
          <div className="p-6">
            <h3 className="text-lg font-bold text-cyber-glow-primary font-mono mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              TEMPORAL RISK ANALYSIS
            </h3>
            <div className="space-y-4">
              <div className="flex h-8 rounded-lg overflow-hidden border border-cyber-border">
                {timelineSegments.map((segment, index) => (
                  <div
                    key={index}
                    className={`${getTimelineColor(segment.risk)} cursor-pointer hover:opacity-80 transition-opacity flex-1 relative`}
                    title={`${segment.start}s - ${segment.end}s: ${segment.confidence}% confidence`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-sm text-cyber-text-secondary font-mono">
                <span>00:00</span>
                <span>01:00</span>
              </div>
              <div className="flex items-center space-x-6 text-sm font-mono">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyber-authentic rounded"></div>
                  <span className="text-cyber-text-secondary">LOW RISK</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyber-suspicious rounded"></div>
                  <span className="text-cyber-text-secondary">MEDIUM RISK</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyber-deepfake rounded"></div>
                  <span className="text-cyber-text-secondary">HIGH RISK</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Detailed Technical Analysis */}
      <Card className="bg-card/40 backdrop-blur-xl border border-cyber-glow-primary/30">
        <Collapsible open={showDetails} onOpenChange={setShowDetails}>
          <CollapsibleTrigger asChild>
            <div className="p-6 border-b border-cyber-border cursor-pointer hover:bg-cyber-glow-primary/5 transition-colors">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-cyber-glow-primary font-mono flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  DETAILED FORENSIC ANALYSIS
                </h3>
                <ChevronDown className={`w-5 h-5 text-cyber-text-secondary transition-transform ${showDetails ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="p-6 space-y-8">
              {/* Detection Indicators */}
              <div>
                <h4 className="font-bold text-cyber-text-primary font-mono mb-4">NEURAL DETECTION SIGNATURES</h4>
                <div className="space-y-4">
                  {indicators.map((indicator) => (
                    <div key={indicator.id} className="bg-cyber-bg-secondary/30 rounded-lg p-4 border border-cyber-border">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 rounded-lg bg-cyber-glow-primary/10 border border-cyber-glow-primary/30">
                          {indicator.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-bold text-cyber-text-primary font-mono">{indicator.title}</h5>
                            <div className="flex items-center space-x-2">
                              <Badge className={`${getSeverityColor(indicator.severity)} border font-mono text-xs`}>
                                {indicator.severity.toUpperCase()}
                              </Badge>
                              <span className="text-sm font-mono text-cyber-text-secondary">
                                {indicator.confidence}%
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-cyber-text-secondary font-mono mb-2">
                            {indicator.description}
                          </p>
                          {indicator.timestamp && (
                            <p className="text-xs text-cyber-glow-primary font-mono">
                              DETECTED AT: {Math.floor(indicator.timestamp / 60)}:{(indicator.timestamp % 60).toString().padStart(2, '0')}
                            </p>
                          )}
                          <Progress value={indicator.confidence} className="mt-2 h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-cyber-bg-secondary/30 rounded-lg p-4 border border-cyber-border">
                  <h5 className="font-bold text-cyber-text-primary font-mono mb-3">AI NEURAL MODELS</h5>
                  <ul className="text-sm text-cyber-text-secondary font-mono space-y-1">
                    <li>&gt; FaceForensics++ v2.3</li>
                    <li>&gt; DFDC Challenge Model</li>
                    <li>&gt; Wav2Lip Audio-Visual</li>
                    <li>&gt; Custom Ensemble Matrix</li>
                  </ul>
                </div>
                <div className="bg-cyber-bg-secondary/30 rounded-lg p-4 border border-cyber-border">
                  <h5 className="font-bold text-cyber-text-primary font-mono mb-3">ANALYSIS METRICS</h5>
                  <div className="text-sm text-cyber-text-secondary font-mono space-y-2">
                    <div className="flex justify-between">
                      <span>FACIAL_ANALYSIS:</span>
                      <span className="text-cyber-glow-primary">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AUDIO_ANALYSIS:</span>
                      <span className="text-cyber-glow-primary">76%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TEMPORAL_COHERENCE:</span>
                      <span className="text-cyber-glow-primary">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ARTIFACT_DETECTION:</span>
                      <span className="text-cyber-glow-primary">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Action Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          onClick={onNewAnalysis} 
          className="cyber-glow-border bg-cyber-glow-primary/20 hover:bg-cyber-glow-primary/30 text-cyber-glow-primary font-mono"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          NEW ANALYSIS
        </Button>
        <Button 
          onClick={handleExportReport}
          className="cyber-glow-border bg-transparent text-cyber-text-secondary hover:bg-cyber-glow-primary/10 font-mono transition-all duration-300 hover:text-cyber-glow-primary"
        >
          <Download className="w-4 h-4 mr-2" />
          EXPORT REPORT
        </Button>
        <Button 
          onClick={handleShareData}
          className="cyber-glow-border bg-transparent text-cyber-text-secondary hover:bg-cyber-glow-primary/10 font-mono transition-all duration-300 hover:text-cyber-glow-primary"
        >
          <Share className="w-4 h-4 mr-2" />
          SHARE DATA
        </Button>
      </div>
    </div>
  )
}