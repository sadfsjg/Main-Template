"use client"

import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

export function ReminderToast() {
  const { toast } = useToast()

  useEffect(() => {
    const handleReminderLater = (e: StorageEvent) => {
      if (e.key === "pwa-reminder-shown" && e.newValue) {
        // Visa en toast-notifikation efter att användaren valt "Påminn mig senare"
        setTimeout(() => {
          toast({
            title: "Du kan alltid installera appen senare",
            description: "Klicka på menyn i din webbläsare för att installera",
            duration: 5000,
          })
        }, 1000)
      }
    }

    window.addEventListener("storage", handleReminderLater)
    return () => window.removeEventListener("storage", handleReminderLater)
  }, [toast])

  return null
}
