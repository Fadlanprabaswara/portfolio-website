"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutSection() {
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

  return (
    <section id="about" ref={sectionRef} className="py-20 transition-all duration-1000 opacity-0 translate-y-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            className="w-full lg:w-2/5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Professional photo"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="w-full lg:w-3/5 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold">Professional Summary</h3>
            <p className="text-muted-foreground">
              I'm a passionate Full Stack Developer with over 5 years of experience creating web applications that
              deliver exceptional user experiences. My expertise spans frontend and backend technologies, with a special
              focus on React, Node.js, and modern web frameworks.
            </p>

            <h3 className="text-2xl font-bold">Career Journey</h3>
            <p className="text-muted-foreground">
              My journey began with a degree in Computer Science, followed by roles at startups and established tech
              companies. I've led development teams, mentored junior developers, and delivered projects that have
              positively impacted millions of users.
            </p>

            <h3 className="text-2xl font-bold">My Approach</h3>
            <p className="text-muted-foreground">
              I believe in clean, maintainable code and user-centered design. My approach combines technical excellence
              with business understanding to create solutions that not only work flawlessly but also drive business
              results.
            </p>

            <div className="pt-4">
              <Button className="gap-2" asChild>
                <a href="#" download>
                  <FileText className="h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

