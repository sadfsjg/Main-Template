"use client"

import { useState, useEffect } from "react"
import { Download, Share2, X } from "lucide-react"
import { isAppInstalled, canInstallApp, handleInstallPrompt, showInstallPrompt } from "@/lib/pwa-utils"

interface InstallPromptProps {
  className?: string
  variant?: "banner" | "button" | "inline"
}

export default function InstallPrompt({ className = "", variant = "banner" }: InstallPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [installable, setInstallable] = useState(false)

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return

    // Check if app is already installed
    if (isAppInstalled()) {
      setShowPrompt(false)
      return
    }

    // Check if we're on iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(isIOSDevice)

    // Check if the app can be installed
    canInstallApp().then(setInstallable)

    // Listen for the beforeinstallprompt event
    window.addEventListener("beforeinstallprompt", handleInstallPrompt)

    // Show the prompt after a delay
    const timer = setTimeout(() => {
      setShowPrompt(true)
    }, 3000)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt)
      clearTimeout(timer)
    }
  }, [])

  const handleInstall = async () => {
    if (isIOS) {
      // Show iOS install instructions via the platform guide
      // This will be handled by the PlatformInstallGuide component
      return
    }

    const result = await showInstallPrompt()
    if (result?.outcome === "accepted") {
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Remember the user's choice for 7 days
    localStorage.setItem("pwa-prompt-dismissed", Date.now().toString())
  }

  if (!showPrompt || (!installable && !isIOS)) return null

  if (variant === "button") {
    return (
      <button
        onClick={handleInstall}
        className={`gold-gradient hover:opacity-90 transition-all duration-300 text-black font-bold px-6 py-3 rounded-xl inline-flex items-center shadow-lg ${className}`}
      >
        <Download className="mr-2 h-5 w-5" />
        Installera App
      </button>
    )
  }

  if (variant === "inline") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <button
          onClick={handleInstall}
          className="bg-amber-500 hover:bg-amber-600 transition-all duration-300 text-black font-bold px-4 py-2 rounded-md flex items-center"
        >
          {isIOS ? <Share2 className="mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />}
          {isIOS ? "Lägg till på hemskärmen" : "Installera App"}
        </button>
        <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-300">
          <X size={20} />
        </button>
      </div>
    )
  }

  // Default banner variant
  return (
    <div className={`bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-4 shadow-lg ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg mb-2 text-white">Installera vår app</h3>
          <p className="text-sm mb-3 text-white/90">
            Få snabb åtkomst till bokning, tjänster och mer direkt från din hemskärm
          </p>
        </div>
        <button onClick={handleDismiss} className="text-white/80 hover:text-white p-1">
          <X size={20} />
        </button>
      </div>
      <button
        onClick={handleInstall}
        className="bg-white text-amber-600 hover:bg-gray-100 transition-all duration-300 font-bold px-4 py-2 rounded-lg inline-flex items-center justify-center shadow-md w-full"
      >
        {isIOS ? <Share2 className="mr-2 h-5 w-5" /> : <Download className="mr-2 h-5 w-5" />}
        {isIOS ? "Lägg till på hemskärmen" : "Installera nu"}
      </button>
    </div>
  )
}
