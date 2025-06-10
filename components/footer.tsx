"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Download, ChevronRight, Heart, Phone, MapPin, Mail, Clock, ChevronUp } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import PlatformInstallGuide from "@/components/pwa/platform-install-guide"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstallable, setIsInstallable] = useState(false)
  const isMobile = useMobile()
  const [showInstallGuide, setShowInstallGuide] = useState(false)

  // Handle PWA installation
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      // Update UI to show install button
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstallable(false)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // The deferred prompt isn't available
      // Show instructions for manual installation
      setShowInstallGuide(true)
      return
    }

    // Show the install prompt
    deferredPrompt.prompt()
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    // We no longer need the prompt
    setDeferredPrompt(null)
    // Hide the install button
    if (outcome === "accepted") {
      setIsInstallable(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const quickLinks = [
    { name: "Hem", href: "#" },
    { name: "Om Oss", href: "#om" },
    { name: "Tjänster", href: "#tjänster" },
    { name: "Galleri", href: "#galleri" },
    { name: "Recensioner", href: "#recensioner" },
    { name: "Kontakt", href: "#kontakt" },
  ]

  return (
    <footer
      id="footer"
      className="bg-gradient-to-b from-gray-900 to-black text-white pt-12 pb-0 relative overflow-hidden w-full"
      style={{ marginBottom: 0 }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 gold-gradient opacity-30"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-900/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-900/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10 w-full">
        {/* Mobile App Install Banner */}
        {isMobile && (
          <div className="mb-8 mx-auto max-w-md">
            <div className="gold-gradient rounded-xl p-4 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <h3 className="font-bold text-lg mb-2 text-black">Installera vår app</h3>
              <p className="text-sm mb-3 text-black/90">
                Få snabb åtkomst till bokning, tjänster och mer direkt från din hemskärm
              </p>
              <button
                onClick={() => {
                  if (isInstallable && deferredPrompt) {
                    handleInstallClick()
                  } else {
                    setShowInstallGuide(true)
                  }
                }}
                className="bg-white text-amber-600 hover:bg-gray-100 transition-all duration-300 font-bold px-4 py-2 rounded-lg inline-flex items-center justify-center shadow-md w-full hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative mr-2">
                  <Download className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                </div>
                Ladda Ner Appen
              </button>
            </div>
          </div>
        )}

        {/* Logo and Description - Centered on mobile */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative h-20 w-20 md:h-24 md:w-24 mb-4 hover:scale-105 transition-transform duration-300">
            <Image
              src="/images/logo.png"
              alt="Bella Vida Barbershop Logo"
              fill
              className="object-contain drop-shadow-lg"
            />
          </div>
          <p className="text-gray-300 max-w-md mb-6 text-sm md:text-base">
            Med flera års erfarenhet samt en brinnande passion för barbering så kan du förvänta dig högklassiga
            tjänster.
          </p>
          {!isMobile && (
            <div className="mb-6">
              <button
                onClick={() => {
                  if (isInstallable && deferredPrompt) {
                    handleInstallClick()
                  } else {
                    setShowInstallGuide(true)
                  }
                }}
                className={`${
                  isInstallable ? "gold-gradient text-black" : "bg-gray-800 hover:bg-gray-700 text-white"
                } transition-all duration-300 font-bold px-6 py-3 rounded-xl inline-flex items-center shadow-lg hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="relative mr-2">
                  <Download className="h-5 w-5" />
                  {!isInstallable && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
                  )}
                </div>
                Ladda Ner Appen
              </button>
            </div>
          )}
        </div>

        {/* Contact Info and Quick Links - Grid on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Contact Info */}
          <div className="glass-effect-dark p-5 rounded-xl hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-bold mb-4 text-center md:text-left">Kontakta Oss</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-amber-500 flex-shrink-0" />
                <Link
                  href="tel:070-455 66 15"
                  className="text-gray-300 hover:text-amber-400 transition-colors animated-underline"
                >
                  070-455 66 15
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-amber-500 flex-shrink-0" />
                <Link
                  href="mailto:mechofarouh5@gmail.com"
                  className="text-gray-300 hover:text-amber-400 transition-colors animated-underline"
                >
                  mechofarouh5@gmail.com
                </Link>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 text-amber-500 flex-shrink-0 mt-1" />
                <span className="text-gray-300">Lantmätargränd 26, 553 20 Jönköping</span>
              </li>
            </ul>
          </div>

          {/* Quick Links - Only show on desktop */}
          {!isMobile && (
            <div className="glass-effect-dark p-5 rounded-xl hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-bold mb-4 text-center md:text-left">Snabblänkar</h3>
              <ul className="grid grid-cols-2 gap-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-amber-400 transition-colors duration-300 flex items-center animated-underline"
                    >
                      <ChevronRight className="h-4 w-4 mr-1 text-amber-500" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Opening Hours */}
          <div
            className={`glass-effect-dark p-5 rounded-xl hover:shadow-lg transition-all duration-300 ${isMobile ? "col-span-1" : ""}`}
          >
            <h3 className="text-lg font-bold mb-4 text-center md:text-left">Öppettider</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-gray-400">Måndag - Fredag:</span>
                </div>
                <span className="font-medium">09:00 - 19:00</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-gray-400">Lördag:</span>
                </div>
                <span className="font-medium">10:00 - 16:00</span>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-gray-400">Söndag:</span>
                </div>
                <span className="font-medium">11:00 - 16:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and Credits */}
        <div className="border-t border-gray-800 pt-6 pb-16 md:pb-8 text-center">
          <p className="text-gray-400 mb-2 text-sm">
            © {currentYear} Bella Vida Barbershop. Alla rättigheter förbehållna.
          </p>
          <p className="text-gray-600 text-xs flex items-center justify-center mb-0">
            Skapad med <Heart className="h-3 w-3 mx-1 text-red-500 fill-red-500" /> i Jönköping
          </p>
        </div>
      </div>

      <PlatformInstallGuide isOpen={showInstallGuide} onClose={() => setShowInstallGuide(false)} />

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-4 bg-amber-500 text-white rounded-full p-3 shadow-lg z-50 hover:bg-amber-600 transition-all hover:-translate-y-1 ${
          isMobile ? "bottom-20" : "bottom-4"
        }`}
        aria-label="Scrolla till toppen"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </footer>
  )
}

export default Footer
