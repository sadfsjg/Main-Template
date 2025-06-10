"use client"

import { useState, useEffect } from "react"
import { X, Download, Share2, Info } from "lucide-react"

interface PlatformInstallGuideProps {
  isOpen: boolean
  onClose: () => void
}

export default function PlatformInstallGuide({ isOpen, onClose }: PlatformInstallGuideProps) {
  const [platform, setPlatform] = useState<"ios" | "android" | "desktop" | "unknown">("unknown")

  useEffect(() => {
    // Detect platform
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || ""

    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
      setPlatform("ios")
    } else if (/android/i.test(userAgent)) {
      setPlatform("android")
    } else {
      setPlatform("desktop")
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl relative animate-in fade-in slide-in-from-bottom-5 duration-300">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Stäng"
        >
          <X size={24} />
        </button>

        <div className="p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
              {platform === "ios" ? (
                <Share2 size={32} className="text-amber-600" />
              ) : (
                <Download size={32} className="text-amber-600" />
              )}
            </div>
          </div>

          <h2 className="text-xl font-bold text-center mb-4">Installera Bella Vida Barbershop</h2>

          {platform === "ios" && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">
                  1
                </div>
                <div>
                  <p className="font-medium">Tryck på dela-ikonen i webbläsaren</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Hitta dela-ikonen i nederkanten av skärmen (Safari) eller i överkanten (Chrome)
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">
                  2
                </div>
                <div>
                  <p className="font-medium">Välj "Lägg till på hemskärmen"</p>
                  <p className="text-sm text-gray-600 mt-1">Scrolla ned i menyn om alternativet inte syns direkt</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">
                  3
                </div>
                <div>
                  <p className="font-medium">Tryck på "Lägg till"</p>
                  <p className="text-sm text-gray-600 mt-1">Appen kommer nu att installeras på din hemskärm</p>
                </div>
              </div>
            </div>
          )}

          {platform === "android" && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">
                  1
                </div>
                <div>
                  <p className="font-medium">Tryck på menyknappen i webbläsaren</p>
                  <p className="text-sm text-gray-600 mt-1">Hitta de tre punkterna i övre högra hörnet</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">
                  2
                </div>
                <div>
                  <p className="font-medium">Välj "Installera app" eller "Lägg till på startskärmen"</p>
                  <p className="text-sm text-gray-600 mt-1">Alternativet kan variera beroende på webbläsare</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">
                  3
                </div>
                <div>
                  <p className="font-medium">Följ instruktionerna på skärmen</p>
                  <p className="text-sm text-gray-600 mt-1">Bekräfta installationen när du blir tillfrågad</p>
                </div>
              </div>
            </div>
          )}

          {platform === "desktop" && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">
                  1
                </div>
                <div>
                  <p className="font-medium">Klicka på installationsikonen i adressfältet</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Leta efter en ikon som liknar en dator med en nedladdningspil
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">
                  2
                </div>
                <div>
                  <p className="font-medium">Klicka på "Installera"</p>
                  <p className="text-sm text-gray-600 mt-1">
                    En dialogruta kommer att visas med installationsalternativ
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex items-start">
                <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-3">
                  3
                </div>
                <div>
                  <p className="font-medium">Bekräfta installationen</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Appen kommer att installeras och kan startas från skrivbordet eller startmenyn
                  </p>
                </div>
              </div>
            </div>
          )}

          {platform === "unknown" && (
            <div className="bg-amber-50 p-4 rounded-lg flex items-start">
              <Info size={24} className="text-amber-600 shrink-0 mr-3" />
              <p className="text-sm">
                Vi kunde inte identifiera din enhet. Generellt sett kan du installera appen genom att använda
                webbläsarens meny och välja alternativet "Lägg till på hemskärmen" eller "Installera app".
              </p>
            </div>
          )}

          <button
            onClick={onClose}
            className="mt-6 w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            Jag förstår
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            Efter installation får du snabbare åtkomst och kan använda appen även utan internetanslutning.
          </p>
        </div>
      </div>
    </div>
  )
}
