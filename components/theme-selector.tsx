"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, CircleCheck } from "lucide-react"

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const themes = [
    { name: "Light", value: "light", icon: Sun },
    { name: "Dark", value: "dark", icon: Moon },
    { name: "Blue Dark", value: "blue-dark", icon: Moon },
    { name: "Purple Dark", value: "purple-dark", icon: Moon },
    { name: "Green Dark", value: "green-dark", icon: Moon },
  ]

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Select theme">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Select theme</span>
      </Button>
    )
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[0]
  const CurrentIcon = currentTheme.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Select theme">
          <CurrentIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Select theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <t.icon className="h-4 w-4" />
            <span>{t.name}</span>
            {theme === t.value && <CircleCheck className="ml-auto h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

