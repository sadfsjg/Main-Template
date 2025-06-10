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

  // Gallery data
  const images: GalleryImage[] = [
    {
      type: "image",
      src: "/images/gallery-1.png",
      alt: "Klassisk herrklippning",
      description: "Klassisk herrklippning med precision och stil",
      tags: ["Herrklippning", "Klassisk"],
    },
    {
      type: "image",
      src: "/images/gallery-2.png",
      alt: "Modern fade-klippning",
      description: "Modern fade-klippning med skarp kontrast",
      tags: ["Fade", "Modern"],
    },
    {
      type: "image",
      src: "/images/gallery-3.png",
      alt: "Skäggtrimning",
      description: "Professionell skäggtrimning och formning",
      tags: ["Skägg", "Trimning"],
    },
    {
      type: "image",
      src: "/images/gallery-4.png",
      alt: "Komplett styling",
      description: "Komplett styling med hår och skägg",
      tags: ["Styling", "Komplett"],
    },
    {
      type: "image",
      src: "/images/gallery-5.png",
      alt: "Traditionell rakning",
      description: "Traditionell rakning med rakhyvel",
      tags: ["Rakning", "Traditionell"],
    },
    {
      type: "image",
      src: "/images/gallery-6.png",
      alt: "Trendig herrfrisyr",
      description: "Trendig herrfrisyr med textur och volym",
      tags: ["Trendig", "Textur"],
    },
  ]

  const videos: GalleryVideo[] = [
    {
      type: "video",
      src: "/videos/video-1.mp4",
      poster: "/images/gallery-1.png",
      title: "Skinfade-klippning",
      description: "Steg för steg-process för en perfekt skinfade",
      tags: ["Skinfade", "Tutorial"],
    },
    {
      type: "video",
      src: "/videos/video-2.mp4",
      poster: "/images/gallery-2.png",
      title: "Skäggtrimning och styling",
      description: "Professionell skäggtrimning och styling för det perfekta utseendet",
      tags: ["Skägg", "Styling"],
    },
    {
      type: "video",
      src: "/videos/video-3.mp4",
      poster: "/images/gallery-3.png",
      title: "Klassisk herrklippning",
      description: "Traditionell herrklippning med moderna inslag",
      tags: ["Klassisk", "Herrklippning"],
    },
    {
      type: "video",
      src: "/videos/video-4.mp4",
      poster: "/images/gallery-4.png",
      title: "Moderna tekniker",
      description: "Visa på moderna klipptekniker för den stilmedvetne mannen",
      tags: ["Modern", "Teknik"],
    },
    {
      type: "video",
      src: "/videos/video-5.mp4",
      poster: "/images/gallery-5.png",
      title: "Komplett makeover",
      description: "Från start till slut - en komplett makeover",
      tags: ["Makeover", "Komplett"],
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
          activeTab === "bilder" ? handleNextImage() : handlePrevVideo()
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

  return (
    <section id="galleri" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23d4af37' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>
      </div>

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
                activeTab === "bilder" ? "gold-gradient text-black" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
                  ? "gold-gradient text-black font-bold"
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
                    onLoadStart={() => console.log("Video preloading started")}
                    onLoadedData={() => console.log("Video data loaded")}
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
                              className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-full p-5 shadow-lg cursor-pointer pointer-events-auto"
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
                  <div className="flex overflow-x-auto space-x-4 pb-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-amber-600/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-amber-600/70">
                    {videos.map((video, index) => (
                      <div
                        key={index}
                        className={`relative flex-shrink-0 w-32 rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${
                          currentVideoIndex === index
                            ? "ring-2 ring-amber-500 shadow-lg transform scale-105"
                            : "opacity-70 hover:opacity-100 hover:ring-1 hover:ring-amber-300"
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
                            <Play className="h-4 w-4 text-amber-400" />
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
              ) : (
                <div className="relative h-full">
                  <div
                    className="relative aspect-[3/2] md:aspect-[16/9] bg-gradient-to-br from-gray-900 to-black"
                    onMouseMove={resetControlsTimer}
                    onTouchStart={resetControlsTimer}
                  >
                    <video
                      ref={videoRef}
                      src={videos[lightboxIndex].src}
                      className="w-full h-full object-contain"
                      playsInline
                      onClick={togglePlayPause}
                      onEnded={() => setIsPlaying(false)}
                      muted={isMuted}
                      controls={isMobile}
                      preload="auto"
                      onLoadStart={() => console.log("Lightbox video preloading started")}
                      onLoadedData={() => console.log("Lightbox video data loaded")}
                    />

                    {/* Video overlay for click handling */}
                    {!isMobile && <div className="absolute inset-0 cursor-pointer" onClick={togglePlayPause}></div>}

                    {/* Custom video controls for desktop */}
                    {!isMobile && (
                      <AnimatePresence>
                        {showControls && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/70 via-black/10 to-black/40"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Top controls */}
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-white text-xl font-bold">{videos[lightboxIndex]?.title}</h3>
                                <p className="text-gray-200">{videos[lightboxIndex]?.description}</p>
                              </div>
                            </div>

                            {/* Center play button */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              {!isPlaying && (
                                <motion.div
                                  initial={{ scale: 0.8, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.8, opacity: 0 }}
                                  className="bg-amber-500 rounded-full p-6 shadow-lg cursor-pointer pointer-events-auto"
                                  onClick={() => {
                                    if (videoRef.current) {
                                      videoRef.current.play()
                                      setIsPlaying(true)
                                    }
                                  }}
                                >
                                  <Play className="h-12 w-12 text-white" />
                                </motion.div>
                              )}
                            </div>

                            {/* Bottom controls */}
                            <div className="flex justify-between items-center">
                              <div className="flex space-x-3">
                                <Button
                                  variant="ghost"
                                  className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                                  onClick={togglePlayPause}
                                >
                                  {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                                  {isPlaying ? "Pausa" : "Spela"}
                                </Button>

                                <Button
                                  variant="ghost"
                                  className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                                  onClick={toggleMute}
                                >
                                  {isMuted ? (
                                    <VolumeX className="h-4 w-4 mr-2" />
                                  ) : (
                                    <Volume2 className="h-4 w-4 mr-2" />
                                  )}
                                  {isMuted ? "Ljud på" : "Ljud av"}
                                </Button>
                              </div>

                              <div className="text-white">
                                {lightboxIndex + 1} / {videos.length}
                              </div>

                              <div className="flex space-x-3">
                                <Button
                                  variant="ghost"
                                  className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                                  onClick={() => {
                                    const newIndex = lightboxIndex === 0 ? videos.length - 1 : lightboxIndex - 1
                                    setLightboxIndex(newIndex)
                                    if (videoRef.current) {
                                      videoRef.current.src = videos[newIndex].src
                                      videoRef.current.load()
                                      setIsPlaying(false)
                                    }
                                  }}
                                >
                                  <ChevronLeft className="h-4 w-4 mr-2" />
                                  Föregående
                                </Button>

                                <Button
                                  variant="ghost"
                                  className="bg-black/50 hover:bg-black/70 text-white rounded-full"
                                  onClick={() => {
                                    const newIndex = lightboxIndex === videos.length - 1 ? 0 : lightboxIndex + 1
                                    setLightboxIndex(newIndex)
                                    if (videoRef.current) {
                                      videoRef.current.src = videos[newIndex].src
                                      videoRef.current.load()
                                      setIsPlaying(false)
                                    }
                                  }}
                                >
                                  Nästa
                                  <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>

                  {/* Video info */}
                  <div className="bg-black/70 p-4 text-white">
                    <h3 className="text-xl font-bold">{videos[lightboxIndex]?.title}</h3>
                    <p className="text-gray-300 mt-1">{videos[lightboxIndex]?.description}</p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {videos[lightboxIndex]?.tags?.map((tag) => (
                        <Badge key={tag} className="bg-amber-500/80 hover:bg-amber-600 text-black">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm text-gray-300">
                        {lightboxIndex + 1} / {videos.length}
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="bg-white/10 hover:bg-white/20 text-white rounded-full"
                          onClick={() => toggleLike(`lightbox-video-${lightboxIndex}`)}
                        >
                          <Heart
                            className={`h-4 w-4 mr-2 ${liked[`lightbox-video-${lightboxIndex}`] ? "fill-red-500 text-red-500" : ""}`}
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
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Gallery
