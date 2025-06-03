import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Community Partner Overview Section */}
        <div className="mt-12 flex justify-center">
          <img
            src="https://media.licdn.com/dms/image/v2/C561BAQEbRzAmD-c2rA/company-background_10000/company-background_10000/0/1651771657912/innova_schools_mx_cover?e=2147483647&v=beta&t=clcLftLkaCxqbgdKL-_qMBA8L3xWfvA9CCqkKN_-bmc"
            alt="Innova Schools MX Campus"
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Community Partner Overview
              </h2>

              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our collaboration with Innova Schools MX, with a focus on their
                impact and mission
              </p>
            </div>
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* About Innova Column */}
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    About Innova
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50">
                        1
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 dark:text-gray-400">
                          Low-cost private education for Mexico's emerging
                          middle class
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50">
                        2
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 dark:text-gray-400">
                          Project-based curriculum that emphasizes
                          social-emotional learning
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50">
                        3
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 dark:text-gray-400">
                          Recent expansion since 2018 to 10 sites to support
                          community educational needs & 5 schools in the
                          previous year
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Interviews Column */}
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    Interviews
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50">
                        1
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 dark:text-gray-400">
                          Cinthia (Transformation Manager)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50">
                        2
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 dark:text-gray-400">
                          Alvaro (School Management)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50">
                        3
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 dark:text-gray-400">
                          Elena (Teacher Training)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50">
                        4
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 dark:text-gray-400">
                          Joao & Luz (Human Resources)
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Problem
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our journey from initial problem statements to transformed
                solutions
              </p>
            </div>
            <div className="w-full px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Original HMWs */}
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-6 text-blue-600">
                    Original HMWs
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                        1
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 text-base">
                          How might we reimagine teacher training to align to
                          innovative pedagogies?
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                        2
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 text-base">
                          How might we ensure families understand the merits of
                          innovative pedagogies and engage with the Innova
                          School model?
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* What We Learned */}
                <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-100">
                  <h3 className="text-xl font-semibold mb-6 text-center text-blue-600">
                    What We Learned
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                        1
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Teachers are overwhelmed by increasing workloads and
                        responsibilities.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                        2
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        Communication issues arise due to lack of effective
                        parent engagement.
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                        3
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        New pedagogical model presents challenges in training
                        and implementation.
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Transformed HMWs */}
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-6 text-blue-600">
                    Transformed HMWs
                  </h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                        1
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 text-base">
                          How might we decrease teachers' workload and equip
                          them with tools to implement Innova's curriculum?
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                        2
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300 text-base">
                          How might we help teachers communicate the value of
                          Innova's curriculum to parents?
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prototypes Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Prototypes
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our journey from ideation to implementation
              </p>
            </div>

            {/* Prototyping Process */}
            <div className="mx-auto max-w-6xl">
              <h3 className="text-2xl font-semibold mb-8 text-center text-blue-600">
                Prototyping Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Process Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src="/prototypes/sticky1.jpg"
                      alt="Initial Prototype"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    Design Ideation
                  </h4>
                </div>

                {/* Process Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src="/prototypes/sticky2.jpeg"
                      alt="Iterative Development"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Deep Dive</h4>
                </div>

                {/* Process Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src="/prototypes/sticky3.jpeg"
                      alt="Final Implementation"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Clustering</h4>
                </div>
              </div>
            </div>

            {/* Community Events Prototypes */}
            <div className="mx-auto max-w-6xl mt-16">
              <h3 className="text-2xl font-semibold mb-8 text-center text-blue-600">
                Community Events Prototypes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Event Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src="/prototypes/community1.jpg"
                      alt="Weekend Farmers' Market"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    Weekend Farmers' Market
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Informal meet-ups to test parent engagement.
                  </p>
                </div>

                {/* Event Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src="/prototypes/community2.jpg"
                      alt="Alumni Promotional Material"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    Alumni Promotional Material
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Bring graduates' stories to share "why Innova works".
                  </p>
                </div>

                {/* Event Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src="/prototypes/community3.jpg"
                      alt="Parent-Teacher Night"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    Parent-Teacher Night
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Structured demo of student work and curriculum talk.
                  </p>
                </div>
              </div>
            </div>

            {/* AI and Digital Prototypes */}
            <div className="mx-auto max-w-6xl mt-16">
              <h3 className="text-2xl font-semibold mb-8 text-center text-blue-600">
                Early AI and Digital Prototypes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Digital Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src="/prototypes/digital1.jpg"
                      alt="Teacher Curriculum Posts"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    Teacher Curriculum Posts
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Use AI to translate curriculum and learning to parents with
                    frequent updates.
                  </p>
                </div>

                {/* Digital Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src="/prototypes/digital2.jpg"
                      alt="Student Blog"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Student Blog</h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Sent to parents to surface what families really want to see.
                  </p>
                </div>

                {/* Digital Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src="/prototypes/digital3.jpg"
                      alt="Student AI Hour"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    Student AI Hour
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400">
                    Students build projects, producing take-home artifacts for
                    parents; frees teacher planning time.
                  </p>
                </div>
              </div>
            </div>

            {/* Higher Fidelity Prototypes */}
            <div className="mx-auto max-w-6xl mt-16">
              <h3 className="text-2xl font-semibold mb-8 text-center text-blue-600">
                Higher Fidelity Prototypes
              </h3>

              {/* Innova AI Section */}
              <div className="mb-16">
                <h4 className="text-xl font-semibold mb-6 text-center">
                  Innova AI
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
                  The Innova AI platform empowers teachers to adapt lesson plans
                  to the Innova approach while enhancing communication with
                  parents about student success. You can access it at the link
                  below.
                </p>
                <div className="flex justify-center">
                  <Link
                    href="/prototype/about"
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Learn More About Innova AI
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Alumni Pathway Highlights */}
              <div>
                <h4 className="text-xl font-semibold mb-6 text-center">
                  Alumni Pathway Highlights
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="relative aspect-[1/1.75] overflow-hidden rounded-lg max-w-[300px] mx-auto">
                    <img
                      src="/prototypes/alumnistories.jpg"
                      alt="Alumni Pathway"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      Our alumni pathway initiative allows parents and teachers
                      to see examples of the journeys that students will take in
                      their education. This would be incorporatede into their
                      professional development experience to help them see that
                      the curriculum is effective. This platform works by:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                          •
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Allowing alumni and current students to upload their
                          stories, projects, and videos
                        </p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                          •
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Users can search by criteria that lets them imagine
                          their own children in the future
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Moving Forward Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Moving Forward
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our learnings and future directions
              </p>
            </div>

            {/* Reflections */}
            <div className="mx-auto max-w-6xl mb-16">
              <h3 className="text-2xl font-semibold mb-8 text-center text-blue-600">
                Reflections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Reflection 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src="/prototypes/reflection1.jpeg"
                      alt="Teacher Impact"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Balance what we're hearing from interviews and higher ups
                    with digging deeper / challenging assumptions
                  </p>
                </div>

                {/* Reflection 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src="/prototypes/reflection2.jpg"
                      alt="Parent Engagement"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    Would love the opportunity to chat with or test prototypes
                    with teachers and parents
                  </p>
                </div>

                {/* Reflection 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                    <img
                      src="/prototypes/reflection3.jpg"
                      alt="Technology Integration"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    More direct solutions: Our solutions feel a bit second-hand
                    right now, and a more direct solution would be difficult
                    logistically but would offer richer insights.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="mx-auto max-w-3xl">
              <h3 className="text-2xl font-semibold mb-8 text-center text-blue-600">
                Next Steps
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                    1
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Test prototypes with Teachers / Parents
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                    2
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Take a bottom-up vs. top-down approach → conduct user
                    interviews / research with teachers and parents
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                    3
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Deeper research into educational differences in Mexico,
                    Peru, Ecuador, and Colombia
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                    4
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Iterate on prototypes based on feedback
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                    5
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Involve the student voice!
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Posters Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Posters
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Check out our final posters from our project fair!
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src="/posters/innova-poster1.jpg"
                  alt="Poster 1"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src="/posters/innova-poster2.jpg"
                  alt="Poster 2"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            © {new Date().getFullYear()} Innova Schools Mexico. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
