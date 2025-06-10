"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { ExternalLink, Star, ThumbsUp, Calendar, Quote, X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

// Define review type
interface Review {
  name: string
  rating: number
  date: string
  comment: string
  shortComment?: string
  service?: string
}

const Reviews = () => {
  const sectionRef = useRef(null)
  const reviewsContainerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const isMobile = useMobile()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Updated reviews data with more recent dates
  const reviews: Review[] = [
    {
      name: "Alexander Svensson",
      rating: 5,
      date: "2024-04-18",
      service: "Klippning & skägg trim",
      shortComment: "Fantastisk service och resultat! Bästa barberaren i Jönköping utan tvekan.",
      comment:
        "Fantastisk service och resultat! Bästa barberaren i Jönköping utan tvekan. Jag har provat många olika ställen men ingen kommer i närheten av kvaliteten här. Personalen är professionell, trevlig och lyssnar verkligen på vad man vill ha. Rekommenderar starkt till alla som vill ha en riktigt bra klippning och skäggtrimning.",
    },
    {
      name: "Emma Lindqvist",
      rating: 5,
      date: "2024-03-27",
      service: "Herrklippning",
      shortComment: "Min man är supernöjd med sin nya frisyr. Professionell service och trevlig personal!",
      comment:
        "Min man är supernöjd med sin nya frisyr. Professionell service och trevlig personal! Han har gått till samma ställe i flera år men ville prova något nytt, och nu vill han inte gå någon annanstans. Prisvärt och resultatet överträffade våra förväntningar. Kommer definitivt att rekommendera till vänner och bekanta.",
    },
    {
      name: "Mattias Bergman",
      rating: 5,
      date: "2024-02-12",
      service: "Skägg trim (långt)",
      shortComment: "Bästa skäggtrimningen jag någonsin fått. Kommer definitivt tillbaka!",
      comment:
        "Bästa skäggtrimningen jag någonsin fått. Kommer definitivt tillbaka! Har haft skägg i många år och har alltid haft svårt att hitta någon som verkligen kan forma det på rätt sätt. Här fick jag exakt vad jag ville ha och mer därtill. Personalen är kunnig och tar sig tid att förstå vad man är ute efter. Prisvärt och professionellt.",
    },
    {
      name: "Lina Karlsson",
      rating: 5,
      date: "2024-01-05",
      service: "Klippning",
      shortComment: "Rekommenderar starkt! Professionell service och fantastiskt resultat varje gång.",
      comment:
        "Rekommenderar starkt! Professionell service och fantastiskt resultat varje gång. Jag har nu varit här flera gånger och blir aldrig besviken. Atmosfären är trevlig, personalen är kunnig och resultatet är alltid på topp. Det är skönt att ha hittat en barbershop man verkligen kan lita på. Priserna är också rimliga för den kvalitet man får.",
    },
  ]

  const openReviewDialog = (review: Review, index: number) => {
    setSelectedReview(review)
    setCurrentReviewIndex(index)
    setIsDialogOpen(true)
  }

  const handlePrevReview = () => {
    const newIndex = currentReviewIndex === 0 ? reviews.length - 1 : currentReviewIndex - 1
    setCurrentReviewIndex(newIndex)
    setSelectedReview(reviews[newIndex])
  }

  const handleNextReview = () => {
    const newIndex = currentReviewIndex === reviews.length - 1 ? 0 : currentReviewIndex + 1
    setCurrentReviewIndex(newIndex)
    setSelectedReview(reviews[newIndex])
  }

  // Enhanced swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      if (isDialogOpen) {
        handleNextReview()
      } else {
        // Scroll to next review in the container
        const nextIndex = Math.min(currentReviewIndex + 1, reviews.length - 1)
        setCurrentReviewIndex(nextIndex)
        scrollToReview(nextIndex)
      }
    } else if (isRightSwipe) {
      if (isDialogOpen) {
        handlePrevReview()
      } else {
        // Scroll to previous review in the container
        const prevIndex = Math.max(currentReviewIndex - 1, 0)
        setCurrentReviewIndex(prevIndex)
        scrollToReview(prevIndex)
      }
    }
  }

  // Function to scroll to a specific review in the container
  const scrollToReview = (index: number) => {
    const container = document.querySelector(".swipe-container")
    const items = container?.querySelectorAll(".swipe-item")

    if (container && items && items[index]) {
      const itemWidth = items[0].clientWidth
      const gap = 16 // This should match the gap in your CSS
      container.scrollTo({
        left: index * (itemWidth + gap),
        behavior: "smooth",
      })
    }
  }

  // Add swipe indicators
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDialogOpen) return

      if (e.key === "ArrowLeft") {
        handlePrevReview()
      } else if (e.key === "ArrowRight") {
        handleNextReview()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isDialogOpen, currentReviewIndex])

  return (
    <section
      id="recensioner"
      ref={sectionRef}
      className="py-16 md:py-24 bg-gradient-to-b from-white to-amber-50 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>

      {/* Floating quotes decoration */}
      <div className="absolute top-1/4 left-10 text-amber-200 opacity-20 hidden md:block">
        <Quote size={60} />
      </div>
      <div className="absolute bottom-1/4 right-10 text-amber-200 opacity-20 hidden md:block">
        <Quote size={60} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4 mobile-section-title"
          >
            KUND<span className="text-gold">RECENSIONER</span>
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
            className="text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Upptäck vad våra nöjda kunder säger om oss. Vi är stolta över att erbjuda högklassig service som våra kunder
            älskar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-8 md:mb-12"
          >
            <Link
              href="https://www.bokadirekt.se/places/bella-vida-barbershop-49893#reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="gold-gradient hover:opacity-90 text-black font-medium py-3 px-6 rounded-full inline-flex items-center transition-all shadow-lg hover:shadow-xl"
            >
              <span>Läs alla recensioner på Bokadirekt</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile swipe container for reviews */}
        {isMobile ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-sm mx-auto"
          >
            <div
              className="swipe-container pb-4 flex snap-x snap-mandatory overflow-x-auto"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex gap-4 w-full">
                {reviews.map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="bg-white p-4 rounded-2xl shadow-xl border border-amber-100 hover:shadow-2xl transition-all duration-300 group cursor-pointer swipe-item min-w-[280px] w-[280px] flex-shrink-0 snap-center"
                    onClick={() => openReviewDialog(review, index)}
                  >
                    <div className="relative mb-3">
                      <div className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full p-1.5 shadow-md z-10">
                        <ThumbsUp className="h-3 w-3" />
                      </div>
                      <div className="pr-6">
                        <h4 className="font-bold text-base">{review.name}</h4>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          <p>{review.date}</p>
                        </div>
                        {review.service && (
                          <div className="mt-1">
                            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                              {review.service}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < review.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>

                    <p className="text-gray-700 italic relative line-clamp-3 text-xs">
                      <Quote className="h-3 w-3 text-amber-300 absolute -left-1 -top-1 opacity-50" />
                      {review.shortComment || review.comment}
                    </p>

                    <div className="mt-2 text-amber-600 text-xs font-medium flex items-center justify-end">
                      Läs mer <ChevronRight className="h-3 w-3 ml-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {isMobile && (
              <div className="mt-2 flex justify-center items-center">
                <div className="text-xs text-gray-500 flex items-center bg-white/80 px-3 py-1 rounded-full shadow-sm">
                  <ChevronLeft className="h-3 w-3" />
                  <span className="mx-1">Svep för att se fler</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            )}
            <div className="mt-3 flex justify-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToReview(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentReviewIndex ? "bg-amber-500 w-4" : "bg-gray-300"
                  }`}
                  aria-label={`Gå till recension ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            ref={reviewsContainerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-4xl mx-auto relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-xl border border-amber-100 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                  onClick={() => openReviewDialog(review, index)}
                >
                  <div className="relative mb-4">
                    <div className="absolute -top-2 right-2 bg-amber-500 text-white rounded-full p-2 shadow-md">
                      <ThumbsUp className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{review.name}</h4>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        <p>{review.date}</p>
                      </div>
                      {review.service && (
                        <div className="mt-1">
                          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            {review.service}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 italic relative line-clamp-3">
                    <Quote className="h-4 w-4 text-amber-300 absolute -left-2 -top-1 opacity-50" />
                    {review.shortComment || review.comment}
                  </p>

                  <div className="mt-3 text-amber-600 text-sm font-medium flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    Läs mer <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="text-center mt-8 md:mt-12 bg-amber-50 p-4 md:p-6 rounded-xl max-w-2xl mx-auto shadow-md">
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 sm:h-6 w-5 sm:w-6 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <p className="text-gray-700 font-medium text-sm md:text-base">
            Baserat på över 500 recensioner med ett genomsnittligt betyg på 4.9/5
          </p>
        </div>
      </div>

      {/* Review Dialog with swipe functionality */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="w-[95%] sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-xl"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <DialogHeader className="p-4 sm:p-6 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
            <div className="flex justify-between items-start">
              <DialogTitle className="text-lg sm:text-xl font-bold">Kundrecension</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDialogOpen(false)}
                className="h-8 w-8 p-0 rounded-full bg-white/20 text-white hover:bg-white/30 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {selectedReview && (
            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <h3 className="font-bold text-xl">{selectedReview.name}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  <p>{selectedReview.date}</p>
                </div>
                {selectedReview.service && (
                  <div className="mt-2">
                    <span className="text-sm bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                      {selectedReview.service}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < selectedReview.rating ? "fill-amber-500 text-amber-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <div className="bg-amber-50 p-4 rounded-xl mb-4">
                <p className="text-gray-700 italic relative text-sm sm:text-base">
                  <Quote className="h-5 w-5 text-amber-300 absolute -left-2 -top-1 opacity-50" />
                  {selectedReview.comment}
                </p>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevReview}
                  className="text-amber-600 border-amber-200"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Föregående
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextReview}
                  className="text-amber-600 border-amber-200"
                >
                  Nästa <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                Svep åt vänster eller höger för att bläddra mellan recensioner
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <Link
                  href="https://www.bokadirekt.se/places/bella-vida-barbershop-49893#reviews"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-800 font-medium inline-flex items-center text-sm"
                >
                  Läs fler recensioner på Bokadirekt <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {isMobile && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => scrollToSection("kontakt")}
            aria-label="Scrolla till kontakt"
            className="flex flex-col items-center text-amber-600"
          >
            <span className="text-sm mb-1">Kontakt</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      )}
    </section>
  )
}

export default Reviews
