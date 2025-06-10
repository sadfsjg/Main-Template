"use client"

import type React from "react"

import { useRef } from "react"
import { Facebook, Instagram } from "lucide-react"
import { TikTokIcon } from "@/components/icons/tiktok-icon"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import SocialMediaLink from "@/components/social-media-link"

// Interface for social media links
interface SocialLink {
  name: string
  icon: React.ReactNode
  url: string
  appUrl: string
  color: string
  followers: string
  description: string
}

const SocialMedia = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const socialLinks: SocialLink[] = [
    {
      name: "Instagram",
      icon: <Instagram className="h-8 w-8" />,
      url: "https://www.instagram.com/bellavida.barbershop/",
      appUrl: "instagram://user?username=bellavida.barbershop",
      color: "from-purple-500 to-pink-500",
      followers: "1.2k",
      description: "Följ oss för dagliga uppdateringar och inspiration",
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-8 w-8" />,
      url: "https://www.facebook.com/profile.php?id=100087779565128",
      appUrl: "fb://profile/100087779565128",
      color: "from-blue-600 to-blue-800",
      followers: "850+",
      description: "Gilla vår sida för erbjudanden och nyheter",
    },
    {
      name: "TikTok",
      icon: <TikTokIcon className="h-8 w-8" />,
      url: "https://www.tiktok.com/@bellavidabarbershop",
      appUrl: "tiktok://user?username=bellavidabarbershop",
      color: "from-black to-gray-800",
      followers: "500+",
      description: "Kolla in våra senaste klipp och trender",
    },
  ]

  // Function to handle opening social media apps
  const handleSocialClick = (social: SocialLink, e: React.MouseEvent) => {
    // This function is now handled by the SocialMediaLink component
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-black to-gray-900 text-white relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-900/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-900/20 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            FÖLJ <span className="text-gold">OSS</span>
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
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Följ oss på sociala medier för att se våra senaste arbeten, erbjudanden och håll dig uppdaterad.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {socialLinks.map((social, index) => (
            <motion.div
              key={social.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-amber-500 transition-all duration-300 group"
            >
              <div className={`bg-gradient-to-r ${social.color} h-24 relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20 bg-pattern"></div>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm p-2 rounded-full">
                  {social.icon}
                </div>
              </div>

              <div className="p-6 relative">
                <div className="absolute -top-10 left-6 bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-2xl border-4 border-gray-900 group-hover:border-amber-500 transition-all duration-300">
                  {social.icon}
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-1 flex items-center">
                    {social.name}
                    <span className="ml-2 text-xs bg-amber-500 text-black px-2 py-0.5 rounded-full">
                      {social.followers} följare
                    </span>
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{social.description}</p>

                  <SocialMediaLink
                    href={social.url}
                    appUrl={social.appUrl}
                    className="gold-gradient hover:opacity-90 text-black font-medium py-3 px-6 rounded-xl inline-flex items-center transition-all w-full justify-center"
                    ariaLabel={`Följ oss på ${social.name}`}
                  >
                    <span>Följ oss på {social.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2 h-4 w-4"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </SocialMediaLink>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block gold-gradient p-[1px] rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Dela ditt resultat</h3>
                  <p className="text-gray-400 mb-6">
                    Nöjd med din nya look? Tagga oss i dina bilder på sociala medier och använd hashtag
                    #BellaVidaBarbershop
                  </p>
                </div>

                <div className="flex-1 flex justify-center items-center">
                  <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-amber-500">
                    <Image
                      src="/images/logo.png"
                      alt="Bella Vida Barbershop Logo"
                      fill
                      className="object-contain p-2 hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SocialMedia
