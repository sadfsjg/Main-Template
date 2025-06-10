"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Phone, Calendar, ChevronDown, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useMobile()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="om" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4 mobile-section-title"
          >
            OM <span className="text-blue-600">SAMOS BARBERSHOP</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: "5rem" } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto mb-6 hidden md:block"
          ></motion.div>
        </div>

        <div ref={ref} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left column - Video with overlays */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                >
                  <source
                    src="https://fvega0dwq1jnr8l4.public.blob.vercel-storage.com/Samo-3ncHNSLoiKOOfLCZKmqco2JD9c3XnU.mp4"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Stats overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex justify-between">
                  <div className="text-center bg-white/10 backdrop-blur-sm p-2 md:p-3 rounded-lg border border-white/20">
                    <div className="text-2xl md:text-3xl font-bold text-blue-400">14+</div>
                    <div className="text-white text-xs md:text-sm">Års erfarenhet</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm p-2 md:p-3 rounded-lg border border-white/20">
                    <div className="text-2xl md:text-3xl font-bold text-blue-400">2010</div>
                    <div className="text-white text-xs md:text-sm">Grundat</div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white shadow-xl rounded-full p-3 md:p-4 flex flex-col items-center justify-center w-20 h-20 md:w-28 md:h-28 border-2 border-blue-400 z-10 hover:scale-105 transition-transform duration-300">
                <span className="text-xl md:text-3xl font-bold text-blue-600">2010</span>
                <span className="text-[10px] md:text-xs text-gray-700 text-center">GRUNDAT</span>
              </div>
            </motion.div>

            {/* Right column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-7"
            >
              <div className="bg-white/80 backdrop-blur-sm p-5 md:p-8 rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900 text-center lg:text-left">
                  EXPERTIS OCH <span className="text-blue-600">PASSION SEDAN 2010</span>
                </h3>

                <p className="text-gray-700 mb-4 md:mb-6 text-base md:text-lg leading-relaxed text-center lg:text-left">
                  Samos Barbershop grundades 2010. Samo driver salongen sedan dess. Vi på Samos Barbershop har flera års 
                  erfarenhet av att klippa och forma alla typer av hår och skägg.
                </p>

                <p className="text-gray-700 mb-6 md:mb-8 text-base md:text-lg leading-relaxed text-center lg:text-left">
                  Vi är engagerade och brinner för det vi gör, lyssnar på våra kunder och klipper efter deras önskemål. 
                  Vi jobbar alltid med högsta kvalité och service. Vårt ständiga mål är att alla våra kunder ska gå 
                  härifrån med ett stort leende på läpparna. 😃
                </p>

                {isMobile ? (
                  <div className="space-y-3 mb-6">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">Fri Parkering</h4>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                          <MapPin className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">Centralt Läge (Torpa)</h4>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">Flexibla Öppettider</h4>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">14+ Års Erfarenhet</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1 bg-blue-100 p-2 rounded-full">
                          <Check className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-base font-medium text-gray-900">Fri Parkering</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Bekväm parkering direkt utanför salongen för alla våra kunder.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1 bg-blue-100 p-2 rounded-full">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-base font-medium text-gray-900">Centralt Läge (Torpa)</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Perfekt beläget på Klostergatan 50B, lätt att hitta och nå.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1 bg-blue-100 p-2 rounded-full">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-base font-medium text-gray-900">Flexibla Öppettider</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Öppet måndag-lördag för att passa ditt schema.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1 bg-blue-100 p-2 rounded-full">
                          <Check className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-base font-medium text-gray-900">14+ Års Erfarenhet</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Grundat 2010 med djup expertis inom frisering och barbering.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
                  <button 
                    onClick={() => scrollToSection("tjanster")} 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Boka Tid Online
                  </button>

                  <Link 
                    href="tel:036-12 71 12" 
                    className="bg-slate-600 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Ring 036-12 71 12
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {isMobile && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => scrollToSection("tjanster")}
            aria-label="Scrolla till tjänster"
            className="flex flex-col items-center text-blue-600"
          >
            <span className="text-sm mb-1">Tjänster</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      )}
    </section>
  )
}

export default About