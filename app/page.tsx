import Link from "next/link"
import { ArrowRight, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <span className="font-bold text-xl">Innova Schools Mexico</span>
          <span className="ml-2 text-sm text-gray-500">Curriculum Transformation</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4">
            How It Works
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <Link href="/chatbot" className="text-sm font-medium hover:underline underline-offset-4">
            Lesson Assistant
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Curriculum Transformation for Innova Schools Mexico
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Upload your traditional teaching materials and Innova Schools guidelines. Our AI system will analyze
                    them and suggest innovative projects aligned with Innova Schools Mexico methodology.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button className="gap-1">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/chatbot">
                    <Button variant="outline" className="gap-1">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Lesson Assistant
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                src="https://play-lh.googleusercontent.com/pXFWipKGJaN4Jy3r3u_fly2qn7qEcNEPmg8GgLREB2BCrup_hqMFQAqygDrjLHCmKOs"
                width={550}
                height={550}
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-200 px-3 py-1 text-sm dark:bg-gray-700">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Reimagine Your Teaching Approach</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform uses advanced AI to help Innova Schools Mexico educators transform traditional teaching
                  methods into engaging, innovative learning experiences.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Document Analysis</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Upload your curriculum guidelines and teaching materials for AI analysis.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">AI Transformation</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Our RAG system analyzes content and generates innovative project ideas.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Curriculum Library</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Save and organize your transformed curriculum materials for easy access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our platform uses Retrieval Augmented Generation (RAG) to analyze your materials and create innovative
                  curriculum suggestions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50">
                      1
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Upload Your Materials</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Upload your school guidelines and traditional teaching materials to our secure platform.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50">
                      2
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">AI Analysis</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Our RAG system analyzes your content, understanding the learning objectives and requirements.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50">
                      3
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Transformation</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        The AI generates innovative project ideas and assignments that align with your guidelines.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50">
                      4
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Review & Implement</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Review the suggestions, make any necessary adjustments, and implement in your classroom.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <img
                src="https://play-lh.googleusercontent.com/pXFWipKGJaN4Jy3r3u_fly2qn7qEcNEPmg8GgLREB2BCrup_hqMFQAqygDrjLHCmKOs"
                width={400}
                height={400}
                alt="How it works"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to transform your teaching approach at Innova Schools?
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Join Innova Schools Mexico educators who are using AI to create more engaging, innovative learning
                experiences.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <Link href="/dashboard">
                <Button className="gap-1">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Innova Schools Mexico. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
