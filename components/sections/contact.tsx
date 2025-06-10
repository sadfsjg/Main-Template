"use client"

import { useRef } from "react"
import { MapPin, Phone, Mail, Clock, ExternalLink, Calendar, ChevronDown } from "lucide-react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

const Contact = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
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
    <section
      id="kontakt"
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
            KONTAKTA <span className="text-gold">OSS</span>
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
            Har du frågor eller vill boka en tid? Kontakta oss eller besök vår barbershop.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:col-span-5 bg-white p-5 md:p-8 rounded-2xl shadow-xl border border-amber-100 mx-auto w-full max-w-md md:max-w-none"
          >
            <div className="flex items-center mb-6 justify-center md:justify-start">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden mr-4 border-2 border-amber-200 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Bella Vida Barbershop Logo"
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold">Kontaktinformation</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start bg-amber-50 p-4 rounded-xl transition-all hover:shadow-md">
                <div className="flex-shrink-0 bg-amber-500 p-3 rounded-full text-white">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold mb-1 text-base md:text-lg">Adress</h4>
                  <p className="text-gray-600 text-sm md:text-base">Lantmätargränd 26, 553 20 Jönköping</p>
                  <Link
                    href="https://maps.google.com/?q=Lantmätargränd+26,+553+20+Jönköping"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:text-amber-800 font-medium transition-colors duration-300 flex items-center mt-2 text-sm"
                  >
                    Visa på karta <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>

              <div className="flex items-start bg-amber-50 p-4 rounded-xl transition-all hover:shadow-md">
                <div className="flex-shrink-0 bg-amber-500 p-3 rounded-full text-white">
                  <Phone className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold mb-1 text-base md:text-lg">Telefon</h4>
                  <Link
                    href="tel:01345054"
                    className="text-amber-600 hover:text-amber-800 font-medium transition-colors duration-300 block text-sm md:text-base"
                  >
                    01345054
                  </Link>
                  <Link
                    href="tel:070-455 66 15"
                    className="text-amber-600 hover:text-amber-800 font-medium transition-colors duration-300 block text-sm md:text-base"
                  >
                    070-455 66 15
                  </Link>
                </div>
              </div>

              <div className="flex items-start bg-amber-50 p-4 rounded-xl transition-all hover:shadow-md">
                <div className="flex-shrink-0 bg-amber-500 p-3 rounded-full text-white">
                  <Mail className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold mb-1 text-base md:text-lg">E-post</h4>
                  <Link
                    href="mailto:mechofarouh5@gmail.com"
                    className="text-amber-600 hover:text-amber-800 transition-colors duration-300 text-sm md:text-base"
                  >
                    mechofarouh5@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex items-start bg-amber-50 p-4 rounded-xl transition-all hover:shadow-md">
                <div className="flex-shrink-0 bg-amber-500 p-3 rounded-full text-white">
                  <Clock className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold mb-1 text-base md:text-lg">Öppettider</h4>
                  <div className="grid grid-cols-2 gap-x-4 text-gray-600 text-sm md:text-base">
                    <p className="py-1 border-b border-amber-100">Måndag - Fredag:</p>
                    <p className="py-1 border-b border-amber-100 font-medium">09:00 - 19:00</p>
                    <p className="py-1 border-b border-amber-100">Lördag:</p>
                    <p className="py-1 border-b border-amber-100 font-medium">10:00 - 16:00</p>
                    <p className="py-1">Söndag:</p>
                    <p className="py-1 font-medium">11:00 - 16:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="tel:070-455 66 15"
                className="gold-gradient hover:opacity-90 transition-all duration-300 text-black font-bold px-5 py-3 text-base inline-flex items-center justify-center rounded-xl shadow-lg w-full sm:w-auto sm:flex-1"
                aria-label="Ring oss nu på 070-455 66 15"
              >
                <Phone className="mr-2 h-4 w-4" />
                Ring Oss Nu
              </Link>

              <button
                onClick={() => scrollToSection("tjänster")}
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300 font-bold px-5 py-3 text-base inline-flex items-center justify-center rounded-xl shadow-lg w-full sm:w-auto sm:flex-1"
                aria-label="Boka tid online"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Boka Online
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="md:col-span-7 rounded-2xl overflow-hidden shadow-xl border border-amber-100 h-[300px] md:h-[500px] mx-auto w-full"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2092.5110187307396!2d14.167207315905031!3d57.78288798117347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465a6ddc96e9c0a7%3A0x4019078290e7a70!2sLantm%C3%A4targr%C3%A4nd%2026%2C%20553%2020%20J%C3%B6nk%C3%B6ping!5e0!3m2!1ssv!2sse!4v1715039892000!5m2!1ssv!2sse"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bella Vida Barbershop på kartan"
              className="rounded-xl shadow-inner"
              aria-label="Karta till Bella Vida Barbershop"
            ></iframe>
          </motion.div>
        </div>
      </div>

      {isMobile && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => scrollToSection("footer")}
            aria-label="Scrolla till footer"
            className="flex flex-col items-center text-amber-600"
          >
            <span className="text-sm mb-1">Mer information</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </button>
        </div>
      )}
    </section>
  )
}

export default Contact
