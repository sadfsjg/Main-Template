"use client"

import { useEffect, useState } from "react"
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
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source
            src="https://fvega0dwq1jnr8l4.public.blob.vercel-storage.com/Hero-Background-kSJqn1zM5mY9B0LyFJ52omusZsy1G2.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-800/80 to-slate-900/90" />
      </div>

      <div className="container mx-auto px-4 z-10 text-center pt-16 md:pt-20 flex flex-col h-full justify-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 md:mb-8 mx-auto"
        >
          <img
            src="https://fvega0dwq1jnr8l4.public.blob.vercel-storage.com/logo-LfwF1WGknmDvZTika58ZPF9PDceuCD.png"
            alt="Samos Barbershop Logo"
            className="mx-auto drop-shadow-2xl h-32 w-auto md:h-40"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-3xl md:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight drop-shadow-xl"
        >
          PROFESSIONELL <span className="text-blue-400">FRISÖR & BARBERARE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 md:mb-10 drop-shadow-lg"
        >
          Grundat 2010 - Vi har flera års erfarenhet av att klippa och forma alla typer av hår och skägg. 
          Centralt beläget med fri parkering.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-8 md:mb-16"
        >
          <Button 
            onClick={() => scrollToSection("tjanster")} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-[56px] w-full sm:w-[220px]"
          >
            Boka Tid Nu
          </Button>

          <Button
            onClick={() => (window.location.href = "tel:036-12 71 12")}
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-[56px] w-full sm:w-[220px]"
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
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 flex items-center">
              <Scissors className="h-8 w-8 text-blue-400 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-white font-semibold text-base mb-1">Expertis Sedan 2010</h3>
                <p className="text-gray-300 text-xs">Över 14 års erfarenhet av professionell frisering</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 flex items-center">
              <Clock className="h-8 w-8 text-blue-400 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-white font-semibold text-base mb-1">Centralt Läge</h3>
                <p className="text-gray-300 text-xs">Klostergatan 50B, Torpa - Fri parkering</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20 flex items-center">
              <Star className="h-8 w-8 text-blue-400 mr-3 flex-shrink-0" />
              <div className="text-left">
                <h3 className="text-white font-semibold text-base mb-1">Nöjda Kunder</h3>
                <p className="text-gray-300 text-xs">Vårt mål är att alla går härifrån med ett leende</p>
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
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 flex flex-col items-center hover:bg-white/15 transition-all duration-300">
              <Scissors className="h-10 w-10 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold text-lg mb-1">Expertis Sedan 2010</h3>
              <p className="text-gray-300 text-sm text-center">Över 14 års erfarenhet av professionell frisering</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 flex flex-col items-center hover:bg-white/15 transition-all duration-300">
              <Clock className="h-10 w-10 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold text-lg mb-1">Centralt Läge</h3>
              <p className="text-gray-300 text-sm text-center">Klostergatan 50B, Torpa - Fri parkering</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 flex flex-col items-center hover:bg-white/15 transition-all duration-300">
              <Star className="h-10 w-10 text-blue-400 mb-3" />
              <h3 className="text-white font-semibold text-lg mb-1">Nöjda Kunder</h3>
              <p className="text-gray-300 text-sm text-center">Vårt mål är att alla går härifrån med ett leende</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-bounce">
        <button
          onClick={() => scrollToSection("om")}
          aria-label="Scrolla ner"
          className="text-white hover:text-blue-400 transition-colors bg-black/30 p-2 rounded-full"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </div>
    </section>
  )
}

export default Hero