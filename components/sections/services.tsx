"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Scissors,
  BeakerIcon as Beard,
  RadarIcon as Razor,
  Clock,
  Star,
  ExternalLink,
  Phone,
  Calendar,
  X,
  ChevronUp,
  ChevronDown,
  Search,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { useMobile } from "@/hooks/use-mobile"

interface Service {
  id: string
  title: string
  description: string
  duration: string
  price: string
  icon: React.ReactNode
  url: string
  popular?: boolean
  rating?: number
}

const Services = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [iframeError, setIframeError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const dialogContentRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleServices, setVisibleServices] = useState(6)

  // Check scroll position to show/hide scroll to top button
  const handleScroll = () => {
    if (dialogContentRef.current) {
      const scrollTop = dialogContentRef.current.scrollTop
      setShowScrollTop(scrollTop > 300)
    }
  }

  // Scroll to top function for the dialog content
  const scrollToTop = () => {
    if (dialogContentRef.current) {
      dialogContentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const currentDialogContent = dialogContentRef.current
    if (currentDialogContent) {
      currentDialogContent.addEventListener("scroll", handleScroll)
      return () => {
        currentDialogContent.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isDialogOpen])

  const services: Service[] = [
    {
      id: "klippning",
      title: "KLIPPNING",
      description: "Professionell klippning anpassad efter dina önskemål",
      duration: "30 minuter",
      price: "400 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/klippning-2005355",
      popular: true,
      rating: 4.9,
    },
    {
      id: "klippning-10-18",
      title: "KLIPPNING 10-18 ÅR",
      description: "Klippning för ungdomar mellan 10-18 år",
      duration: "30 minuter",
      price: "350 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/klippning-10-18-ar-2027133",
      rating: 4.8,
    },
    {
      id: "barn-klippning",
      title: "BARN KLIPPNING 0-10 ÅR",
      description: "Klippning för barn upp till 10 år",
      duration: "30 minuter",
      price: "320 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/barn-klippning-0-10-ar-2005356",
      rating: 4.8,
    },
    {
      id: "student-klippning",
      title: "STUDENT KLIPPNING",
      description: "Klippning för studenter med studentrabatt",
      duration: "30 minuter",
      price: "350 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/student-klippning-2005366",
      rating: 4.7,
    },
    {
      id: "senior-klippning",
      title: "SENIOR KLIPPNING",
      description: "Klippning för seniorer med seniorrabatt",
      duration: "30 minuter",
      price: "330 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/senior-klippning-2005371",
      rating: 4.9,
    },
    {
      id: "skaggtrim-kort",
      title: "SKÄGG TRIM (KORT)",
      description: "Formning och trimning av kort skägg (0-3 cm)",
      duration: "30 minuter",
      price: "280 kr",
      icon: <Beard className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/skagg-trim-kort-skagg-0-3-cm-2005403",
      rating: 4.8,
    },
    {
      id: "skaggtrim-langt",
      title: "SKÄGG TRIM (LÅNGT)",
      description: "Formning och trimning av långt skägg (över 3 cm)",
      duration: "30 minuter",
      price: "300 kr",
      icon: <Beard className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/skagg-trim-over-3-cm-2005399",
      rating: 4.8,
    },
    {
      id: "rakning",
      title: "TRADITIONELL RAKNING",
      description: "Klassisk rakning med kniv för en slät och fräsch känsla",
      duration: "20 minuter",
      price: "250 kr",
      icon: <Razor className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/traditionell-rakning-med-kniv-2005394",
      rating: 4.7,
    },
    {
      id: "huvud-rakning",
      title: "HUVUD RAKNING",
      description: "Rakning av huvudet för en slät och ren look",
      duration: "20 minuter",
      price: "199 kr",
      icon: <Razor className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/huvud-rakning-2005387",
      rating: 4.6,
    },
    {
      id: "klippning-skagg-kort",
      title: "KLIPPNING & SKÄGG TRIM (KORT)",
      description: "Komplett styling med klippning och kort skäggtrimning",
      duration: "50 minuter",
      price: "550 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/klippning-skagg-trim-kort-skagg-0-2-cm-2005373",
      popular: true,
      rating: 5.0,
    },
    {
      id: "klippning-skagg-langt",
      title: "KLIPPNING & SKÄGG TRIM (LÅNGT)",
      description: "Komplett styling med klippning och långt skäggtrimning",
      duration: "60 minuter",
      price: "600 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/klippning-skagg-trim-langt-skagg-over-2-cm-2005376",
      rating: 4.9,
    },
    {
      id: "klippning-rakning",
      title: "KLIPPNING & TRADITIONELL RAKNING",
      description: "Komplett styling med klippning och traditionell rakning",
      duration: "50 minuter",
      price: "550 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/klippning-traditionell-rakning-med-kniv-2005377",
      rating: 4.8,
    },
    {
      id: "huvud-skagg",
      title: "HUVUD RAKNING & SKÄGG TRIM",
      description: "Komplett styling med huvudrakning och skäggtrimning",
      duration: "50 minuter",
      price: "520 kr",
      icon: <Razor className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/huvud-rakning-skagg-trim-2005390",
      rating: 4.7,
    },
    {
      id: "snaggning",
      title: "SNAGGNING",
      description: "Enkel snaggning för en ren och enkel stil",
      duration: "20 minuter",
      price: "200 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/snaggning-2005413",
      rating: 4.7,
    },
    {
      id: "snaggning-skinfade",
      title: "SNAGGNING MED SKINFADE",
      description: "Snaggning med skinfade för en modern och stilren look",
      duration: "30 minuter",
      price: "400 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/snaggning-med-skinfade-2005409",
      rating: 4.8,
    },
    {
      id: "snaggning-skinfade-skagg",
      title: "SNAGGNING MED SKINFADE & SKÄGG TRIM",
      description: "Komplett styling med snaggning, skinfade och skäggtrimning",
      duration: "50 minuter",
      price: "550 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/snaggning-med-skinfade-skagg-trim-2005411",
      rating: 4.9,
    },
    {
      id: "snaggning-skagg",
      title: "SNAGGNING & SKÄGG TRIM",
      description: "Snaggning kombinerat med skäggtrimning",
      duration: "40 minuter",
      price: "500 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/snaggning-skagg-trim-2005405",
      rating: 4.8,
    },
    {
      id: "snaggning-rakning",
      title: "SNAGGNING & TRADITIONELL RAKNING",
      description: "Snaggning kombinerat med traditionell rakning",
      duration: "40 minuter",
      price: "500 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/snaggning-traditionell-rakning-med-kniv-2005408",
      rating: 4.8,
    },
    {
      id: "huvud-traditionell",
      title: "HUVUDRAKNING & TRADITIONELL RAKNING",
      description: "Komplett styling med huvudrakning och traditionell rakning",
      duration: "40 minuter",
      price: "460 kr",
      icon: <Razor className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/huvudrakning-traditionell-rakning-2005398",
      rating: 4.7,
    },
    {
      id: "student-klippning-skagg",
      title: "STUDENT KLIPPNING & SKÄGG TRIM",
      description: "Komplett styling för studenter med studentrabatt",
      duration: "50 minuter",
      price: "500 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/student-klippning-skagg-trim-valfri-langd-2005385",
      rating: 4.8,
    },
    {
      id: "senior-klippning-skagg",
      title: "SENIOR KLIPPNING & SKÄGG TRIM",
      description: "Komplett styling för seniorer med seniorrabatt",
      duration: "40 minuter",
      price: "450 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/senior-klippning-trim-av-skagg-valfri-langd-2005378",
      rating: 4.8,
    },
    {
      id: "brollop-paket",
      title: "BRÖLLOP & EXKLUSIVA PAKETET",
      description: "Komplett styling för speciella tillfällen",
      duration: "70 minuter",
      price: "700 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/bella-vida-barbershop-49893/brollop-exklusiva-paketet-2005414",
      popular: true,
      rating: 5.0,
    },
  ]

  const handleOpenBooking = (service: Service) => {
    setSelectedService(service)
    setIsDialogOpen(true)
    setIsLoading(true)
    setIframeError(false)
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setIframeError(true)
  }

  const retryLoading = () => {
    if (selectedService) {
      setIsLoading(true)
      setIframeError(false)
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = selectedService.url
        }
      }, 500)
    }
  }

  // Render stars for ratings
  const renderRating = (rating = 0) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${i < Math.floor(rating) ? "text-amber-500 fill-amber-500" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Filter services based on search term
  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const loadMoreServices = () => {
    setVisibleServices((prev) => prev + 6)
  }

  return (
    <section
      id="tjanster"
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-50 rounded-full -translate-x-1/3 translate-y-1/3 opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4 mobile-section-title"
          >
            VÅRA <span className="text-gold">TJÄNSTER</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: "5rem" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-1 gold-gradient mx-auto mb-6 hidden md:block"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Vi erbjuder ett brett utbud av professionella barberartjänster för att möta dina behov. Från klassiska
            klippningar till skäggtrimning och traditionell rakning.
          </motion.p>

          {/* Search input for mobile */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 mb-8 relative max-w-md mx-auto"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Sök tjänst..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-2 px-4 pr-10 rounded-full border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
          >
            <Button
              onClick={() => {
                const service = services.find((s) => s.popular) || services[0]
                handleOpenBooking(service)
              }}
              className="gold-gradient hover:opacity-90 transition-all duration-300 text-black font-bold px-6 py-3 rounded-md shadow-lg hover:shadow-xl flex items-center w-full sm:w-auto"
            >
              <Calendar className="mr-2 h-5 w-5" />
              <span>Boka Online</span>
            </Button>

            <Link
              href="tel:070-455 66 15"
              className="bg-black hover:bg-gray-800 text-white transition-all duration-300 font-bold px-6 py-3 rounded-md shadow-lg hover:shadow-xl flex items-center w-full sm:w-auto justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              <span>Ring Oss</span>
            </Link>
          </motion.div>
        </div>

        {/* Desktop view */}
        {!isMobile ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredServices.map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="border border-gray-100 hover:border-amber-200 transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="mr-3 p-2 bg-amber-50 rounded-full">{service.icon}</div>
                        <h3 className="font-bold text-gray-900">
                          {service.title}
                          {service.popular && (
                            <Badge className="ml-2 gold-gradient text-black font-semibold text-xs">Populär</Badge>
                          )}
                        </h3>
                      </div>
                      <span className="font-bold text-amber-600">{service.price}</span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1 text-amber-400" />
                        <span>{service.duration}</span>
                      </div>
                      {service.rating && renderRating(service.rating)}
                    </div>

                    <div className="mt-4 flex justify-between">
                      <Button
                        onClick={() => handleOpenBooking(service)}
                        variant="outline"
                        className="text-amber-600 hover:text-amber-800 border-amber-200 hover:border-amber-400 hover:bg-amber-50 text-sm font-medium flex items-center"
                      >
                        Boka online
                        <Calendar className="ml-1 h-3 w-3" />
                      </Button>

                      <Link
                        href="tel:070-455 66 15"
                        className="text-gray-600 hover:text-gray-900 text-sm font-medium flex items-center"
                      >
                        Ring för bokning
                        <Phone className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Mobile view */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {filteredServices.slice(0, visibleServices).map((service) => (
              <motion.div key={service.id} variants={itemVariants}>
                <Card className="border border-gray-100 hover:border-amber-200 transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="mr-2 p-2 bg-amber-50 rounded-full">{service.icon}</div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm">
                            {service.title}
                            {service.popular && (
                              <Badge className="ml-1 gold-gradient text-black font-semibold text-[10px]">Populär</Badge>
                            )}
                          </h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1 text-amber-400" />
                            <span>{service.duration}</span>
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-amber-600 text-sm">{service.price}</span>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <Button
                        onClick={() => handleOpenBooking(service)}
                        size="sm"
                        className="text-amber-600 bg-amber-50 hover:bg-amber-100 text-xs font-medium flex items-center h-8 px-3"
                      >
                        Boka
                        <Calendar className="ml-1 h-3 w-3" />
                      </Button>

                      <Link
                        href="tel:070-455 66 15"
                        className="text-gray-600 hover:text-gray-900 text-xs font-medium flex items-center"
                      >
                        Ring
                        <Phone className="ml-1 h-3 w-3" />
                      </Link>

                      {service.rating && renderRating(service.rating)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {filteredServices.length > visibleServices && (
              <div className="flex justify-center mt-6">
                <Button
                  onClick={loadMoreServices}
                  variant="outline"
                  className="text-amber-600 border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                >
                  Visa fler tjänster
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          ref={dialogContentRef}
          className="sm:max-w-[90%] md:max-w-[800px] lg:max-w-[900px] p-0 overflow-hidden bg-white rounded-lg shadow-2xl border-0 w-[95%] max-h-[80vh] h-[80vh] overflow-y-auto"
        >
          <DialogHeader className="p-4 sm:p-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white sticky top-0 z-10">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-xl sm:text-2xl font-bold">{selectedService?.title}</DialogTitle>
                <DialogDescription className="text-white/90 mt-1 text-sm sm:text-base">
                  {selectedService?.description} • {selectedService?.duration} • {selectedService?.price}
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-full h-8 w-8 p-0 bg-white/20 text-white hover:bg-white/30 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          <div className="relative h-[80vh] sm:h-[80vh] md:h-[80vh]">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-4 sm:p-6">
                <div className="w-full max-w-md">
                  <div className="flex items-center justify-center mb-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                  </div>

                  <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
                  <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
                  <Skeleton className="h-4 w-2/3 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto mb-6" />

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Skeleton className="h-12 w-full rounded-md" />
                    <Skeleton className="h-12 w-full rounded-md" />
                  </div>

                  <Skeleton className="h-[300px] sm:h-[400px] w-full rounded-md" />

                  <div className="mt-6 text-center text-gray-500">
                    <p>Laddar bokningssystem från Bokadirekt...</p>
                    <p className="text-sm mt-2">Du kommer snart kunna boka din tid</p>
                  </div>
                </div>
              </div>
            )}

            {iframeError ? (
              <div className="flex flex-col items-center justify-center p-4 sm:p-8 h-full bg-gray-50">
                <div className="text-amber-600 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center">Kunde inte ladda bokningssystemet</h3>
                <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
                  Det verkar som att vi har problem med att ansluta till bokningssystemet just nu.
                </p>
                <div className="flex flex-col gap-4 w-full max-w-xs">
                  <Button className="gold-gradient hover:opacity-90 text-black" onClick={retryLoading}>
                    Försök igen
                  </Button>
                  <Link
                    href={selectedService?.url || "https://www.bokadirekt.se/places/bella-vida-barbershop-49893"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-700 text-center flex items-center justify-center"
                  >
                    <span>Öppna bokningssidan i nytt fönster</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                  <Button variant="outline" className="mt-2" onClick={() => setIsDialogOpen(false)}>
                    Stäng
                  </Button>
                </div>
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={selectedService?.url || "https://www.bokadirekt.se/places/bella-vida-barbershop-49893"}
                title={`Boka ${selectedService?.title}`}
                className="w-full h-full border-0"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "80vh",
                  display: "block",
                  margin: "0 auto",
                  border: "none",
                  overflow: "visible",
                }}
              />
            )}
          </div>

          {/* Scroll to top button */}
          {showScrollTop && (
            <Button
              onClick={scrollToTop}
              className="fixed bottom-4 right-4 rounded-full h-10 w-10 p-0 bg-amber-500 text-white hover:bg-amber-600 shadow-lg z-20"
              aria-label="Scrolla till toppen"
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
          )}
        </DialogContent>
      </Dialog>

      {isMobile && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => scrollToSection("galleri")}
            aria-label="Scrolla till galleri"
            className="flex flex-col items-center text-amber-600"
          >
            <span className="text-sm mb-1">Galleri</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      )}
    </section>
  )
}

export default Services
