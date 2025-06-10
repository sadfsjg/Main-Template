"use client"

import { useState, useEffect } from "react"
import { WifiOff } from "lucide-react"
import { isOnline, addConnectivityListeners } from "@/lib/pwa-utils"

export default function OfflineIndicator() {
  const [offline, setOffline] = useState(false)

  useEffect(() => {
    // Set initial state
    setOffline(!isOnline())

    // Add event listeners for online/offline events
    const cleanup = addConnectivityListeners(
      () => setOffline(false),
      () => setOffline(true),
    )

    return cleanup
  }, [])

  if (!offline) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center animate-in fade-in slide-in-from-bottom-5 duration-300">
      <WifiOff size={18} className="mr-2" />
      <span className="text-sm font-medium">Du är offline. Vissa funktioner kan vara begränsade.</span>
    </div>
  )
}
