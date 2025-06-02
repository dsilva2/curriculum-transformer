"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Send, InfoIcon, AlertTriangleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GuidelinesForm } from "@/components/guidelines-form";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [guidelines, setGuidelines] = useState("");
  const [materialTitle, setMaterialTitle] = useState("Untitled Material");
  const [isProcessing, setIsProcessing] = useState(false);

  const [groqStatus, setGroqStatus] = useState<{
    available: boolean;
    models?: string[];
    currentModel?: string;
    checking: boolean;
    error?: string;
  }>({
    available: false,
    checking: true,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize messages after component mount to avoid hydration mismatch
  useEffect(() => {
    setMessages([
      {
        role: "system",
        content:
          "Welcome to the Innova Schools Mexico Lesson Plan Assistant. Upload your lesson plans and ask questions about their compliance with guidelines.",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Check Groq status on component mount
  useEffect(() => {
    const checkGroq = async () => {
      try {
        const response = await fetch("/api/check-groq");
        if (response.ok) {
          const data = await response.json();
          setGroqStatus({
            available: data.available,
            models: data.models,
            currentModel: data.currentModel,
            checking: false,
            error: data.error,
          });

          if (!data.available) {
            setMessages((prev) => [
              ...prev,
              {
                role: "system",
                content:
                  "Running in demo mode with mock responses. Add your Groq API key for full functionality.",
                timestamp: new Date(),
              },
            ]);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                role: "system",
                content: `Connected to Groq. Using ${data.currentModel} for responses.`,
                timestamp: new Date(),
              },
            ]);
          }
        } else {
          setGroqStatus({
            available: false,
            checking: false,
            error: "Failed to check Groq status",
          });
          setMessages((prev) => [
            ...prev,
            {
              role: "system",
              content:
                "Could not verify Groq status. Running in demo mode with mock responses.",
              timestamp: new Date(),
            },
          ]);
        }
      } catch (error) {
        console.error("Error checking Groq:", error);
        setGroqStatus({
          available: false,
          checking: false,
          error: "Failed to connect to Groq",
        });
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content:
              "Could not connect to Groq. Running in demo mode with mock responses.",
            timestamp: new Date(),
          },
        ]);
      }
    };

    checkGroq();
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleGuidelinesSubmit = async (data: {
    guidelines: string;
    materialTitle: string;
  }) => {
    setGuidelines(data.guidelines);
    setMaterialTitle(data.materialTitle || "Untitled Material");

    if (!data.guidelines) {
      toast({
        title: "Missing information",
        description: "Please provide guidelines.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Process guidelines with the analyze API
      const formData = new FormData();
      if (data.guidelines) {
        formData.append("guidelines", data.guidelines);
      }
      formData.append("title", data.materialTitle || "Untitled Material");

      const analyzeResponse = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!analyzeResponse.ok) {
        throw new Error("Failed to process guidelines");
      }

      const analyzeData = await analyzeResponse.json();
      console.log("Guidelines analysis complete:", analyzeData);

      toast({
        title: "Guidelines processed",
        description: "Your guidelines have been successfully processed.",
      });
    } catch (error) {
      console.error("Error processing guidelines:", error);
      toast({
        title: "Error",
        description: "Failed to process guidelines. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Call the API with the message and guidelines
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          guidelines,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get a response");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });

      // Add a fallback response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I encountered an error while processing your request. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <span className="font-bold text-xl">Innova Schools Mexico</span>
          <span className="ml-2 text-sm text-gray-500">
            Lesson Plan Assistant
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-6 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {groqStatus.checking ? (
          <Alert className="md:col-span-3 mb-0">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Checking Groq Status</AlertTitle>
            <AlertDescription>
              Checking connection to Groq. This will only take a moment...
            </AlertDescription>
          </Alert>
        ) : !groqStatus.available ? (
          <Alert className="md:col-span-3 mb-0" variant="destructive">
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertTitle>Groq Not Available</AlertTitle>
            <AlertDescription>
              Running in demo mode with mock responses. For full functionality,
              please add your Groq API key.
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
        ) : (
          <></>
        )}

        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-12rem)] flex flex-col">
            <CardHeader className="flex-none">
              <CardTitle>Lesson Plan Assistant</CardTitle>
              <CardDescription>
                Ask questions about lesson plans and their compliance with
                Innova Schools Mexico guidelines
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto min-h-0">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    } items-start gap-2`}
                  >
                    {message.role !== "user" && (
                      <Avatar className="h-8 w-8 bg-primary text-white flex items-center justify-center">
                        <span className="text-xs font-bold">AI</span>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.role === "system"
                          ? "bg-muted text-muted-foreground"
                          : "bg-secondary/20 text-secondary-foreground"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 bg-gray-200 text-gray-700 flex items-center justify-center">
                        <span className="text-xs font-bold">You</span>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="flex-none border-t p-4">
              <form
                className="flex w-full items-center space-x-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <Input
                  type="text"
                  placeholder="Ask about lesson plan compliance with guidelines..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Suggested Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="link"
                    className="text-left justify-start p-0 h-auto"
                    onClick={() => {
                      setInput(
                        "Does my lesson plan comply with Innova Schools guidelines?"
                      );
                    }}
                  >
                    Does my lesson plan comply with Innova Schools guidelines?
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="text-left justify-start p-0 h-auto"
                    onClick={() => {
                      setInput(
                        "How can I improve the student engagement in this lesson?"
                      );
                    }}
                  >
                    How can I improve the student engagement in this lesson?
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="text-left justify-start p-0 h-auto"
                    onClick={() => {
                      setInput(
                        "What assessment methods would work best for this lesson?"
                      );
                    }}
                  >
                    What assessment methods would work best for this lesson?
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="text-left justify-start p-0 h-auto"
                    onClick={() => {
                      setInput(
                        "How can I make this lesson more project-based?"
                      );
                    }}
                  >
                    How can I make this lesson more project-based?
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guidelines</CardTitle>
              <CardDescription>
                Enter Innova Schools Mexico guidelines for reference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GuidelinesForm onSubmit={handleGuidelinesSubmit} />
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © {new Date().getFullYear()} Innova Schools Mexico. All rights
            reserved.
          </p>
          <p className="text-center text-xs text-gray-500">
            {groqStatus.available
              ? `Powered by Groq (${groqStatus.currentModel})`
              : "Demo Mode - Mock Responses"}
          </p>
        </div>
      </footer>
    </div>
  );
}
