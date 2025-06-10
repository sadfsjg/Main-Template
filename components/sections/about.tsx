"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Check, Phone, Calendar, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useMobile } from "@/hooks/use-mobile"

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const isMobile = useMobile()

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
    <section id="om" className="py-16 md:py-24 bg-gradient-to-b from-white to-amber-50/30 relative overflow-hidden">
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
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4 mobile-section-title"
          >
            OM <span className="text-gold">OSS</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={isInView ? { opacity: 1, width: "5rem" } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-20 h-1 gold-gradient mx-auto mb-6 hidden md:block"
          ></motion.div>
        </div>

        <div ref={ref} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left column - Image with overlays */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-extra.jpeg"
                  alt="Bella Vida Barbershop"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Stats overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex justify-between">
                  <div className="text-center glass-effect-dark p-2 md:p-3 rounded-lg">
                    <div className="text-2xl md:text-3xl font-bold text-amber-500">5+</div>
                    <div className="text-white text-xs md:text-sm">Års erfarenhet</div>
                  </div>
                  <div className="text-center glass-effect-dark p-2 md:p-3 rounded-lg">
                    <div className="text-2xl md:text-3xl font-bold text-amber-500">1000+</div>
                    <div className="text-white text-xs md:text-sm">Nöjda kunder</div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white gold-shadow rounded-full p-3 md:p-4 flex flex-col items-center justify-center w-20 h-20 md:w-28 md:h-28 border-2 border-amber-400 z-10 hover:scale-105 transition-transform duration-300">
                <span className="text-xl md:text-3xl font-bold text-amber-600">5+</span>
                <span className="text-[10px] md:text-xs text-gray-700 text-center">ÅRS ERFARENHET</span>
              </div>

              {/* Decorative logo watermark */}
              <div className="absolute -bottom-10 -left-10 w-24 md:w-32 h-24 md:h-32 opacity-10">
                <Image src="/images/logo.png" alt="Logo Watermark" fill className="object-contain" />
              </div>
            </motion.div>

            {/* Right column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-7"
            >
              <div className="bg-white/80 backdrop-blur-sm p-5 md:p-8 rounded-2xl shadow-xl border border-amber-100 hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900 text-center lg:text-left">
                  DIN NÖJDHET ÄR <span className="text-gold">VÅRAT NÖJE</span>
                </h3>

                <p className="text-gray-700 mb-4 md:mb-6 text-base md:text-lg leading-relaxed text-center lg:text-left">
                  Med flera års erfarenhet samt en brinnande passion för barbering så kan du förvänta dig högklassiga
                  tjänster. Inget gör oss gladare än att se våra kunder bli nöjda när de kliver ut ur shopen.
                </p>

                <p className="text-gray-700 mb-6 md:mb-8 text-base md:text-lg leading-relaxed text-center lg:text-left">
                  Hos Bella Vida Barbershop kombinerar vi traditionellt hantverk med moderna tekniker för att ge dig den
                  bästa upplevelsen. Vår målsättning är att varje kund ska lämna oss med ett leende och en perfekt
                  klippning.
                </p>

                {isMobile ? (
                  <div className="space-y-3 mb-6">
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-amber-100 p-2 rounded-full">
                          <Check className="h-4 w-4 text-amber-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">Professionell Service</h4>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-amber-100 p-2 rounded-full">
                          <Check className="h-4 w-4 text-amber-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">Moderna Tekniker</h4>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-amber-100 p-2 rounded-full">
                          <Check className="h-4 w-4 text-amber-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">Kvalitetsprodukter</h4>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-amber-100 p-2 rounded-full">
                          <Check className="h-4 w-4 text-amber-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">Flexibla Tider</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 hover:shadow-lg transition-all duration-300 card-hover">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1 bg-amber-100 p-2 rounded-full">
                          <Check className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-base font-medium text-gray-900">Professionell Service</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Vi erbjuder högkvalitativ service med fokus på detaljer och kundnöjdhet.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 hover:shadow-lg transition-all duration-300 card-hover">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1 bg-amber-100 p-2 rounded-full">
                          <Check className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-base font-medium text-gray-900">Moderna Tekniker</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Vi håller oss uppdaterade med de senaste trenderna och teknikerna inom barbering.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 hover:shadow-lg transition-all duration-300 card-hover">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1 bg-amber-100 p-2 rounded-full">
                          <Check className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-base font-medium text-gray-900">Kvalitetsprodukter</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Vi använder endast de bästa produkterna för att säkerställa ett perfekt resultat.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 hover:shadow-lg transition-all duration-300 card-hover">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1 bg-amber-100 p-2 rounded-full">
                          <Check className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-base font-medium text-gray-900">Flexibla Tider</h4>
                          <p className="mt-1 text-sm text-gray-500">
                            Vi erbjuder flexibla tider för att passa din vardag och ditt schema.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
                  <button onClick={() => scrollToSection("tjänster")} className="btn-primary">
                    <Calendar className="mr-2 h-5 w-5" />
                    Boka Tid Online
                  </button>

                  <Link href="tel:070-455 66 15" className="btn-secondary">
                    <Phone className="mr-2 h-5 w-5" />
                    Ring 070-455 66 15
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
            onClick={() => scrollToSection("tjänster")}
            aria-label="Scrolla till tjänster"
            className="flex flex-col items-center text-amber-600"
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
