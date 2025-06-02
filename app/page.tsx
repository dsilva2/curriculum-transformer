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
