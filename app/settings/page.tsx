"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [groqApiKey, setGroqApiKey] = useState("");
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      // Save the API key to localStorage
      localStorage.setItem("GROQ_API_KEY", groqApiKey);

      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-6 md:py-12">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Configure your API settings for the Lesson Plan Assistant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groq-api-key">Groq API Key</Label>
            <Input
              id="groq-api-key"
              type="password"
              placeholder="Enter your Groq API key"
              value={groqApiKey}
              onChange={(e) => setGroqApiKey(e.target.value)}
            />
            <p className="text-sm text-gray-500">
              Get your API key from{" "}
              <a
                href="https://console.groq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                console.groq.com
              </a>
            </p>
          </div>
          <Button onClick={handleSave}>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
