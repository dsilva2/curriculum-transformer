"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Header } from "@/components/Header";

interface TeamMember {
  name: string;
  roles: string[];
  image: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Hannah Griswold",
    roles: [
      "B.A. Political Science",
      "M.A. Sustainability Science and Practice ",
    ],
    image: "/team/hannah-headshot.jpeg",
    description: "",
  },
  {
    name: "Antonio Hernandez",
    roles: [
      "M.A. Public Policy",
      "M.A. Policy, Organization, and Leadership Studies",
    ],
    image: "/team/antonio-headshot.jpeg",
    description: "",
  },
  {
    name: "Marla Ross",
    roles: ["M.S. Learning Design and Technology"],
    image: "/team/marla-headshot.jpeg",
    description: "",
  },
  {
    name: "Drew Silva",
    roles: ["M.S. Computer Science"],
    image: "/team/drew-headshot.jpeg",
    description: "",
  },
];

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Team
            </h1>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Meet the team working with Innova Schools MX
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription className="flex flex-col gap-1">
                        {member.roles.map((role, index) => (
                          <span key={index} className="text-sm">
                            {role}
                          </span>
                        ))}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Innova Schools Mexico. All rights
          reserved.
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
  );
}
