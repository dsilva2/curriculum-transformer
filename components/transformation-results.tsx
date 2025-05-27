"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Printer, Share2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, CheckCircleIcon, AlertTriangleIcon } from "lucide-react"

interface Project {
  title: string
  description: string
  learningObjectives: string[]
  materials: string
  timeline: string
  assessment: string
}

interface OriginalMaterial {
  title: string
  type: string
  content: string
}

interface TransformationResultsProps {
  originalMaterial: OriginalMaterial
  transformedProjects: Project[]
  demoMode?: boolean
  usingGroq?: boolean
  debugInfo?: any
}

export function TransformationResults({
  originalMaterial,
  transformedProjects = [],
  demoMode = false,
  usingGroq = false,
  debugInfo,
}: TransformationResultsProps) {
  const [selectedProject, setSelectedProject] = useState(0)

  // If no projects are provided, use fallback data
  const projects =
    transformedProjects.length > 0
      ? transformedProjects
      : [
          {
            title: "No projects generated",
            description: "Please try again with different materials or guidelines.",
            learningObjectives: ["No learning objectives available"],
            materials: "No materials specified",
            timeline: "No timeline specified",
            assessment: "No assessment specified",
          },
        ]

  return (
    <div className="space-y-6">
      {/* Status Alert */}
      {usingGroq ? (
        <Alert className="mb-4">
          <CheckCircleIcon className="h-4 w-4" />
          <AlertTitle>AI-Generated Results</AlertTitle>
          <AlertDescription>
            These projects were generated using Groq AI based on your uploaded materials and guidelines.
            {debugInfo && (
              <div className="mt-2 text-xs text-gray-600">
                Debug: {debugInfo.projectCount} projects generated, Groq available:{" "}
                {debugInfo.groqAvailable ? "Yes" : "No"}
              </div>
            )}
          </AlertDescription>
        </Alert>
      ) : demoMode ? (
        <Alert className="mb-4" variant="warning">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>Demo Mode Active</AlertTitle>
          <AlertDescription>
            You're viewing sample data because the Groq API key is not configured. For personalized results based on
            your actual content, please add your Groq API key.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="mb-4">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Mock Data</AlertTitle>
          <AlertDescription>
            These are sample projects. The AI service may not be available or there was an error processing your
            request.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Transformation Results</CardTitle>
          <CardDescription>
            Your traditional materials have been transformed into innovative projects for Innova Schools Mexico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Original Material</h3>
              <Card>
                <CardHeader>
                  <CardTitle>{originalMaterial.title}</CardTitle>
                  <CardDescription>Type: {originalMaterial.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{originalMaterial.content}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                Innovative Project Suggestions for Innova Schools
                {usingGroq && <span className="text-sm text-green-600 ml-2">(AI Generated)</span>}
              </h3>
              <Tabs
                defaultValue="0"
                className="w-full"
                onValueChange={(value) => setSelectedProject(Number.parseInt(value))}
              >
                <TabsList className="grid grid-cols-3">
                  {projects.slice(0, 3).map((_, index) => (
                    <TabsTrigger key={index} value={index.toString()}>
                      Project {index + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {projects.slice(0, 3).map((project, index) => (
                  <TabsContent key={index} value={index.toString()}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>Innovative Project</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-medium">Description</h4>
                          <p className="text-gray-500">{project.description}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Learning Objectives</h4>
                          <ul className="list-disc pl-5 text-gray-500">
                            {project.learningObjectives.map((objective, i) => (
                              <li key={i}>{objective}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium">Materials</h4>
                            <p className="text-gray-500">{project.materials}</p>
                          </div>
                          <div>
                            <h4 className="font-medium">Timeline</h4>
                            <p className="text-gray-500">{project.timeline}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium">Assessment</h4>
                          <p className="text-gray-500">{project.assessment}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          <Button>Save to Library</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How We Transformed Your Content</CardTitle>
          <CardDescription>
            Our RAG system analyzed your materials and Innova Schools Mexico guidelines to create these suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              Our Retrieval Augmented Generation (RAG) system analyzed your traditional teaching materials and school
              guidelines to create innovative project suggestions. Here's how we did it:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Document Analysis:</strong> We processed your uploaded materials to understand the core content,
                learning objectives, and educational standards.
              </li>
              <li>
                <strong>Vector Embedding:</strong> We converted your content into mathematical representations
                (embeddings) that capture the semantic meaning of your materials.
              </li>
              <li>
                <strong>Similarity Search:</strong> When generating projects, we retrieved the most relevant parts of
                your materials and guidelines based on semantic similarity.
              </li>
              <li>
                <strong>Context-Enhanced Generation:</strong> Our AI used the retrieved context to generate project
                ideas that are specifically tailored to your content and Innova Schools Mexico's methodology.
              </li>
              <li>
                <strong>Alignment Verification:</strong> We verified that all suggested projects meet your curriculum
                requirements and learning objectives.
              </li>
            </ol>
            <p>
              The result is a set of innovative projects that transform traditional lecture-based learning into
              engaging, hands-on experiences while still meeting all your educational requirements.
            </p>

            {!usingGroq && (
              <p className="text-sm text-gray-500 mt-4 p-2 border rounded bg-gray-50">
                <strong>Note:</strong> You're currently viewing demonstration results. For personalized project
                suggestions based on your actual content, please ensure your Groq API key is properly configured.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
