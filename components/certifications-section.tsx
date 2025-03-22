"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Download, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Certification = {
  id: number
  name: string
  organization: string
  date: string
  expiration?: string
  image: string
  verificationUrl: string
  skills: string[]
  pdfUrl?: string
}

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)
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

  const certifications: Certification[] = [
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      organization: "Amazon Web Services",
      date: "January 2023",
      expiration: "January 2026",
      image: "/placeholder.svg?height=400&width=600",
      verificationUrl: "https://example.com/verify",
      skills: ["Cloud Architecture", "AWS Services", "Security", "Networking"],
      pdfUrl: "#",
    },
    {
      id: 2,
      name: "Professional Scrum Master I",
      organization: "Scrum.org",
      date: "March 2022",
      image: "/placeholder.svg?height=400&width=600",
      verificationUrl: "https://example.com/verify",
      skills: ["Agile Methodologies", "Scrum Framework", "Team Leadership"],
      pdfUrl: "#",
    },
    {
      id: 3,
      name: "Google Professional Cloud Developer",
      organization: "Google Cloud",
      date: "June 2023",
      expiration: "June 2025",
      image: "/placeholder.svg?height=400&width=600",
      verificationUrl: "https://example.com/verify",
      skills: ["Google Cloud Platform", "Cloud Development", "Containerization"],
      pdfUrl: "#",
    },
    {
      id: 4,
      name: "React Developer Certification",
      organization: "Meta",
      date: "September 2022",
      image: "/placeholder.svg?height=400&width=600",
      verificationUrl: "https://example.com/verify",
      skills: ["React.js", "Frontend Development", "State Management", "Hooks"],
      pdfUrl: "#",
    },
    {
      id: 5,
      name: "Certified Kubernetes Administrator",
      organization: "Cloud Native Computing Foundation",
      date: "November 2022",
      expiration: "November 2025",
      image: "/placeholder.svg?height=400&width=600",
      verificationUrl: "https://example.com/verify",
      skills: ["Kubernetes", "Container Orchestration", "Cloud Native", "DevOps"],
      pdfUrl: "#",
    },
    {
      id: 6,
      name: "MongoDB Certified Developer",
      organization: "MongoDB University",
      date: "April 2023",
      image: "/placeholder.svg?height=400&width=600",
      verificationUrl: "https://example.com/verify",
      skills: ["MongoDB", "NoSQL Databases", "Data Modeling", "Aggregation"],
      pdfUrl: "#",
    },
  ]

  const viewCertificate = (cert: Certification) => {
    setSelectedCert(cert)
    setOpen(true)
  }

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="py-20 transition-all duration-1000 opacity-0 translate-y-10"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications that validate my expertise and commitment to continuous learning.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative h-48 bg-muted">
                <Image src={cert.image || "/placeholder.svg"} alt={cert.name} fill className="object-contain p-4" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">{cert.name}</h3>
                <p className="text-muted-foreground mb-3">{cert.organization}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {cert.date}
                    {cert.expiration && ` - ${cert.expiration}`}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {cert.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                  {cert.skills.length > 3 && <Badge variant="outline">+{cert.skills.length - 3}</Badge>}
                </div>
              </CardContent>
              <CardFooter className="px-6 pb-6 pt-0 flex gap-2">
                <Button variant="outline" size="sm" className="gap-1" onClick={() => viewCertificate(cert)}>
                  View Details
                </Button>
                {cert.verificationUrl && (
                  <Button variant="outline" size="sm" className="gap-1" asChild>
                    <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Verify
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          {selectedCert && (
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{selectedCert.name}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="relative h-[250px] bg-muted rounded-lg">
                  <Image
                    src={selectedCert.image || "/placeholder.svg"}
                    alt={selectedCert.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                <div className="grid gap-4">
                  <div>
                    <h4 className="font-semibold mb-1">Organization</h4>
                    <p className="text-muted-foreground">{selectedCert.organization}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Date Issued</h4>
                    <p className="text-muted-foreground">{selectedCert.date}</p>
                  </div>

                  {selectedCert.expiration && (
                    <div>
                      <h4 className="font-semibold mb-1">Expiration</h4>
                      <p className="text-muted-foreground">{selectedCert.expiration}</p>
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold mb-1">Skills Validated</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  {selectedCert.pdfUrl && (
                    <Button className="gap-2" asChild>
                      <a href={selectedCert.pdfUrl} download>
                        <Download className="h-4 w-4" />
                        Download Certificate
                      </a>
                    </Button>
                  )}
                  {selectedCert.verificationUrl && (
                    <Button variant="outline" className="gap-2" asChild>
                      <a href={selectedCert.verificationUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Verify Certificate
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

