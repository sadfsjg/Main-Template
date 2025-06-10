"use client"

import { useState, useRef, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const Booking = () => {
  const [activeTab, setActiveTab] = useState("boka")
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [isLoading, setIsLoading] = useState(true)
  const [iframeError, setIframeError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Add timeout to handle cases where iframe might not load properly
  useEffect(() => {
    let loadingTimeout: NodeJS.Timeout

    if (isLoading) {
      loadingTimeout = setTimeout(() => {
        setIsLoading(false)
      }, 8000) // 8 seconds timeout
    }

    return () => {
      if (loadingTimeout) clearTimeout(loadingTimeout)
    }
  }, [isLoading])

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setIframeError(true)
  }

  const retryLoading = (url: string) => {
    setIsLoading(true)
    setIframeError(false)
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.src = url
      }
    }, 500)
  }

  return (
    <section id="boka" ref={sectionRef} className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-50 rounded-full -translate-x-1/3 translate-y-1/3 opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            BOKA <span className="text-gold">TID</span>
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
            Boka din tid online eller se våra barberare och tjänster.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-4xl mx-auto"
        >
          <Tabs defaultValue="boka" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 shadow-md overflow-hidden rounded-lg">
              <TabsTrigger
                value="boka"
                onClick={() => {
                  setActiveTab("boka")
                  setIsLoading(true)
                  setIframeError(false)
                }}
                className={`py-3 ${activeTab === "boka" ? "bg-amber-500 text-black" : ""}`}
              >
                Boka Tid
              </TabsTrigger>
              <TabsTrigger
                value="barberare"
                onClick={() => {
                  setActiveTab("barberare")
                  setIsLoading(true)
                  setIframeError(false)
                }}
                className={`py-3 ${activeTab === "barberare" ? "bg-amber-500 text-black" : ""}`}
              >
                Barberare
              </TabsTrigger>
              <TabsTrigger
                value="priser"
                onClick={() => {
                  setActiveTab("priser")
                  setIsLoading(false)
                  setIframeError(false)
                }}
                className={`py-3 ${activeTab === "priser" ? "bg-amber-500 text-black" : ""}`}
              >
                Priser
              </TabsTrigger>
            </TabsList>

            <TabsContent value="boka" className="border rounded-lg p-6 bg-white shadow-xl">
              <div className="aspect-video w-full relative">
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-6">
                    <div className="w-full max-w-md">
                      <div className="flex items-center justify-center mb-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                      </div>

                      <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
                      <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
                      <Skeleton className="h-4 w-2/3 mx-auto mb-2" />
                      <Skeleton className="h-4 w-1/2 mx-auto mb-6" />

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <Skeleton className="h-12 w-full rounded-md" />
                        <Skeleton className="h-12 w-full rounded-md" />
                      </div>

                      <Skeleton className="h-[300px] w-full rounded-md" />

                      <div className="mt-6 text-center text-gray-500">
                        <p>Laddar bokningssystem från Bokadirekt...</p>
                        <p className="text-sm mt-2">Du kommer snart kunna boka din tid</p>
                      </div>
                    </div>
                  </div>
                )}

                {iframeError && activeTab === "boka" ? (
                  <div className="flex flex-col items-center justify-center p-8 h-[500px] bg-gray-50">
                    <div className="text-amber-600 mb-4">
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
                    <h3 className="text-xl font-bold mb-2">Kunde inte ladda bokningssystemet</h3>
                    <p className="text-gray-600 mb-6 text-center">
                      Det verkar som att vi har problem med att ansluta till bokningssystemet just nu.
                    </p>
                    <div className="flex flex-col gap-4">
                      <Button
                        className="gold-gradient hover:opacity-90 text-black"
                        onClick={() => retryLoading("https://www.bokadirekt.se/places/bella-vida-barbershop-49893")}
                      >
                        Försök igen
                      </Button>
                      <a
                        href="https://www.bokadirekt.se/places/bella-vida-barbershop-49893"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:text-amber-700 text-center"
                      >
                        Öppna bokningssidan i nytt fönster
                      </a>
                    </div>
                  </div>
                ) : (
                  <iframe
                    ref={iframeRef}
                    src="https://www.bokadirekt.se/places/bella-vida-barbershop-49893"
                    title="Boka tid hos Bella Vida Barbershop"
                    className="w-full h-full border-0"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                  ></iframe>
                )}
              </div>
            </TabsContent>

            <TabsContent value="barberare" className="border rounded-lg p-6 bg-white shadow-xl">
              <div className="aspect-video w-full relative">
                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 p-6">
                    <div className="w-full max-w-md">
                      <div className="flex items-center justify-center mb-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                      </div>

                      <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
                      <Skeleton className="h-4 w-1/2 mx-auto mb-2" />
                      <Skeleton className="h-4 w-2/3 mx-auto mb-2" />
                      <Skeleton className="h-4 w-1/2 mx-auto mb-6" />

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <Skeleton className="h-12 w-full rounded-md" />
                        <Skeleton className="h-12 w-full rounded-md" />
                      </div>

                      <Skeleton className="h-[300px] w-full rounded-md" />

                      <div className="mt-6 text-center text-gray-500">
                        <p>Laddar information om barberare...</p>
                        <p className="text-sm mt-2">Du kommer snart kunna se våra barberare</p>
                      </div>
                    </div>
                  </div>
                )}

                {iframeError && activeTab === "barberare" ? (
                  <div className="flex flex-col items-center justify-center p-8 h-[500px] bg-gray-50">
                    <div className="text-amber-600 mb-4">
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
                    <h3 className="text-xl font-bold mb-2">Kunde inte ladda information om barberare</h3>
                    <p className="text-gray-600 mb-6 text-center">
                      Det verkar som att vi har problem med att ansluta till bokningssystemet just nu.
                    </p>
                    <div className="flex flex-col gap-4">
                      <Button
                        className="gold-gradient hover:opacity-90 text-black"
                        onClick={() =>
                          retryLoading("https://www.bokadirekt.se/places/bella-vida-barbershop-49893#staff")
                        }
                      >
                        Försök igen
                      </Button>
                      <a
                        href="https://www.bokadirekt.se/places/bella-vida-barbershop-49893#staff"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:text-amber-700 text-center"
                      >
                        Öppna sidan i nytt fönster
                      </a>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src="https://www.bokadirekt.se/places/bella-vida-barbershop-49893#staff"
                    title="Barberare hos Bella Vida Barbershop"
                    className="w-full h-full border-0"
                    onLoad={handleIframeLoad}
                    onError={handleIframeError}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                  ></iframe>
                )}
              </div>
            </TabsContent>

            <TabsContent value="priser" className="border rounded-lg p-6 bg-white shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-amber-500 mr-2 flex-shrink-0"></span>
                      Klippning
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Klippning</span>
                        <span className="font-semibold">400 kr</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Klippning 10-18 år</span>
                        <span className="font-semibold">350 kr</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Barn klippning 0-10 år</span>
                        <span className="font-semibold">320 kr</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Student klippning</span>
                        <span className="font-semibold">350 kr</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Senior klippning</span>
                        <span className="font-semibold">330 kr</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-amber-500 mr-2 flex-shrink-0"></span>
                      Skägg & Rakning
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Skägg trim, kort skägg 0-3 cm</span>
                        <span className="font-semibold">280 kr</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Skägg trim, över 3 cm</span>
                        <span className="font-semibold">300 kr</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Traditionell rakning med kniv</span>
                        <span className="font-semibold">250 kr</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Huvud rakning</span>
                        <span className="font-semibold">199 kr</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-amber-500 mr-2 flex-shrink-0"></span>
                      Kombinationer
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Klippning & skägg trim, kort skägg</span>
                        <span className="font-semibold">550 kr</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Klippning & skägg trim, långt skägg</span>
                        <span className="font-semibold">600 kr</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Klippning & traditionell rakning</span>
                        <span className="font-semibold">550 kr</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Huvud rakning & skägg trim</span>
                        <span className="font-semibold">520 kr</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-amber-500 mr-2 flex-shrink-0"></span>
                      Specialpaket
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Snaggning med skinfade</span>
                        <span className="font-semibold">400 kr</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Snaggning med skinfade & skägg trim</span>
                        <span className="font-semibold">550 kr</span>
                      </li>
                      <li className="flex justify-between border-b border-gray-100 pb-2">
                        <span>Bröllop & exklusiva paketet</span>
                        <span className="font-semibold">700 kr</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Student klippning & skägg trim</span>
                        <span className="font-semibold">500 kr</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

export default Booking
