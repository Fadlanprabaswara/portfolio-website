"use client"

import { useState, useEffect } from "react"
import { ThemeSelector } from "@/components/theme-selector"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Certifications", href: "#certifications" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const scrollToSection = (sectionId: string) => {
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }

    // Remove the # from the ID
    const id = sectionId.replace("#", "")
    const element = document.getElementById(id)

    if (element) {
      // Smooth scroll to the element
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm dark:bg-background/90" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("#hero")}
          className="text-2xl font-bold bg-transparent border-none cursor-pointer"
        >
          Portfolio
        </button>

        {isMobile ? (
          <>
            <div className="flex items-center gap-2">
              <ThemeSelector />
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-background shadow-md p-4 flex flex-col gap-2 dark:border-t dark:border-border">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="px-4 py-2 text-left hover:bg-accent rounded-md transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <ThemeSelector />
          </nav>
        )}
      </div>
    </header>
  )
}

