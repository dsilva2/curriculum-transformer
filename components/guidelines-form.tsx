"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FileUploader } from "./file-uploader"
import { Input } from "@/components/ui/input"

interface GuidelinesFormProps {
  onSubmit: (data: { guidelines: string; materialTitle: string }) => void
}

export function GuidelinesForm({ onSubmit }: GuidelinesFormProps) {
  const [inputMethod, setInputMethod] = useState("text")
  const [guidelinesText, setGuidelinesText] = useState("")
  const [materialTitle, setMaterialTitle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real application, you would process the guidelines here
      onSubmit({
        guidelines: guidelinesText,
        materialTitle,
      })
    } catch (error) {
      console.error("Error submitting guidelines:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="materialTitle">Material Title</Label>
        <Input
          id="materialTitle"
          placeholder="Enter a title for your teaching material"
          value={materialTitle}
          onChange={(e) => setMaterialTitle(e.target.value)}
        />
        <p className="text-sm text-gray-500">This helps identify your material in the transformation results.</p>
      </div>

      <div className="space-y-2">
        <Label>How would you like to provide Innova Schools guidelines?</Label>
        <RadioGroup value={inputMethod} onValueChange={setInputMethod} className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="text" id="text" />
            <Label htmlFor="text">Enter text directly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="file" id="file" />
            <Label htmlFor="file">Upload a file</Label>
          </div>
        </RadioGroup>
      </div>

      {inputMethod === "text" ? (
        <div className="space-y-2">
          <Label htmlFor="guidelines">Innova Schools Mexico Guidelines for Innovative Curriculum</Label>
          <Textarea
            id="guidelines"
            placeholder="Enter Innova Schools Mexico guidelines for innovative curriculum here..."
            className="min-h-[200px]"
            value={guidelinesText}
            onChange={(e) => setGuidelinesText(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            Please include any specific requirements, learning objectives, or assessment criteria from Innova Schools
            Mexico.
          </p>
        </div>
      ) : (
        <FileUploader
          onUploadComplete={(files) => {
            // This would normally process the file and extract text
            // For now, we'll just set a placeholder
            setGuidelinesText("Guidelines extracted from uploaded file")
            onSubmit({
              guidelines: "Guidelines extracted from uploaded file",
              materialTitle,
            })
          }}
        />
      )}

      {inputMethod === "text" && (
        <Button type="submit" disabled={!guidelinesText.trim() || isSubmitting}>
          {isSubmitting ? "Processing..." : "Submit Guidelines"}
        </Button>
      )}
    </form>
  )
}
