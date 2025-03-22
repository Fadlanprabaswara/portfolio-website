"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Maximize } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Project = {
  id: number
  title: string
  description: string
  image: string
  category: string[]
  technologies: string[]
  role: string
  impact: string
  liveUrl?: string
  sourceUrl?: string
}

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100")
            entry.target.classList.remove("opacity-0", "translate-y-10")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured e-commerce platform with product management, cart, and checkout functionality.",
      image: "/placeholder.svg?height=600&width=800",
      category: ["web", "frontend", "backend"],
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      role: "Lead Developer",
      impact: "Increased sales by 35% and improved user engagement metrics by 42%.",
      liveUrl: "https://example.com",
      sourceUrl: "https://github.com/yourusername/project",
    },
    {
      id: 2,
      title: "Health & Fitness App",
      description: "Mobile application for tracking workouts, nutrition, and health metrics.",
      image: "/placeholder.svg?height=600&width=800",
      category: ["mobile", "frontend"],
      technologies: ["React Native", "Firebase", "Redux"],
      role: "Frontend Developer",
      impact: "Acquired 50,000+ users within the first 3 months of launch.",
      liveUrl: "https://example.com",
    },
    {
      id: 3,
      title: "Financial Dashboard",
      description: "Interactive dashboard for visualizing financial data and analytics.",
      image: "/placeholder.svg?height=600&width=800",
      category: ["web", "data"],
      technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
      role: "Full Stack Developer",
      impact: "Reduced data analysis time by 60% for financial advisors.",
      liveUrl: "https://example.com",
      sourceUrl: "https://github.com/yourusername/project",
    },
    {
      id: 4,
      title: "Social Media Platform",
      description: "Community platform with real-time messaging and content sharing.",
      image: "/placeholder.svg?height=600&width=800",
      category: ["web", "backend"],
      technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
      role: "Backend Developer",
      impact: "Scaled to handle 100,000+ concurrent users with minimal latency.",
      liveUrl: "https://example.com",
    },
    {
      id: 5,
      title: "AI Content Generator",
      description: "Tool that uses AI to generate marketing content and social media posts.",
      image: "/placeholder.svg?height=600&width=800",
      category: ["web", "ai"],
      technologies: ["Next.js", "OpenAI API", "TailwindCSS"],
      role: "Lead Developer",
      impact: "Saved marketing teams an average of 15 hours per week on content creation.",
      liveUrl: "https://example.com",
      sourceUrl: "https://github.com/yourusername/project",
    },
    {
      id: 6,
      title: "Property Management System",
      description: "Comprehensive system for managing rental properties, tenants, and maintenance.",
      image: "/placeholder.svg?height=600&width=800",
      category: ["web", "fullstack"],
      technologies: ["Angular", "Java Spring", "MySQL"],
      role: "Full Stack Developer",
      impact: "Reduced administrative overhead by 40% for property management companies.",
      liveUrl: "https://example.com",
    },
  ]

  const categories = [
    { id: "all", name: "All" },
    { id: "web", name: "Web" },
    { id: "mobile", name: "Mobile" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "fullstack", name: "Full Stack" },
    { id: "ai", name: "AI" },
    { id: "data", name: "Data" },
  ]

  const filteredProjects =
    selectedCategory === "all" ? projects : projects.filter((project) => project.category.includes(selectedCategory))

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setOpen(true)
  }

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-20 bg-muted/30 transition-all duration-1000 opacity-0 translate-y-10 dark:bg-background/40"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Portfolio</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my recent projects and see how I've helped businesses solve complex problems with innovative
            solutions.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="mb-2"
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden group hover:shadow-lg transition-all duration-300 dark:border-muted"
            >
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="secondary" size="icon" onClick={() => openProjectDetails(project)}>
                    <Maximize className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline">+{project.technologies.length - 3}</Badge>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  {project.liveUrl && (
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.sourceUrl && (
                    <Button variant="outline" size="sm" className="gap-1" asChild>
                      <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found in this category.</p>
          </div>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          {selectedProject && (
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
                <DialogDescription>{selectedProject.description}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="grid gap-4">
                  <div>
                    <h4 className="font-semibold mb-1">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">My Role</h4>
                    <p className="text-muted-foreground">{selectedProject.role}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Impact</h4>
                    <p className="text-muted-foreground">{selectedProject.impact}</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  {selectedProject.liveUrl && (
                    <Button className="gap-2" asChild>
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        View Live Demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.sourceUrl && (
                    <Button variant="outline" className="gap-2" asChild>
                      <a href={selectedProject.sourceUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        View Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  )
}

