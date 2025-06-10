"use client"

import type React from "react"

import { useState } from "react"
import { saveFormForOfflineSubmission } from "@/lib/pwa-utils"
import { isOnline } from "@/lib/pwa-utils"

interface OfflineFormProps {
  onSubmit: (data: any) => Promise<any>
  formType?: string
  children: React.ReactNode
}

export default function OfflineForm({ onSubmit, formType = "booking-form", children }: OfflineFormProps) {
  const [offlineSubmitted, setOfflineSubmitted] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    // If online, submit normally
    if (isOnline()) {
      try {
        await onSubmit(data)
        event.currentTarget.reset()
      } catch (error) {
        console.error("Error submitting form:", error)
        // If submission fails, try to save for offline submission
        const saved = await saveFormForOfflineSubmission(data, formType)
        if (saved) {
          setOfflineSubmitted(true)
          setTimeout(() => setOfflineSubmitted(false), 5000)
        }
      }
    } else {
      // If offline, save for later submission
      const saved = await saveFormForOfflineSubmission(data, formType)
      if (saved) {
        setOfflineSubmitted(true)
        setTimeout(() => setOfflineSubmitted(false), 5000)
        event.currentTarget.reset()
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>{children}</form>

      {offlineSubmitted && (
        <div className="mt-4 p-3 bg-amber-100 text-amber-800 rounded-md">
          <p className="text-sm font-medium">
            Din information har sparats och kommer att skickas automatiskt när du är online igen.
          </p>
        </div>
      )}
    </div>
  )
}
