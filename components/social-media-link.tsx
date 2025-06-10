"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"

interface SocialMediaLinkProps {
  href: string
  appUrl?: string
  className?: string
  children: React.ReactNode
  ariaLabel: string
}

export default function SocialMediaLink({ href, appUrl, className, children, ariaLabel }: SocialMediaLinkProps) {
  const isMobile = useMobile()
  const [isAppInstalled, setIsAppInstalled] = useState(false)

  // Function to handle opening the app or website
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile && appUrl) {
      e.preventDefault()

      // Try to open the app first
      const now = Date.now()
      const timeoutDuration = 1000

      // Create a hidden iframe to try opening the app
      const iframe = document.createElement("iframe")
      iframe.style.display = "none"
      document.body.appendChild(iframe)

      // Set up a timeout to redirect to the web URL if the app doesn't open
      const timeoutId = setTimeout(() => {
        if (Date.now() - now < timeoutDuration + 100) {
          // App not installed, redirect to web URL
          window.location.href = href
        }
      }, timeoutDuration)

      // Try to open the app
      iframe.onload = () => {
        clearTimeout(timeoutId)
      }

      iframe.src = appUrl

      // Clean up the iframe after a short delay
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 1500)
    }
  }

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}
