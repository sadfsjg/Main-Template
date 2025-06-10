import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Samos Barbershop",
    short_name: "Samos",
    description: "Professionell frisör & barberare i Jönköping sedan 2010. Centralt beläget med fri parkering.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e40af",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
    ],
    shortcuts: [
      {
        name: "Boka tid",
        short_name: "Boka",
        description: "Boka en tid hos oss",
        url: "/#tjanster",
        icons: [{ src: "/icons/booking-icon.png", sizes: "192x192" }],
      },
      {
        name: "Kontakta oss",
        short_name: "Kontakt",
        description: "Se våra kontaktuppgifter",
        url: "/#kontakt",
        icons: [{ src: "/icons/contact-icon.png", sizes: "192x192" }],
      },
      {
        name: "Galleri",
        short_name: "Galleri",
        description: "Se vårt galleri",
        url: "/#galleri",
        icons: [{ src: "/icons/gallery-icon.png", sizes: "192x192" }],
      },
    ],
    screenshots: [
      {
        src: "/screenshots/screenshot1.png",
        sizes: "1280x720",
        type: "image/png",
        platform: "wide",
        label: "Samos Barbershop Hemsida",
      },
      {
        src: "/screenshots/screenshot2.png",
        sizes: "1280x720",
        type: "image/png",
        platform: "wide",
        label: "Våra Tjänster",
      },
      {
        src: "/screenshots/screenshot3.png",
        sizes: "1280x720",
        type: "image/png",
        platform: "wide",
        label: "Kontakta Oss",
      },
    ],
    related_applications: [
      {
        platform: "webapp",
        url: "https://samosbarbershop.se/manifest.json",
      },
    ],
    prefer_related_applications: false,
    categories: ["business", "lifestyle", "shopping"],
    lang: "sv-SE",
    dir: "ltr",
  }
}