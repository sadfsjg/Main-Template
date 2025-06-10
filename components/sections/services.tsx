"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Scissors,
  Users,
  User,
  Clock,
  Star,
  ExternalLink,
  Phone,
  Calendar,
  X,
  ChevronUp,
  ChevronDown,
  Search,
  Baby,
  Crown,
  GraduationCap,
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
  category: string
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
  const [selectedCategory, setSelectedCategory] = useState("alla")

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
    // Barnklippning
    {
      id: "barnklippning-flickor",
      title: "BARNKLIPPNING FLICKOR (0-12 år)",
      description: "Professionell klippning för flickor upp till 12 år",
      duration: "30 minuter",
      price: "400 kr",
      icon: <Baby className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/barnklippning-0-12-ar-flickor-1486880",
      rating: 4.9,
      category: "barn",
    },
    {
      id: "barnklippning-pojkar",
      title: "BARNKLIPPNING POJKAR (0-12 år)",
      description: "Professionell klippning för pojkar upp till 12 år",
      duration: "30 minuter",
      price: "330 kr",
      icon: <Baby className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/barnklippning-0-12-ar-pojkar-1272146",
      rating: 4.8,
      category: "barn",
    },
    // Damklippning
    {
      id: "damklippning-kort",
      title: "DAMKLIPPNING KORT (0-5 cm)",
      description: "Professionell klippning för kort hår",
      duration: "30 minuter",
      price: "440 kr",
      icon: <Users className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/damklippning-kort-0-5-cm-1272390",
      popular: true,
      rating: 4.9,
      category: "dam",
    },
    {
      id: "damklippning-lang",
      title: "DAMKLIPPNING LÅNG (över 5 cm)",
      description: "Professionell klippning för långt hår",
      duration: "60 minuter",
      price: "500 kr",
      icon: <Users className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/damklippning-lang-over-5-cm-1272391",
      rating: 4.8,
      category: "dam",
    },
    // Herrklippning
    {
      id: "herrklippning-standard",
      title: "HERRKLIPPNING STANDARD",
      description: "Klassisk herrklippning anpassad efter dina önskemål",
      duration: "30 minuter",
      price: "440 kr",
      icon: <User className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/herrklippning-1272142",
      popular: true,
      rating: 5.0,
      category: "herr",
    },
    {
      id: "herrklippning-pensionar",
      title: "HERRKLIPPNING PENSIONÄR",
      description: "Herrklippning med pensionärsrabatt",
      duration: "30 minuter",
      price: "300 kr",
      icon: <Crown className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/herrklippning-pensionar--1272145",
      rating: 4.9,
      category: "herr",
    },
    {
      id: "herrklippning-student",
      title: "HERRKLIPPNING STUDENT",
      description: "Herrklippning med studentrabatt",
      duration: "30 minuter",
      price: "350 kr",
      icon: <GraduationCap className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/herrklippning-student--1272147",
      rating: 4.8,
      category: "herr",
    },
    // Herrklippning & Skägg
    {
      id: "herrklippning-skagg-kort",
      title: "HERRKLIPPNING & SKÄGG KORT (0-2 cm)",
      description: "Komplett styling med klippning och kort skäggtrimning",
      duration: "60 minuter",
      price: "590 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/herrklippning-skagg-kort-skagg-0-2-cm-1272389",
      popular: true,
      rating: 5.0,
      category: "herr",
    },
    {
      id: "herrklippning-skagg-langt",
      title: "HERRKLIPPNING & SKÄGG LÅNGT (över 2 cm)",
      description: "Komplett styling med klippning och långt skäggtrimning",
      duration: "60 minuter",
      price: "600 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/herrklippning-skagg-langt-skagg-over-2-cm-1289620",
      rating: 4.9,
      category: "herr",
    },
    {
      id: "herrklippning-skagg-pensionar",
      title: "HERRKLIPPNING & SKÄGG PENSIONÄR",
      description: "Komplett styling för pensionärer",
      duration: "30 minuter",
      price: "400 kr",
      icon: <Crown className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/herrklippning-skagg-pensionar--1272148",
      rating: 4.8,
      category: "herr",
    },
    {
      id: "herrklippning-skagg-student",
      title: "HERRKLIPPNING & SKÄGG STUDENT",
      description: "Komplett styling för studenter",
      duration: "60 minuter",
      price: "500 kr",
      icon: <GraduationCap className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/herrklippning-skagg-student--1272461",
      rating: 4.8,
      category: "herr",
    },
    // Huvudrakning
    {
      id: "huvud-rakning",
      title: "HUVUDRAKNING",
      description: "Professionell huvudrakning för en slät finish",
      duration: "30 minuter",
      price: "350 kr",
      icon: <User className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/huvud-rakning-1415774",
      rating: 4.7,
      category: "special",
    },
    {
      id: "huvud-rakning-skagg",
      title: "HUVUDRAKNING + SKÄGG",
      description: "Komplett styling med huvudrakning och skäggtrimning",
      duration: "60 minuter",
      price: "600 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/huvud-rakning-skagg-1415775",
      rating: 4.8,
      category: "special",
    },
    // Skägg & Rakning
    {
      id: "skagg-rakning",
      title: "SKÄGG & RAKNING",
      description: "Endast skägg- och rakningsservice",
      duration: "30 minuter",
      price: "330 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/skagg-rakning-1272144",
      rating: 4.7,
      category: "special",
    },
    // Snagg / Skinfade
    {
      id: "snagg",
      title: "SNAGG",
      description: "Enkel snaggning för en ren look",
      duration: "10 minuter",
      price: "160 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/snagg-1272143",
      rating: 4.6,
      category: "special",
    },
    {
      id: "snagg-skagg",
      title: "SNAGG + SKÄGG",
      description: "Snaggning kombinerat med skäggtrimning",
      duration: "30 minuter",
      price: "400 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/snagg-skagg-1272592",
      rating: 4.7,
      category: "special",
    },
    {
      id: "snaggning-skinfade",
      title: "SNAGGNING & SKINFADE",
      description: "Modern snaggning med skinfade-teknik",
      duration: "30 minuter",
      price: "350 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/snaggning-skinfade-1289621",
      rating: 4.8,
      category: "special",
    },
    {
      id: "snaggning-skinfade-skagg",
      title: "SNAGGNING SKINFADE & SKÄGG",
      description: "Komplett styling med snaggning, skinfade och skägg",
      duration: "60 minuter",
      price: "550 kr",
      icon: <Scissors className="h-6 w-6" />,
      url: "https://www.bokadirekt.se/boka-tjanst/samos-barbershop-38023/snaggning-skinfade-skagg-1950643",
      popular: true,
      rating: 4.9,
      category: "special",
    },
  ]

  const categories = [
    { id: "alla", label: "Alla Tjänster", count: services.length },
    { id: "herr", label: "Herrklippning", count: services.filter(s => s.category === "herr").length },
    { id: "dam", label: "Damklippning", count: services.filter(s => s.category === "dam").length },
    { id: "barn", label: "Barnklippning", count: services.filter(s => s.category === "barn").length },
    { id: "special", label: "Specialtjänster", count: services.filter(s => s.category === "special").length },
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
            className={`h-3 w-3 ${i < Math.floor(rating) ? "text-blue-500 fill-blue-500" : "text-gray-300"}`}
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

  // Filter services based on search term and category
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "alla" || service.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <section
      id="tjanster"
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full -translate-x-1/3 translate-y-1/3 opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4 mobile-section-title"
          >
            VÅRA <span className="text-blue-600">TJÄNSTER</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: "5rem" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-6 hidden md:block"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Vi erbjuder ett brett utbud av professionella frisör- och barberartjänster för hela familjen. 
            Från klassiska klippningar till moderna skinfades och skäggtrimning.
          </motion.p>

          {/* Search and filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 space-y-4"
          >
            {/* Search input */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Sök tjänst..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-4 pr-10 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
              />
              <Search className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
          >
            <Button
              onClick={() => {
                const service = services.find((s) => s.popular) || services[0]
                handleOpenBooking(service)
              }}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold px-6 py-3 rounded-md shadow-lg hover:shadow-xl flex items-center w-full sm:w-auto"
            >
              <Calendar className="mr-2 h-5 w-5" />
              <span>Boka Online</span>
            </Button>

            <Link
              href="tel:036-12 71 12"
              className="bg-slate-600 hover:bg-slate-700 text-white transition-all duration-300 font-bold px-6 py-3 rounded-md shadow-lg hover:shadow-xl flex items-center w-full sm:w-auto justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              <span>Ring Oss</span>
            </Link>
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`grid gap-4 ${
            isMobile 
              ? "grid-cols-1" 
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredServices.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card className="border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg h-full">
                <CardContent className={`${isMobile ? "p-3" : "p-4"} h-full flex flex-col`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center flex-1">
                      <div className="mr-3 p-2 bg-blue-50 rounded-full flex-shrink-0">{service.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-gray-900 ${isMobile ? "text-sm" : "text-base"} leading-tight`}>
                          {service.title}
                          {service.popular && (
                            <Badge className="ml-2 bg-blue-600 text-white font-semibold text-xs">Populär</Badge>
                          )}
                        </h3>
                        <div className="flex items-center mt-1">
                          <Clock className="h-3 w-3 mr-1 text-blue-400" />
                          <span className="text-xs text-gray-500">{service.duration}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`font-bold text-blue-600 ${isMobile ? "text-sm" : "text-base"} flex-shrink-0 ml-2`}>
                      {service.price}
                    </span>
                  </div>

                  <p className={`text-gray-600 mb-3 flex-1 ${isMobile ? "text-xs" : "text-sm"} leading-relaxed`}>
                    {service.description}
                  </p>

                  <div className="flex justify-between items-center mt-auto">
                    <Button
                      onClick={() => handleOpenBooking(service)}
                      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center ${
                        isMobile ? "text-xs px-3 py-2 h-8" : "text-sm px-4 py-2"
                      }`}
                    >
                      Boka
                      <Calendar className="ml-1 h-3 w-3" />
                    </Button>

                    <div className="flex items-center gap-2">
                      {service.rating && renderRating(service.rating)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Inga tjänster hittades för din sökning.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("alla")
              }}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Rensa filter
            </Button>
          </div>
        )}
      </div>

      {/* Booking Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          ref={dialogContentRef}
          className="sm:max-w-[90%] md:max-w-[800px] lg:max-w-[900px] p-0 overflow-hidden bg-white rounded-lg shadow-2xl border-0 w-[95%] max-h-[80vh] h-[80vh] overflow-y-auto"
        >
          <DialogHeader className="p-4 sm:p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white sticky top-0 z-10">
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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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
                <div className="text-blue-600 mb-4">
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
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={retryLoading}>
                    Försök igen
                  </Button>
                  <Link
                    href={selectedService?.url || "https://www.bokadirekt.se/places/samos-barbershop-38023"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-center flex items-center justify-center"
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
                src={selectedService?.url || "https://www.bokadirekt.se/places/samos-barbershop-38023"}
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
              className="fixed bottom-4 right-4 rounded-full h-10 w-10 p-0 bg-blue-500 text-white hover:bg-blue-600 shadow-lg z-20"
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
            className="flex flex-col items-center text-blue-600"
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