"use client"

import { useState, useEffect } from "react"
import { X, Download, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { canInstallApp, showInstallPrompt } from "@/lib/pwa-utils"

export default function InstallPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [installable, setInstallable] = useState(false)
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop" | "unknown">("unknown")

  useEffect(() => {
    // Check if we should show the popup (not shown in last 7 days)
    const lastShown = localStorage.getItem("pwa-popup-last-shown")
    const shouldShow = !lastShown || Date.now() - Number.parseInt(lastShown) > 7 * 24 * 60 * 60 * 1000

    // Only show after 5 seconds of page load and if the app is installable
    if (shouldShow) {
      const timer = setTimeout(async () => {
        const installable = await canInstallApp()
        setInstallable(installable)

        if (installable) {
          setIsOpen(true)
          localStorage.setItem("pwa-popup-last-shown", Date.now().toString())
        }
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera

    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setPlatform("ios")
    } else if (/android/i.test(userAgent)) {
      setPlatform("android")
    } else {
      setPlatform("desktop")
    }
  }, [])

  const handleInstall = async () => {
    if (platform === "ios") {
      // For iOS, we just show instructions
      setIsOpen(false)
    } else {
      // For Android and desktop, we can use the install prompt
      const result = await showInstallPrompt()
      if (result && result.outcome === "accepted") {
        setIsOpen(false)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white rounded-xl">
        <div className="relative w-full h-32 bg-gradient-to-r from-amber-500 to-amber-600">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-full border-4 border-white shadow-lg">
            <Image src="/images/logo.png" alt="Bella Vida Barbershop" width={80} height={80} className="rounded-full" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="pt-16 px-6 pb-6 text-center">
          <DialogTitle className="text-xl font-bold mb-2">Installera Bella Vida App</DialogTitle>
          <p className="text-gray-600 mb-6">Få snabb åtkomst till bokning, tjänster och mer direkt från din hemskärm</p>

          {platform === "ios" ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <div className="flex items-center mb-2">
                  <div className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm font-bold">
                    1
                  </div>
                  <p className="text-gray-800 font-medium">Tryck på dela-ikonen</p>
                </div>
                <div className="flex items-center mb-2">
                  <div className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm font-bold">
                    2
                  </div>
                  <p className="text-gray-800 font-medium">Välj "Lägg till på hemskärmen"</p>
                </div>
              </div>

              <Button onClick={() => setIsOpen(false)} className="w-full gold-gradient text-black font-bold">
                Jag förstår
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleInstall}
              className="w-full gold-gradient text-black font-bold flex items-center justify-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Installera nu
            </Button>
          )}

          <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
            <p>Fungerar offline</p>
            <ChevronRight className="h-3 w-3 mx-1" />
            <p>Snabb åtkomst</p>
            <ChevronRight className="h-3 w-3 mx-1" />
            <p>Inga uppdateringar</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
