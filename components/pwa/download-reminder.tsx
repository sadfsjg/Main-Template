"use client"

import { useState, useEffect } from "react"
import { Download, Share2, Scissors, Clock, Star } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { isAppInstalled, canInstallApp, showInstallPrompt, showIOSInstallInstructions } from "@/lib/pwa-utils"

export default function DownloadReminder() {
  const [open, setOpen] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [installable, setInstallable] = useState(false)

  useEffect(() => {
    // Check if we've already shown the popup recently
    const lastShown = localStorage.getItem("pwa-reminder-shown")
    const lastShownDate = lastShown ? new Date(Number.parseInt(lastShown)) : null
    const now = new Date()

    // If shown in the last 7 days, don't show again
    if (lastShownDate && now.getTime() - lastShownDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return
    }

    // Check if app is already installed
    if (isAppInstalled()) {
      return
    }

    // Check if we're on iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(isIOSDevice)

    // Check if the app can be installed
    canInstallApp().then(setInstallable)

    // Show the popup after 10 seconds (5 seconds on mobile for better engagement)
    const timer = setTimeout(
      () => {
        setOpen(true)
        // Remember that we've shown the popup
        localStorage.setItem("pwa-reminder-shown", Date.now().toString())
      },
      window.innerWidth < 768 ? 5000 : 10000,
    )

    return () => clearTimeout(timer)
  }, [])

  const handleInstall = async () => {
    if (isIOS) {
      showIOSInstallInstructions()
    } else {
      const result = await showInstallPrompt()
      if (result?.outcome === "accepted") {
        setOpen(false)
      }
    }
  }

  const handleDismiss = () => {
    setOpen(false)
  }

  // If the app is not installable and not on iOS, don't show anything
  if (!installable && !isIOS) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-w-[95vw] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Få en bättre upplevelse!</DialogTitle>
          <DialogDescription className="text-center text-base">
            Installera vår app för snabbare åtkomst och exklusiva funktioner
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="relative w-24 h-24 mb-2">
            <Image src="/images/logo.png" alt="Bella Vida Barbershop" fill className="object-contain" />
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-md">
            <div className="flex flex-col items-center p-2 sm:p-3 bg-amber-50 rounded-lg">
              <Scissors className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm text-center font-medium">Boka snabbare</span>
            </div>
            <div className="flex flex-col items-center p-2 sm:p-3 bg-amber-50 rounded-lg">
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm text-center font-medium">Öppettider</span>
            </div>
            <div className="flex flex-col items-center p-2 sm:p-3 bg-amber-50 rounded-lg">
              <Star className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mb-1 sm:mb-2" />
              <span className="text-xs sm:text-sm text-center font-medium">Exklusiva erbjudanden</span>
            </div>
          </div>

          <div className="w-full space-y-3 mt-4">
            <Button
              onClick={handleInstall}
              className="w-full py-4 sm:py-6 text-base sm:text-lg gold-gradient hover:opacity-90 transition-all duration-300 text-black font-bold"
            >
              {isIOS ? <Share2 className="mr-2 h-5 w-5" /> : <Download className="mr-2 h-5 w-5" />}
              {isIOS ? "Lägg till på hemskärmen" : "Installera appen nu"}
            </Button>

            <Button
              onClick={handleDismiss}
              variant="outline"
              className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              Påminn mig senare
            </Button>
          </div>
        </div>

        {isIOS && (
          <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-2 text-sm sm:text-base">Hur du installerar på iOS:</h4>
            <ol className="text-xs sm:text-sm space-y-1 sm:space-y-2 list-decimal pl-4 sm:pl-5">
              <li>
                Tryck på{" "}
                <span className="inline-flex items-center">
                  <Share2 className="h-3 w-3 sm:h-4 sm:w-4 mx-1" />
                </span>{" "}
                dela-knappen
              </li>
              <li>
                Scrolla ner och tryck på <strong>"Lägg till på hemskärmen"</strong>
              </li>
              <li>
                Tryck på <strong>"Lägg till"</strong> i övre högra hörnet
              </li>
            </ol>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
