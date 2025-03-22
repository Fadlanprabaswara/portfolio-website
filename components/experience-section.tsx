"use client";

import { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

type Experience = {
  id: number;
  company: string;
  position: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
};

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const experiences: Experience[] = [
    {
      id: 1,
      company: "Tech Innovations Inc.",
      position: "Senior Full Stack Developer",
      period: "Jan 2021 - Present",
      location: "San Francisco, CA",
      description:
        "Leading development of enterprise SaaS applications and mentoring junior developers.",
      achievements: [
        "Led a team of 5 developers to deliver a major platform upgrade that increased user engagement by 40%",
        "Implemented CI/CD pipeline that reduced deployment time by 70%",
        "Optimized database queries resulting in 50% faster page load times",
        "Introduced automated testing that reduced bugs in production by 60%",
      ],
      technologies: [
        "React",
        "Node.js",
        "TypeScript",
        "MongoDB",
        "AWS",
        "Docker",
      ],
    },
    {
      id: 2,
      company: "Digital Solutions LLC",
      position: "Full Stack Developer",
      period: "Mar 2018 - Dec 2020",
      location: "Austin, TX",
      description:
        "Developed and maintained web applications for clients across various industries.",
      achievements: [
        "Built an e-commerce platform that increased client's online sales by 200%",
        "Developed a custom CRM system that improved customer service response time by 35%",
        "Created mobile-responsive designs that increased mobile user engagement by 60%",
        "Integrated payment gateways and third-party APIs for seamless user experience",
      ],
      technologies: [
        "JavaScript",
        "React",
        "Express",
        "PostgreSQL",
        "Redux",
        "Firebase",
      ],
    },
    {
      id: 3,
      company: "WebCraft Studios",
      position: "Frontend Developer",
      period: "Jun 2016 - Feb 2018",
      location: "Seattle, WA",
      description:
        "Focused on creating responsive and accessible user interfaces for web applications.",
      achievements: [
        "Redesigned the company website resulting in 45% increase in conversion rate",
        "Implemented accessibility improvements that ensured WCAG 2.1 AA compliance",
        "Developed reusable component library that accelerated development time by 30%",
        "Collaborated with UX designers to implement pixel-perfect designs",
      ],
      technologies: [
        "HTML/CSS",
        "JavaScript",
        "Angular",
        "Sass",
        "Bootstrap",
        "Git",
      ],
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 transition-all duration-1000 opacity-0 translate-y-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Professional Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My career journey and the impactful projects I've contributed to
            over the years.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-muted-foreground/20 pl-8 ml-4 space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative">
                <div className="absolute -left-12 mt-1.5 h-6 w-6 rounded-full border-2 border-primary bg-background"></div>

                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                        <h3 className="text-xl font-bold">{exp.position}</h3>
                        <Badge variant="outline">{exp.period}</Badge>
                      </div>
                      <div className="flex items-center text-muted-foreground mb-4">
                        <span className="font-medium">{exp.company}</span>
                        <span className="mx-2">•</span>
                        <span>{exp.location}</span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {exp.description}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Key Achievements:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <Badge key={i} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
