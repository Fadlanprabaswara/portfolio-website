"use client"

import { useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

type Skill = {
  name: string
  level: number
}

type SkillCategory = {
  id: string
  name: string
  skills: Skill[]
}

export default function SkillsSection() {
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

  const skillCategories: SkillCategory[] = [
    {
      id: "frontend",
      name: "Frontend",
      skills: [
        { name: "HTML/CSS", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "React", level: 92 },
        { name: "TypeScript", level: 85 },
        { name: "Next.js", level: 88 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Vue.js", level: 75 },
        { name: "Angular", level: 70 },
      ],
    },
    {
      id: "backend",
      name: "Backend",
      skills: [
        { name: "Node.js", level: 88 },
        { name: "Express", level: 85 },
        { name: "Python", level: 80 },
        { name: "Django", level: 75 },
        { name: "Java", level: 70 },
        { name: "Spring Boot", level: 65 },
        { name: "PHP", level: 60 },
        { name: "Ruby on Rails", level: 55 },
      ],
    },
    {
      id: "database",
      name: "Database",
      skills: [
        { name: "MongoDB", level: 90 },
        { name: "PostgreSQL", level: 85 },
        { name: "MySQL", level: 80 },
        { name: "Redis", level: 75 },
        { name: "Firebase", level: 85 },
        { name: "GraphQL", level: 80 },
      ],
    },
    {
      id: "devops",
      name: "DevOps & Tools",
      skills: [
        { name: "Git", level: 95 },
        { name: "Docker", level: 85 },
        { name: "Kubernetes", level: 75 },
        { name: "AWS", level: 80 },
        { name: "CI/CD", level: 85 },
        { name: "Linux", level: 80 },
        { name: "Terraform", level: 70 },
      ],
    },
    {
      id: "design",
      name: "Design",
      skills: [
        { name: "Figma", level: 90 },
        { name: "Adobe XD", level: 85 },
        { name: "Photoshop", level: 75 },
        { name: "Illustrator", level: 70 },
        { name: "UI/UX Design", level: 85 },
        { name: "Responsive Design", level: 95 },
      ],
    },
  ]

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 bg-muted/30 transition-all duration-1000 opacity-0 translate-y-10 dark:bg-background/40"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across various domains.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <Tabs defaultValue="frontend" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            {skillCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {skillCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-6">
                    {category.skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-6">Additional Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Agile Methodologies",
              "Scrum",
              "RESTful APIs",
              "Microservices",
              "Testing (Jest, Cypress)",
              "Performance Optimization",
              "SEO",
              "Accessibility (WCAG)",
              "WebSockets",
              "OAuth",
              "JWT",
              "Responsive Design",
              "Progressive Web Apps",
              "Mobile Development",
            ].map((skill) => (
              <span key={skill} className="px-4 py-2 bg-muted rounded-full text-sm font-medium dark:bg-secondary/80">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

