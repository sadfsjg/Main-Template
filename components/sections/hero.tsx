"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Scissors, Clock, Star, Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToSection = (id: string) => {
    // Map special character IDs to ASCII versions
    const idMap: Record<string, string> = {
      tjänster: "tjanster",
    }

    // Use the ASCII version for element lookup
    const lookupId = idMap[id] || id

    const element = document.getElementById(lookupId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Bella Vida Barbershop"
          fill
          priority
          className={`object-cover ${isMobile ? "object-[center_30%]" : "object-[center_20%]"}`}
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${
            isMobile ? "from-black/90 via-black/70 to-black/90" : "from-black/80 via-black/60 to-black/80"
          }`}
        />
      </div>

      <div className="container mx-auto px-4 z-10 text-center pt-16 md:pt-20 flex flex-col h-full justify-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 md:mb-8 mx-auto"
        >
          <Image
            src="/images/logo.png"
            alt="Bella Vida Barbershop Logo"
            width={isMobile ? 160 : 220}
            height={isMobile ? 160 : 220}
            className="mx-auto drop-shadow-2xl"
            priority
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight drop-shadow-xl"
        >
          DIN NÖJDHET ÄR <span className="text-gold">VÅRAT NÖJE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 md:mb-10 drop-shadow-lg"
        >
          Med flera års erfarenhet samt en brinnande passion för barbering så kan du förvänta dig högklassiga tjänster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-8 md:mb-16"
        >
          <Button onClick={() => scrollToSection("tjänster")} className="btn-primary h-[56px] w-full sm:w-[220px]">
            Boka Tid Nu
          </Button>

          <Button
            onClick={() => (window.location.href = "tel:070-455 66 15")}
            className="btn-secondary h-[56px] w-full sm:w-[220px]"
          >
            <Phone className="mr-2 h-5 w-5" />
            Ring Oss
          </Button>
        </motion.div>

        {isMobile ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            className="grid grid-cols-1 gap-3 max-w-md mx-auto mb-8"
          >
            <div className="glass-effect-dark p-4 rounded-lg border border-white/10 flex items-center">
              <Scissors className="h-8 w-8 text-amber-400 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-white font-semibold text-base mb-1">Premium Klippning</h3>
                <p className="text-gray-300 text-xs">Professionell styling med fokus på detaljer</p>
              </div>
            </div>

            <div className="glass-effect-dark p-4 rounded-lg border border-white/10 flex items-center">
              <Clock className="h-8 w-8 text-amber-400 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-white font-semibold text-base mb-1">Flexibla Tider</h3>
                <p className="text-gray-300 text-xs">Öppet alla dagar i veckan för din bekvämlighet</p>
              </div>
            </div>

            <div className="glass-effect-dark p-4 rounded-lg border border-white/10 flex items-center">
              <Star className="h-8 w-8 text-amber-400 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-white font-semibold text-base mb-1">Nöjda Kunder</h3>
                <p className="text-gray-300 text-xs">Över 1000+ nöjda kunder och 5-stjärniga recensioner</p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          >
            <div className="glass-effect-dark p-6 rounded-lg border border-white/10 flex flex-col items-center hover-lift">
              <Scissors className="h-10 w-10 text-amber-400 mb-3" />
              <h3 className="text-white font-semibold text-lg mb-1">Premium Klippning</h3>
              <p className="text-gray-300 text-sm">Professionell styling med fokus på detaljer</p>
            </div>

            <div className="glass-effect-dark p-6 rounded-lg border border-white/10 flex flex-col items-center hover-lift">
              <Clock className="h-10 w-10 text-amber-400 mb-3" />
              <h3 className="text-white font-semibold text-lg mb-1">Flexibla Tider</h3>
              <p className="text-gray-300 text-sm">Öppet alla dagar i veckan för din bekvämlighet</p>
            </div>

            <div className="glass-effect-dark p-6 rounded-lg border border-white/10 flex flex-col items-center hover-lift">
              <Star className="h-10 w-10 text-amber-400 mb-3" />
              <h3 className="text-white font-semibold text-lg mb-1">Nöjda Kunder</h3>
              <p className="text-gray-300 text-sm">Över 1000+ nöjda kunder och 5-stjärniga recensioner</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce">
        <button
          onClick={() => scrollToSection("om")}
          aria-label="Scrolla ner"
          className="text-white hover:text-amber-400 transition-colors bg-black/30 p-2 rounded-full"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  )
}

export default Hero
