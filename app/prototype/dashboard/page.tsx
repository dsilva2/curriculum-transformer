"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploader } from "@/components/file-uploader";
import { GuidelinesForm } from "@/components/guidelines-form";
import { TransformationResults } from "@/components/transformation-results";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upload");
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [materialFile, setMaterialFile] = useState<File | null>(null);
  const [materialTitle, setMaterialTitle] = useState("Untitled Material");
  const [guidelines, setGuidelines] = useState("");
  const [transformationData, setTransformationData] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [apiStatus, setApiStatus] = useState<{
    available: boolean;
    models?: string[];
    currentModel?: string;
    provider?: string;
    checking: boolean;
    error?: string;
  }>({
    available: false,
    checking: true,
  });
  const { toast } = useToast();

  // Check API status on component mount
  useEffect(() => {
    const checkApi = async () => {
      try {
        console.log("Checking Groq API status...");
        const response = await fetch("/api/check-groq");
        const data = await response.json();

        console.log("API check response:", data);

        setApiStatus({
          available: data.available,
          models: data.models,
          currentModel: data.currentModel,
          provider: data.provider,
          checking: false,
          error: data.error,
        });

        if (!data.available) {
          toast({
            title: "Groq API not available",
            description:
              data.error ||
              "Running in demo mode with mock data. Add your Groq API key for full functionality.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Groq API connected",
            description: `Using ${data.currentModel} for text generation.`,
          });
        }
      } catch (error) {
        console.error("Error checking API:", error);
        setApiStatus({
          available: false,
          checking: false,
          error: "Failed to check API status",
        });
        toast({
          title: "API check failed",
          description: "Could not connect to API. Running in demo mode.",
          variant: "destructive",
        });
      }
    };

    checkApi();
  }, [toast]);

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return;

    setMaterialFile(files[0]);
    setActiveTab("guidelines");
  };

  const handleGuidelinesSubmit = async (data: {
    guidelines: string;
    materialTitle: string;
  }) => {
    setGuidelines(data.guidelines);
    setMaterialTitle(data.materialTitle || "Untitled Material");

    if (!materialFile && !data.guidelines) {
      toast({
        title: "Missing information",
        description: "Please provide either teaching materials or guidelines.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      console.log("Starting transformation process...");

      // Process and index the documents
      const formData = new FormData();
      if (materialFile) {
        formData.append("file", materialFile);
      }
      if (data.guidelines) {
        formData.append("guidelines", data.guidelines);
      }
      formData.append("title", data.materialTitle || "Untitled Material");

      console.log("Analyzing documents...");
      const analyzeResponse = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json();
        throw new Error(errorData.error || "Failed to process documents");
      }

      const analyzeData = await analyzeResponse.json();
      console.log("Document analysis complete:", analyzeData);

      // Generate transformation
      console.log("Generating transformation...");
      const transformResponse = await fetch("/api/transform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          materialTitle: data.materialTitle || "Untitled Material",
          query:
            "Transform this traditional teaching material into innovative project-based learning activities that align with Innova Schools Mexico's educational methodology",
        }),
      });

      if (!transformResponse.ok) {
        const errorData = await transformResponse.json();
        throw new Error(errorData.error || "Failed to generate transformation");
      }

      const transformData = await transformResponse.json();
      console.log("Transformation complete:", transformData);

      setTransformationData(transformData.results);
      setDebugInfo(transformData.debug);
      setHasResults(true);
      setActiveTab("results");

      if (transformData.usingGroq) {
        toast({
          title: "AI Transformation Complete",
          description:
            "Your materials have been successfully transformed using Groq AI.",
        });
      } else {
        toast({
          title: "Demo Mode",
          description:
            "Showing sample projects. Configure Groq API for personalized results.",
          variant: "warning",
        });
      }
    } catch (error) {
      console.error("Error in transformation process:", error);
      toast({
        title: "Error",
        description: `Transformation failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        variant: "destructive",
      });

      // Show mock results even on error
      setTransformationData({
        projects: [
          {
            title: "Error Recovery Project",
            description:
              "A sample project shown due to processing error. Please check your API configuration.",
            learningObjectives: [
              "Troubleshoot technical issues",
              "Understand error handling",
              "Learn from failures",
            ],
            materials: "Error logs, documentation, support resources",
            timeline: "Immediate",
            assessment: "Problem resolution and learning reflection",
          },
        ],
      });
      setHasResults(true);
      setActiveTab("results");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <span className="font-bold text-xl">Innova Schools Mexico</span>
          <span className="ml-2 text-sm text-gray-500">
            Curriculum Transformation
          </span>
        </Link>
        <div className="ml-8 flex items-center gap-6">
          <Link
            href="/team"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Our Team
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium">
                  Prototype
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-2 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/prototype/about"
                          className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            About
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn about our platform
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/prototype/dashboard"
                          className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Dashboard
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Access the main dashboard
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/prototype/chatbot"
                          className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            Lesson Assistant
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Try our AI assistant
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      <main className="flex-1 container py-6 md:py-12">
        <div className="flex flex-col items-start gap-4 md:gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Upload your materials and transform them into innovative
              curriculum for Innova Schools Mexico
            </p>
          </div>

          {/* API Status Alert */}
          {apiStatus.checking ? (
            <Alert className="mb-4">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Checking API Status</AlertTitle>
              <AlertDescription>
                Checking connection to Groq API. This will only take a moment...
              </AlertDescription>
            </Alert>
          ) : apiStatus.available ? (
            <Alert className="mb-4" variant="default">
              {/* <CheckCircleIcon className="h-4 w-4" />
              <AlertTitle>Groq API Connected</AlertTitle>
              <AlertDescription>
                Using {apiStatus.currentModel} for text generation and HuggingFace for embeddings.
                <div className="mt-2 text-sm">Available models: {apiStatus.models?.join(", ") || "None"}</div>
              </AlertDescription> */}
            </Alert>
          ) : (
            <Alert className="mb-4" variant="destructive">
              <AlertTriangleIcon className="h-4 w-4" />
              <AlertTitle>Groq API Not Available</AlertTitle>
              <AlertDescription>
                {apiStatus.error ||
                  "Running in demo mode with mock data. For full functionality, please add your Groq API key."}
                <div className="mt-2 text-sm">
                  Get a free API key at{" "}
                  <a
                    href="https://console.groq.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    console.groq.com
                  </a>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
              <TabsTrigger value="results" disabled={!hasResults}>
                Results
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upload" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Materials</CardTitle>
                  <CardDescription>
                    Upload your traditional teaching materials that you want to
                    transform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploader onUploadComplete={handleFileUpload} />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button
                    onClick={() => setActiveTab("guidelines")}
                    disabled={!materialFile}
                  >
                    Next
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="guidelines" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>School Guidelines</CardTitle>
                  <CardDescription>
                    Enter or upload your school's guidelines for innovative
                    curriculum
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GuidelinesForm onSubmit={handleGuidelinesSubmit} />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("upload")}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() =>
                      handleGuidelinesSubmit({ guidelines, materialTitle })
                    }
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Transform"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="results" className="mt-6">
              <TransformationResults
                originalMaterial={{
                  title: materialTitle,
                  type: materialFile?.type || "Text",
                  content: "Your uploaded content",
                }}
                transformedProjects={transformationData?.projects || []}
                demoMode={!apiStatus.available}
                usingGroq={apiStatus.available}
                debugInfo={debugInfo}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © {new Date().getFullYear()} Innova Schools Mexico. All rights
            reserved.
          </p>
          <p className="text-center text-xs text-gray-500">
            Powered by{" "}
            {apiStatus.available
              ? `${apiStatus.provider} (${apiStatus.currentModel})`
              : "Demo Mode"}
          </p>
        </div>
      </footer>
    </div>
  );
}
