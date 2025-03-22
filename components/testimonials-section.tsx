"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Testimonial = {
  id: number
  name: string
  position: string
  company: string
  image: string
  quote: string
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

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

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CTO",
      company: "TechStart Inc.",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Working with this developer was a game-changer for our company. Their technical expertise and problem-solving skills helped us launch our platform ahead of schedule. They have a unique ability to translate complex business requirements into elegant technical solutions.",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Product Manager",
      company: "InnovateSoft",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "I've worked with many developers over my 15-year career, but few have impressed me as much. Their attention to detail, clean code, and commitment to best practices made our collaboration exceptionally smooth. They don't just write code; they craft solutions that address the root of business problems.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "CEO",
      company: "DigitalEdge",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "An exceptional talent who delivered beyond our expectations. They took the time to understand our business goals and created a solution that perfectly aligned with our vision. Their communication skills and transparency throughout the project made them a joy to work with.",
    },
    {
      id: 4,
      name: "David Kim",
      position: "Lead Designer",
      company: "CreativeWorks",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "As a designer, I appreciate developers who can bring my designs to life exactly as envisioned. Their frontend skills are top-notch, and they have a great eye for detail. They suggested improvements that enhanced the user experience while maintaining the design integrity.",
    },
    {
      id: 5,
      name: "Alexandra Peters",
      position: "Project Manager",
      company: "GlobalTech Solutions",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Reliable, professional, and incredibly skilled. They consistently delivered high-quality work on time and within budget. Their ability to adapt to changing requirements and solve complex technical challenges made our project a success.",
    },
  ]

  const nextTestimonial = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 bg-muted/30 transition-all duration-1000 opacity-0 translate-y-10"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            What clients and colleagues have to say about working with me.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="max-w-4xl mx-auto relative" ref={testimonialsRef}>
          <div className="overflow-hidden">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
                className="w-full"
              >
                <Card className="border-none shadow-lg">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 flex-shrink-0">
                        <Image
                          src={testimonials[current].image || "/placeholder.svg"}
                          alt={testimonials[current].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Quote className="h-10 w-10 text-primary/20 mb-4" />
                        <p className="text-lg italic mb-6">{testimonials[current].quote}</p>
                        <div>
                          <h4 className="font-bold text-lg">{testimonials[current].name}</h4>
                          <p className="text-muted-foreground">
                            {testimonials[current].position}, {testimonials[current].company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between mt-8">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevTestimonial}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous testimonial</span>
              </Button>
              <Button variant="outline" size="icon" onClick={nextTestimonial}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next testimonial</span>
              </Button>
            </div>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className={`w-3 h-3 rounded-full p-0 ${current === index ? "bg-primary" : "bg-muted"}`}
                  onClick={() => goToTestimonial(index)}
                >
                  <span className="sr-only">Go to testimonial {index + 1}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

