"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  X,
  Maximize2,
  Volume2,
  VolumeX,
  ImageIcon,
  Film,
  Info,
  Share2,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useInView, useAnimation } from "framer-motion"
import { AspectRatio } from "@/components/ui/aspect-ratio"
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

interface GalleryVideo {
  type: "video"
  src: string
  poster?: string
  title: string
  description?: string
  tags?: string[]
}

type GalleryItem = GalleryImage | GalleryVideo

const Gallery = () => {
  // State
  const [activeTab, setActiveTab] = useState<"bilder" | "videos">("bilder")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [liked, setLiked] = useState<Record<string, boolean>>({})

  // Refs
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Hooks
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()
  const isMobile = useMobile()

  // Gallery data with real Samos Barbershop images
  const images: GalleryImage[] = [
    {
      type: "image",
      src: "/186382577_3952955994821820_3221956573234043554_n.jpg",
      alt: "Klassisk herrklippning med skägg",
      description: "Professionell herrklippning med välformad skäggtrimning",
      tags: ["Herrklippning", "Skägg", "Klassisk"],
    },
    {
      type: "image",
      src: "/196012236_4005570726227013_594735780332764556_n.jpg",
      alt: "Modern fade-klippning",
      description: "Modern fade-klippning med precision och stil",
      tags: ["Fade", "Modern", "Herrklippning"],
    },
    {
      type: "image",
      src: "/461852192_18461547415019357_680501459503095349_n.jpg",
      alt: "Lockig herrklippning",
      description: "Expertklippning för lockigt hår med fade",
      tags: ["Lockigt", "Fade", "Modern"],
    },
    {
      type: "image",
      src: "/470217915_18475462606019357_6602686083435063255_n.jpg",
      alt: "Kort snaggning",
      description: "Professionell snaggning med ren finish",
      tags: ["Snaggning", "Kort", "Ren"],
    },
    {
      type: "image",
      src: "/470470670_18477291961019357_7621443201384490400_n.jpg",
      alt: "Klassisk slickback med skägg",
      description: "Elegant slickback-frisyr med välvårdad skäggtrimning",
      tags: ["Slickback", "Skägg", "Elegant"],
    },
  ]

  const videos: GalleryVideo[] = [
    {
      type: "video",
      src: "https://fvega0dwq1jnr8l4.public.blob.vercel-storage.com/Samo-3ncHNSLoiKOOfLCZKmqco2JD9c3XnU.mp4",
      poster: "/186382577_3952955994821820_3221956573234043554_n.jpg",
      title: "Samo i arbete",
      description: "Se Samo, grundaren av Samos Barbershop, i aktion",
      tags: ["Samo", "Grundare"],
    },
    {
      type: "video",
      src: "https://fvega0dwq1jnr8l4.public.blob.vercel-storage.com/Sarmad-99wxRM8x6GLGf0q1o3KD3cxlsABpXQ.mp4",
      poster: "/196012236_4005570726227013_594735780332764556_n.jpg",
      title: "Sarmad - Expertfrisör",
      description: "Sarmad visar sin expertis inom modern frisering",
      tags: ["Sarmad", "Expert"],
    },
    {
      type: "video",
      src: "https://fvega0dwq1jnr8l4.public.blob.vercel-storage.com/Marvin-3UFaZmbmWdMiUG2Uww37NU8CcItNrc.mp4",
      poster: "/461852192_18461547415019357_680501459503095349_n.jpg",
      title: "Marvin - Stilspecialist",
      description: "Marvin demonstrerar moderna klipptekniker",
      tags: ["Marvin", "Modern"],
    },
  ]

  // Handle navigation
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const handlePrevVideo = () => {
    const newIndex = currentVideoIndex === 0 ? videos.length - 1 : currentVideoIndex - 1
    setCurrentVideoIndex(newIndex)
    if (videoRef.current) {
      videoRef.current.src = videos[newIndex].src
      videoRef.current.load()
      setIsPlaying(false)
    }
  }

  const handleNextVideo = () => {
    const newIndex = currentVideoIndex === videos.length - 1 ? 0 : currentVideoIndex + 1
    setCurrentVideoIndex(newIndex)
    if (videoRef.current) {
      videoRef.current.src = videos[newIndex].src
      videoRef.current.load()
      setIsPlaying(false)
    }
  }

  // Video controls
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen()
    } else if (videoRef.current) {
      videoRef.current.requestFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  // Handle video events
  useEffect(() => {
    const handleVideoEnd = () => {
      setIsPlaying(false)
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd)
      document.addEventListener("fullscreenchange", handleFullscreenChange)
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd)
      }
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Auto-hide controls after inactivity
  const resetControlsTimer = useCallback(() => {
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current)
    }

    setShowControls(true)

    controlsTimerRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }, [isPlaying])

  useEffect(() => {
    if (activeTab === "videos") {
      resetControlsTimer()
    }

    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current)
      }
    }
  }, [activeTab, resetControlsTimer])

  // Lightbox functionality
  const openLightbox = (index: number, type: "bilder" | "videos") => {
    setLightboxIndex(index)
    setActiveTab(type)
    setIsLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = ""
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return

      switch (e.key) {
        case "ArrowLeft":
          activeTab === "bilder" ? handlePrevImage() : handlePrevVideo()
          break
        case "ArrowRight":
          activeTab === "bilder" ? handleNextImage() : handleNextVideo()
          break
        case "Escape":
          closeLightbox()
          break
        case " ":
          if (activeTab === "videos") togglePlayPause()
          e.preventDefault()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen, activeTab, currentImageIndex, currentVideoIndex])

  // Handle click outside lightbox to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (lightboxRef.current && !lightboxRef.current.contains(e.target as Node)) {
        closeLightbox()
      }
    }

    if (isLightboxOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isLightboxOpen])

  // Animation when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      })
    }
  }, [isInView, controls])

  // Handle like functionality
  const toggleLike = (id: string) => {
    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="galleri" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            VÅRT <span className="text-blue-600">GALLERI</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: "5rem" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-6"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Utforska våra senaste arbeten och se kvaliteten på vårt hantverk. Klicka på bilderna för att se dem i större format.
          </motion.p>
        </div>

        {/* Gallery type tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex rounded-md shadow-md overflow-hidden" role="group">
            <button
              type="button"
              className={`px-8 py-3 text-sm font-medium transition-all duration-300 flex items-center ${
                activeTab === "bilder" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("bilder")}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Bilder
            </button>
            <button
              type="button"
              className={`px-8 py-3 text-sm font-medium transition-all duration-300 flex items-center ${
                activeTab === "videos"
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("videos")}
            >
              <Film className="mr-2 h-4 w-4" />
              Videos
            </button>
          </div>
        </motion.div>

        {/* Main gallery content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          ref={galleryRef}
        >
          {activeTab === "videos" ? (
            <div className="space-y-8">
              {/* Main video player */}
              <div
                className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-black"
                onMouseMove={resetControlsTimer}
                onTouchStart={resetControlsTimer}
              >
                <div className="relative w-full h-[500px] md:h-[600px]">
                  <video
                    ref={videoRef}
                    src={videos[currentVideoIndex].src}
                    className="w-full h-full object-cover"
                    playsInline
                    onClick={togglePlayPause}
                    onEnded={() => setIsPlaying(false)}
                    muted={isMuted}
                    preload="auto"
                  />

                  {/* Video overlay for click handling */}
                  <div className="absolute inset-0 cursor-pointer" onClick={togglePlayPause}></div>

                  {/* Video controls */}
                  <AnimatePresence>
                    {showControls && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-black/60"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Top controls */}
                        <div className="flex justify-between items-start">
                          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2 max-w-[80%]">
                            <h3 className="text-white text-lg font-bold">{videos[currentVideoIndex].title}</h3>
                            <p className="text-gray-200 text-sm line-clamp-2">
                              {videos[currentVideoIndex].description}
                            </p>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full h-8 w-8"
                              onClick={() => toggleLike(`video-${currentVideoIndex}`)}
                            >
                              <Heart
                                className={`h-4 w-4 ${liked[`video-${currentVideoIndex}`] ? "fill-red-500 text-red-500" : ""}`}
                              />
                            </Button>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full h-8 w-8"
                              onClick={toggleFullscreen}
                            >
                              <Maximize2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Center play button */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          {!isPlaying && (
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-5 shadow-lg cursor-pointer pointer-events-auto"
                              onClick={() => {
                                if (videoRef.current) {
                                  videoRef.current.play()
                                  setIsPlaying(true)
                                }
                              }}
                            >
                              <Play className="h-10 w-10 text-white drop-shadow-md" />
                            </motion.div>
                          )}
                        </div>

                        {/* Bottom controls */}
                        <div className="flex justify-between items-center bg-black/40 backdrop-blur-sm rounded-lg p-2">
                          <div className="flex space-x-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8"
                              onClick={togglePlayPause}
                            >
                              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8"
                              onClick={toggleMute}
                            >
                              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                            </Button>
                          </div>

                          <div className="text-white text-sm font-medium px-2 py-1 bg-black/50 rounded-full">
                            {currentVideoIndex + 1} / {videos.length}
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8"
                              onClick={handlePrevVideo}
                            >
                              <ChevronLeft className="h-4 w-4" />
                            </Button>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8"
                              onClick={handleNextVideo}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Video thumbnails */}
                <div className="bg-gradient-to-r from-gray-900 to-black p-4">
                  <div className="flex overflow-x-auto space-x-4 pb-2">
                    {videos.map((video, index) => (
                      <div
                        key={index}
                        className={`relative flex-shrink-0 w-32 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${
                          currentVideoIndex === index
                            ? "ring-2 ring-blue-500 shadow-lg transform scale-105"
                            : "opacity-70 hover:opacity-100 hover:ring-1 hover:ring-blue-300"
                        }`}
                        onClick={() => {
                          setCurrentVideoIndex(index)
                          if (videoRef.current) {
                            videoRef.current.src = video.src
                            videoRef.current.load()
                            setIsPlaying(false)
                          }
                        }}
                      >
                        <AspectRatio ratio={16 / 9}>
                          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <Film className="h-6 w-6 text-gray-400" />
                          </div>
                        </AspectRatio>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black/60 backdrop-blur-sm rounded-full p-1.5">
                            <Play className="h-4 w-4 text-blue-400" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm py-1 px-2">
                          <p className="text-white text-xs truncate font-medium">{video.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Image section
            <div className="space-y-8">
              {/* Main featured image */}
              <div className="relative w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-2xl group">
                <Image
                  src={images[currentImageIndex].src}
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
                      <Badge key={tag} className="bg-blue-500/80 hover:bg-blue-600 text-white">
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
                    onClick={() => openLightbox(currentImageIndex, "bilder")}
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
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative h-24 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${
                      currentImageIndex === index
                        ? "ring-2 ring-blue-500 shadow-lg"
                        : "hover:ring-2 hover:ring-blue-300 filter hover:brightness-110"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image.src}
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
            </div>
          )}
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

              {activeTab === "bilder" ? (
                <div className="relative h-full">
                  <div className="relative aspect-[3/2] md:aspect-[16/9] bg-black">
                    <Image
                      src={images[lightboxIndex].src}
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
                        <Badge key={tag} className="bg-blue-500/80 hover:bg-blue-600 text-white">
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
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isMobile && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => scrollToSection("recensioner")}
            aria-label="Scrolla till recensioner"
            className="flex flex-col items-center text-blue-600"
          >
            <span className="text-sm mb-1">Recensioner</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      )}
    </section>
  )
}

export default Gallery