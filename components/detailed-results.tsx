"use client"

import { useState } from "react"
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
  TrendingUp
} from "lucide-react"

type AnalysisResult = "authentic" | "suspicious" | "deepfake"
type Indicator = {
  id: string
  title: string
  description: string
  severity: "low" | "medium" | "high"
  confidence: number
  icon: React.ReactNode
  timestamp?: number // for video timeline
}

interface DetailedResultsProps {
  result: AnalysisResult
  confidence: number
  fileType: "image" | "video" | "audio"
  fileName: string
  onNewAnalysis: () => void
}

export function DetailedResults({ 
  result, 
  confidence, 
  fileType, 
  fileName, 
  onNewAnalysis 
}: DetailedResultsProps) {
  const [showDetails, setShowDetails] = useState(true)
  const [activeTimelineSegment, setActiveTimelineSegment] = useState<number | null>(null)

  // Mock indicators based on result type
  const generateIndicators = (): Indicator[] => {
    const baseIndicators: Indicator[] = []

    if (result === "authentic") {
      baseIndicators.push(
        {
          id: "facial_consistency",
          title: "Facial Features Consistent",
          description: "Natural facial expressions and movements detected",
          severity: "low",
          confidence: 95,
          icon: <Eye className="w-4 h-4" />
        },
        {
          id: "lighting_natural",
          title: "Natural Lighting Patterns",
          description: "Consistent lighting and shadows throughout",
          severity: "low",
          confidence: 92,
          icon: <CheckCircle className="w-4 h-4" />
        }
      )
    } else if (result === "suspicious") {
      baseIndicators.push(
        {
          id: "micro_expressions",
          title: "Inconsistent Micro-expressions",
          description: "Subtle facial expression anomalies detected",
          severity: "medium",
          confidence: 78,
          icon: <Eye className="w-4 h-4" />
        },
        {
          id: "audio_sync",
          title: "Minor Audio-Visual Sync Issues",
          description: "Slight delays between lip movement and speech",
          severity: "medium",
          confidence: 71,
          icon: <Mic className="w-4 h-4" />
        }
      )
    } else {
      baseIndicators.push(
        {
          id: "unnatural_blinking",
          title: "Unnatural Blinking Patterns",
          description: "Irregular blinking frequency and duration",
          severity: "high",
          confidence: 89,
          icon: <Eye className="w-4 h-4" />
        },
        {
          id: "synthetic_artifacts",
          title: "AI Generation Artifacts",
          description: "Digital artifacts consistent with AI synthesis",
          severity: "high",
          confidence: 94,
          icon: <Zap className="w-4 h-4" />
        },
        {
          id: "facial_warping",
          title: "Facial Geometry Inconsistencies",
          description: "Unnatural facial structure variations",
          severity: "high",
          confidence: 87,
          icon: <Users className="w-4 h-4" />
        }
      )
    }

    // Add timestamps for video files
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
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/20",
          icon: <CheckCircle className="w-8 h-8 text-green-500" />,
          title: "Authentic Content Detected ✅",
          description: "This media appears to be genuine and unmodified."
        }
      case "suspicious":
        return {
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500/20",
          icon: <AlertTriangle className="w-8 h-8 text-yellow-500" />,
          title: "Suspicious Elements Detected ⚠️",
          description: "Some irregularities detected that require human review."
        }
      case "deepfake":
        return {
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/20",
          icon: <XCircle className="w-8 h-8 text-red-500" />,
          title: "Deepfake Detected ⛔️",
          description: "This media appears to be artificially generated or manipulated."
        }
    }
  }

  const config = getResultConfig()

  const getSeverityColor = (severity: "low" | "medium" | "high") => {
    switch (severity) {
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20"
    }
  }

  // Mock timeline data for videos
  const timelineSegments = fileType === "video" ? [
    { start: 0, end: 15, risk: "low", confidence: 95 },
    { start: 15, end: 30, risk: "medium", confidence: 78 },
    { start: 30, end: 45, risk: "high", confidence: 89 },
    { start: 45, end: 60, risk: "low", confidence: 92 },
  ] : []

  const getTimelineColor = (risk: string) => {
    switch (risk) {
      case "low": return "bg-green-500"
      case "medium": return "bg-yellow-500"
      case "high": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Result Card */}
      <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
        <div className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-4">
              {config.icon}
              <div>
                <h1 className={`text-3xl font-bold ${config.color}`}>
                  {config.title}
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                  {config.description}
                </p>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Overall Confidence</p>
                  <p className={`text-4xl font-bold ${config.color}`}>{confidence}%</p>
                  <Progress value={confidence} className="mt-2" />
                </div>
              </div>
              
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">File Type</p>
                  <p className="text-2xl font-semibold text-foreground capitalize">{fileType}</p>
                  <p className="text-sm text-muted-foreground mt-1">{fileName}</p>
                </div>
              </div>

              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Processing Time</p>
                  <p className="text-2xl font-semibold text-foreground">2.3s</p>
                  <div className="flex items-center justify-center mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground mr-1" />
                    <p className="text-sm text-muted-foreground">Fast Analysis</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Timeline Visualization (for videos) */}
      {fileType === "video" && (
        <Card className="bg-card border-border">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Timeline Analysis
            </h3>
            <div className="space-y-4">
              <div className="flex h-8 rounded-lg overflow-hidden border border-border">
                {timelineSegments.map((segment, index) => (
                  <div
                    key={index}
                    className={`${getTimelineColor(segment.risk)} cursor-pointer hover:opacity-80 transition-opacity flex-1 relative`}
                    onClick={() => setActiveTimelineSegment(activeTimelineSegment === index ? null : index)}
                    title={`${segment.start}s - ${segment.end}s: ${segment.confidence}% confidence`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0:00</span>
                <span>1:00</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-muted-foreground">Low Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span className="text-muted-foreground">Medium Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-muted-foreground">High Risk</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Detailed Analysis */}
      <Card className="bg-card border-border">
        <Collapsible open={showDetails} onOpenChange={setShowDetails}>
          <CollapsibleTrigger asChild>
            <div className="p-6 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Detailed Analysis Report
                </h3>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${showDetails ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="p-6 space-y-6">
              {/* Key Indicators */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Key Detection Indicators</h4>
                <div className="space-y-3">
                  {indicators.map((indicator) => (
                    <div key={indicator.id} className="bg-muted/30 rounded-lg p-4 border border-border">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          {indicator.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-foreground">{indicator.title}</h5>
                            <div className="flex items-center space-x-2">
                              <Badge className={`${getSeverityColor(indicator.severity)} border text-xs`}>
                                {indicator.severity.toUpperCase()}
                              </Badge>
                              <span className="text-sm font-medium text-muted-foreground">
                                {indicator.confidence}%
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {indicator.description}
                          </p>
                          {indicator.timestamp && (
                            <p className="text-xs text-muted-foreground">
                              Detected at: {Math.floor(indicator.timestamp / 60)}:{(indicator.timestamp % 60).toString().padStart(2, '0')}
                            </p>
                          )}
                          <Progress value={indicator.confidence} className="mt-2 h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Details */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Technical Analysis Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-lg p-4 border border-border">
                    <h5 className="font-medium text-foreground mb-2">AI Models Used</h5>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• FaceForensics++ Detection</li>
                      <li>• DeepFake Detection Challenge</li>
                      <li>• Wav2Lip Audio-Visual Sync</li>
                      <li>• Custom Ensemble Model</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4 border border-border">
                    <h5 className="font-medium text-foreground mb-2">Analysis Metrics</h5>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Facial Analysis:</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Audio Analysis:</span>
                        <span className="font-medium">76%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Temporal Consistency:</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Artifact Detection:</span>
                        <span className="font-medium">85%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onNewAnalysis} className="flex-1 bg-primary hover:bg-primary/90">
          Analyze Another File
        </Button>
        <Button variant="outline" className="flex-1">
          Export Report
        </Button>
        <Button variant="outline" className="flex-1">
          Share Results
        </Button>
      </div>
    </div>
  )
}