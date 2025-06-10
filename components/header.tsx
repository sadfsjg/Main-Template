"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { Menu, X, Phone, Calendar, Home, User, Scissors, ImageIcon, Star, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [headerVisible, setHeaderVisible] = useState(true)

  // Simplified menu items
  const menuItems = useMemo(
    () => [
      { id: "home", label: "HEM" },
      { id: "om", label: "OM OSS" },
      { id: "tjanster", label: "TJÄNSTER" },
      { id: "galleri", label: "GALLERI" },
      { id: "recensioner", label: "RECENSIONER" },
      { id: "kontakt", label: "KONTAKT" },
    ],
    [],
  )

  // Simplified scroll handler
  const handleScroll = useCallback(() => {
    // Always ensure scrolling is enabled
    document.body.style.overflow = "auto"

    const currentScrollY = window.scrollY

    // Update header visibility
    setHeaderVisible(currentScrollY <= 200 || currentScrollY < lastScrollY)

    // Update scrolled state for styling
    setScrolled(currentScrollY > 50)

    // Store last scroll position
    lastScrollY = currentScrollY

    // Determine active section
    const sections = ["om", "tjanster", "galleri", "recensioner", "kontakt"]

    // Find the section that is currently in view
    for (const id of sections) {
      const element = document.getElementById(id)
      if (element) {
        const rect = element.getBoundingClientRect()
        // If the element is in the viewport (with some buffer)
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          if (activeSection !== id) {
            setActiveSection(id)
          }
          break
        }
      }
    }
  }, [activeSection])

  // Keep track of last scroll position
  let lastScrollY = 0

  // Set up scroll event listener
  useEffect(() => {
    // Ensure scrolling is enabled on mount
    document.body.style.overflow = "auto"

    const onScroll = () => {
      // Use requestAnimationFrame for better performance
      window.requestAnimationFrame(() => {
        handleScroll()
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      document.body.style.overflow = "auto"
    }
  }, [handleScroll])

  // Improved scroll function with Next.js router integration
  const scrollToSection = (id: string) => {
    // Close mobile menu if open
    if (isOpen) {
      setIsOpen(false)
      document.body.style.overflow = "auto"
    }

    // Handle "home" special case
    const targetId = id === "home" ? "" : id

    // Update active section immediately
    setActiveSection(id)

    // Use Next.js router for navigation
    if (id === "home") {
      window.location.href = "/"
    } else {
      window.location.href = `/#${encodeURIComponent(id)}`
    }

    // Find the element by ID after navigation
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        // Calculate position
        const headerHeight = isMobile ? 60 : 80
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - headerHeight

        // Scroll manually with a simple animation
        scrollToPosition(offsetPosition)
      }
    }, 50)
  }

  // Custom scroll function that doesn't interfere with user scrolling
  const scrollToPosition = (to: number) => {
    const duration = 500 // ms
    const start = window.scrollY
    const change = to - start
    const increment = 20
    let currentTime = 0

    // Ensure scrolling is enabled
    document.body.style.overflow = "auto"

    const animateScroll = () => {
      // Check if user has scrolled manually
      if (Math.abs(window.scrollY - (start + (change * currentTime) / duration)) > 10) {
        // User has scrolled manually, stop the animation
        return
      }

      currentTime += increment
      const val = easeInOutQuad(currentTime, start, change, duration)
      window.scrollTo(0, val)

      if (currentTime < duration) {
        setTimeout(animateScroll, increment)
      }
    }

    animateScroll()
  }

  // Easing function for smooth scrolling
  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
    document.body.style.overflow = isOpen ? "auto" : "hidden"
  }, [isOpen])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[9999] transition-all duration-500",
          scrolled
            ? "bg-slate-900/95 backdrop-blur-md py-2 shadow-lg"
            : "bg-gradient-to-b from-slate-900/90 to-transparent py-4",
          headerVisible ? "translate-y-0" : "-translate-y-full",
        )}
        role="banner"
        aria-label="Huvudmeny"
      >
        <div className="container mx-auto px-4 flex justify-between items-center relative z-50">
          {/* Logo */}
          <Link
            href="/"
            className="z-50 relative group"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("home")
            }}
            aria-label="Hem"
          >
            <div className="relative h-12 w-12 md:h-16 md:w-16 overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img 
                src="https://fvega0dwq1jnr8l4.public.blob.vercel-storage.com/logo-LfwF1WGknmDvZTika58ZPF9PDceuCD.png" 
                alt="Samos Barbershop Logo" 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
            <span className="sr-only">Samos Barbershop</span>
          </Link>

          {/* Mobile Header Controls */}
          {isMobile ? (
            <div className="flex items-center gap-3 z-50">
              <Link
                href="tel:036-12 71 12"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-blue-500/20 active:scale-95"
                aria-label="Ring oss på 036-12 71 12"
              >
                <Phone size={20} className="stroke-[2]" />
                <span className="sr-only">Ring oss</span>
              </Link>
              <button
                onClick={() => scrollToSection("tjanster")}
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 text-white p-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-blue-500/20 active:scale-95"
                aria-label="Boka tid"
              >
                <Calendar size={20} className="stroke-[2]" />
                <span className="sr-only">Boka tid</span>
              </button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "text-white p-2.5 transition-all duration-300 relative",
                  isOpen ? "bg-slate-800" : "hover:bg-white/10",
                )}
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} className="stroke-[1.5]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} className="stroke-[1.5]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          ) : (
            /* Desktop Navigation */
            <nav className="flex items-center space-x-6" aria-label="Huvudnavigation">
              <div className="flex items-center space-x-6">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id === "home" ? "om" : item.id)}
                    className={cn(
                      "text-white uppercase text-sm font-medium tracking-wider relative group transition-all duration-300",
                      activeSection === item.id ? "text-blue-400" : "hover:text-blue-300",
                    )}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    <div className="flex items-center">
                      {item.label}
                      {item.id === activeSection && (
                        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="ml-1.5">
                          <ChevronDown size={14} className="text-blue-400" />
                        </motion.div>
                      )}
                    </div>
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300",
                        activeSection === item.id ? "w-full" : "w-0 group-hover:w-full",
                      )}
                      aria-hidden="true"
                    ></span>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollToSection("tjanster")}
                  className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-bold px-4 py-2 rounded-md flex items-center h-10 shadow-md hover:shadow-blue-500/20 active:scale-95"
                  aria-label="Boka tid"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Boka Tid
                </button>
                <Link
                  href="tel:036-12 71 12"
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 transition-all duration-300 text-white font-bold px-4 py-2 rounded-md flex items-center h-10 shadow-md hover:shadow-blue-500/20 active:scale-95"
                  aria-label="Ring oss på 036-12 71 12"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  036-12 71 12
                </Link>
              </div>
            </nav>
          )}

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobile && isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[9998] overflow-hidden"
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobilmeny"
              >
                {/* Backdrop with blur effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/90 backdrop-blur-md"
                  onClick={toggleMenu}
                />

                {/* Decorative elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-0 left-0 w-64 h-64 bg-blue-900/20 rounded-full -translate-x-1/2 -translate-y-1/2"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full translate-x-1/3 translate-y-1/3"
                ></motion.div>

                {/* Menu content with slide-in animation */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-gradient-to-b from-slate-900 to-slate-800 border-l border-blue-900/30 shadow-2xl overflow-y-auto"
                >
                  <div className="flex flex-col h-full p-6">
                    {/* Logo and close button */}
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-blue-900/30">
                      <div className="flex items-center">
                        <div className="relative h-12 w-12 mr-3 cursor-pointer" onClick={() => scrollToSection("home")}>
                          <img
                            src="https://fvega0dwq1jnr8l4.public.blob.vercel-storage.com/logo-LfwF1WGknmDvZTika58ZPF9PDceuCD.png"
                            alt="Samos Barbershop Logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h2 className="flex flex-col items-start">
                          <span className="text-2xl font-bold">
                            <span className="text-blue-400 mr-1">Samos</span>
                            <span className="text-white">Barbershop</span>
                          </span>
                          <span className="text-sm uppercase tracking-wider text-gray-300 font-medium">Sedan 2010</span>
                        </h2>
                      </div>
                      <button
                        onClick={toggleMenu}
                        className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors z-[9999] active:scale-95"
                        aria-label="Stäng meny"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Menu items */}
                    <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar" aria-label="Mobilnavigation">
                      <div className="space-y-2">
                        {menuItems.map((item, index) => (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.3 }}
                            onClick={() => scrollToSection(item.id === "home" ? "om" : item.id)}
                            className={cn(
                              "w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-300",
                              activeSection === item.id
                                ? "bg-gradient-to-r from-blue-500/20 to-transparent text-blue-400"
                                : "text-gray-300 hover:bg-slate-800/50 hover:text-white",
                            )}
                            aria-current={activeSection === item.id ? "page" : undefined}
                          >
                            <div
                              className={cn(
                                "p-2 rounded-full mr-3 transition-all duration-300",
                                activeSection === item.id
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-slate-800 text-gray-400",
                              )}
                            >
                              {item.id === "home" && <Home size={20} strokeWidth={2} />}
                              {item.id === "om" && <User size={20} strokeWidth={2} />}
                              {item.id === "tjanster" && <Scissors size={20} strokeWidth={2} />}
                              {item.id === "galleri" && <ImageIcon size={20} strokeWidth={2} />}
                              {item.id === "recensioner" && <Star size={20} strokeWidth={2} />}
                            </div>
                            <span className="font-medium">{item.label}</span>
                            {activeSection === item.id && (
                              <motion.div
                                layoutId="menuIndicator"
                                className="ml-auto h-2 w-2 rounded-full bg-blue-400"
                                transition={{ type: "spring", duration: 0.5 }}
                              />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </nav>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-blue-900/30 space-y-3">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        <button
                          onClick={() => scrollToSection("tjanster")}
                          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 transition-all duration-300 text-white font-bold px-6 py-4 rounded-xl flex items-center justify-center w-full shadow-lg active:scale-95"
                        >
                          <Calendar className="mr-3 h-5 w-5" />
                          Boka Tid
                        </button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.3 }}
                      >
                        <Link
                          href="tel:036-12 71 12"
                          className="bg-white text-slate-900 hover:bg-gray-100 transition-all duration-300 font-bold px-6 py-4 flex items-center justify-center rounded-xl w-full shadow-lg active:scale-95"
                        >
                          <Phone className="mr-3 h-5 w-5" />
                          Ring Oss Nu
                        </Link>
                      </motion.div>
                    </div>

                    {/* Footer info */}
                    <div className="mt-6 pt-4 border-t border-blue-900/30 text-center">
                      <p className="text-gray-400 text-sm">Öppet måndag-lördag</p>
                      <p className="text-blue-400 text-xs mt-1">Klostergatan 50B, Jönköping</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      {isMobile && (
        <nav
          className="fixed bottom-0 left-0 right-0 z-[9997] bg-slate-900/95 backdrop-blur-md border-t border-blue-900/30 pb-safe shadow-lg shadow-black/50"
          aria-label="Bottennavigation"
        >
          <div className="grid grid-cols-5 h-16 px-1 touch-pan-y">
            {menuItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id === "home" ? "om" : item.id)}
                className="flex flex-col items-center justify-center space-y-0.5 relative active:bg-slate-800/30 transition-colors touch-manipulation will-change-transform"
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                <div
                  className={cn(
                    "p-1.5 rounded-full transition-all duration-300",
                    activeSection === item.id ? "text-blue-400 scale-110" : "text-gray-400 hover:text-white",
                  )}
                >
                  {item.id === "home" && <Home size={20} strokeWidth={2} />}
                  {item.id === "om" && <User size={20} strokeWidth={2} />}
                  {item.id === "tjanster" && <Scissors size={20} strokeWidth={2} />}
                  {item.id === "galleri" && <ImageIcon size={20} strokeWidth={2} />}
                  {item.id === "recensioner" && <Star size={20} strokeWidth={2} />}
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium tracking-wide transition-all duration-300",
                    activeSection === item.id ? "text-blue-400" : "text-gray-400",
                  )}
                >
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-blue-400"
                    transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
                  />
                )}
              </button>
            ))}
          </div>
        </nav>
      )}
    </>
  )
}

export default Header