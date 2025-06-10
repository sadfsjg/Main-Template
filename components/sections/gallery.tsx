"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  ImageIcon,
  Info,
  Share2,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useMobile } from "@/hooks/use-mobile"

// Define types for our gallery items
interface GalleryImage {
  type: "image"
  src: string
  alt: string
  description?: string
  tags?: string[]
}

type GalleryItem = GalleryImage

const Gallery = () => {
  // State
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [liked, setLiked] = useState<Record<string, boolean>>({})

  // Refs
  const sectionRef = useRef<HTMLElement>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Hooks
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const isMobile = useMobile()

  // Gallery data with uploaded images
  const images: GalleryImage[] = [
    {
      type: "image",
      src: "/images/gallery-1.jpg",
      alt: "Klassisk herrklippning med skägg",
      description: "Professionell herrklippning med välformad skäggtrimning",
      tags: ["Herrklippning", "Skägg"],
    },
    {
      type: "image",
      src: "/images/gallery-2.jpg",
      alt: "Frisör och kund",
      description: "Professionell service med personlig touch",
      tags: ["Service", "Professionell"],
    },
    {
      type: "image",
      src: "/images/gallery-3.jpg",
      alt: "Modern fade-klippning",
      description: "Modern fade-klippning med precision",
      tags: ["Fade", "Modern"],
    },
    {
      type: "image",
      src: "/images/gallery-4.jpg",
      alt: "Kort herrklippning",
      description: "Kort och stilren herrklippning",
      tags: ["Kort", "Stilren"],
    },
    {
      type: "image",
      src: "/images/gallery-5.jpg",
      alt: "Långt skägg styling",
      description: "Professionell styling av långt skägg",
      tags: ["Skägg", "Styling"],
    },
    {
      type: "image",
      src: "/images/gallery-6.jpg",
      alt: "Traditionell rakning",
      description: "Traditionell rakning med precision",
      tags: ["Rakning", "Traditionell"],
    },
    {
      type: "image",
      src: "/images/gallery-7.jpg",
      alt: "Barberare i arbete",
      description: "Våra skickliga barberare i aktion",
      tags: ["Barberare", "Arbete"],
    },
    {
      type: "image",
      src: "/images/gallery-8.jpg",
      alt: "Traditionell rakning process",
      description: "Traditionell rakning med varma handdukar",
      tags: ["Rakning", "Process"],
    },
    {
      type: "image",
      src: "/images/gallery-9.jpg",
      alt: "Lockigt hår styling",
      description: "Professionell styling av lockigt hår",
      tags: ["Lockigt", "Styling"],
    },
    {
      type: "image",
      src: "/images/gallery-10.jpg",
      alt: "Precision klippning",
      description: "Precision och uppmärksamhet på detaljer",
      tags: ["Precision", "Detaljer"],
    },
    {
      type: "image",
      src: "/images/gallery-11.jpg",
      alt: "Ungdomsklippning",
      description: "Modern klippning för ungdomar",
      tags: ["Ungdom", "Modern"],
    },
    {
      type: "image",
      src: "/images/gallery-12.jpg",
      alt: "Fade och skägg kombination",
      description: "Perfekt kombination av fade och skägg",
      tags: ["Fade", "Skägg"],
    },
  ]

  // Handle navigation
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  // Lightbox functionality
  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = ""
  }

  // Handle like functionality
  const toggleLike = (id: string) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <section id="galleri" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            VÅRT <span className="text-gold">GALLERI</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: "5rem" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-1 gold-gradient mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Utforska våra senaste arbeten och se vad vi kan göra för dig. Klicka på bilderna för att se dem i större
            format.
          </motion.p>
        </div>

        {/* Main gallery content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          ref={galleryRef}
        >
          {/* Main featured image */}
          <div className="relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl group mb-8">
            <Image
              src={images[currentImageIndex].src || "/placeholder.svg"}
              alt={images[currentImageIndex].alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Image info overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-xl font-bold mb-2">{images[currentImageIndex].alt}</h3>
              <p className="text-sm text-gray-200 mb-3">{images[currentImageIndex].description}</p>

              <div className="flex flex-wrap gap-2">
                {images[currentImageIndex].tags?.map((tag) => (
                  <Badge key={tag} className="bg-amber-500/80 hover:bg-amber-600 text-black">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Föregående bild"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Nästa bild"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="icon"
                variant="ghost"
                className="bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
                onClick={() => toggleLike(`img-${currentImageIndex}`)}
              >
                <Heart
                  className={`h-5 w-5 ${liked[`img-${currentImageIndex}`] ? "fill-red-500 text-red-500" : ""}`}
                />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
                onClick={() => openLightbox(currentImageIndex)}
              >
                <Maximize2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-4 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative h-24 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${
                  currentImageIndex === index
                    ? "ring-2 ring-amber-500 shadow-lg"
                    : "hover:ring-2 hover:ring-amber-300 filter hover:brightness-110"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />

                {/* Hover info */}
                <div
                  className={`absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                    currentImageIndex === index ? "opacity-0" : ""
                  }`}
                >
                  <Info className="h-5 w-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-7xl w-full max-h-[90vh] rounded-lg overflow-hidden"
              ref={lightboxRef}
            >
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
                onClick={closeLightbox}
              >
                <X className="h-5 w-5" />
              </Button>

              <div className="relative h-full">
                <div className="relative aspect-[3/2] md:aspect-[16/9] bg-black">
                  <Image
                    src={images[lightboxIndex].src || "/placeholder.svg"}
                    alt={images[lightboxIndex].alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>

                {/* Navigation buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12"
                  onClick={() => {
                    const newIndex = lightboxIndex === 0 ? images.length - 1 : lightboxIndex - 1
                    setLightboxIndex(newIndex)
                  }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full h-12 w-12"
                  onClick={() => {
                    const newIndex = lightboxIndex === images.length - 1 ? 0 : lightboxIndex + 1
                    setLightboxIndex(newIndex)
                  }}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Image info */}
                <div className="bg-black/70 p-4 text-white">
                  <h3 className="text-xl font-bold">{images[lightboxIndex]?.alt}</h3>
                  <p className="text-gray-300 mt-1">{images[lightboxIndex]?.description}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {images[lightboxIndex]?.tags?.map((tag) => (
                      <Badge key={tag} className="bg-amber-500/80 hover:bg-amber-600 text-black">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-300">
                      {lightboxIndex + 1} / {images.length}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-white/10 hover:bg-white/20 text-white rounded-full"
                        onClick={() => toggleLike(`lightbox-img-${lightboxIndex}`)}
                      >
                        <Heart
                          className={`h-4 w-4 mr-2 ${liked[`lightbox-img-${lightboxIndex}`] ? "fill-red-500 text-red-500" : ""}`}
                        />
                        Gilla
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-white/10 hover:bg-white/20 text-white rounded-full"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Dela
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery