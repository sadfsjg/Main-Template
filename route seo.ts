import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://bellavidabarbershop.se"
  const currentDate = new Date().toISOString()

  // Skapa sitemap-data för barbershop
  const sitemapData = {
    baseUrl,
    lastUpdated: currentDate,
    pages: [
      {
        url: "/",
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 1.0,
        images: [
          {
            url: "/images/logo.png",
            title: "Bella Vida Barbershop Logo",
            caption: "Bella Vida Barbershop - Din Nöjdhet Är Vårat Nöje",
          },
          {
            url: "/images/hero-bg.jpg",
            title: "Bella Vida Barbershop Hero Image",
            caption: "Professionell barbershop i Jönköping",
          },
        ],
      },
      {
        url: "/#om",
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
        images: [
          {
            url: "/images/about-extra.jpeg",
            title: "Om Bella Vida Barbershop",
            caption: "Vår passion för barbering",
          },
        ],
      },
      {
        url: "/#tjänster",
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9,
        images: [
          {
            url: "/modern-haircut.png",
            title: "Modern Haircut",
            caption: "Modern herrklippning",
          },
          {
            url: "/beard-trim.png",
            title: "Beard Trim",
            caption: "Professionell skäggtrimning",
          },
        ],
      },
      {
        url: "/#galleri",
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.7,
        images: [
          {
            url: "/images/gallery-1.png",
            title: "Klassisk herrklippning",
            caption: "Klassisk herrklippning med precision och stil",
          },
          {
            url: "/images/gallery-2.png",
            title: "Modern fade-klippning",
            caption: "Modern fade-klippning med skarp kontrast",
          },
          {
            url: "/images/gallery-3.png",
            title: "Skäggtrimning",
            caption: "Professionell skäggtrimning och formning",
          },
        ],
      },
      {
        url: "/#recensioner",
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.6,
      },
      {
        url: "/#kontakt",
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ],
    services: [
      {
        name: "Klippning",
        url: "/#tjänster",
        price: "400 kr",
      },
      {
        name: "Skägg trim (kort)",
        url: "/#tjänster",
        price: "280 kr",
      },
      {
        name: "Klippning & skägg trim",
        url: "/#tjänster",
        price: "550 kr",
      },
    ],
  }

  return NextResponse.json(sitemapData, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  })
}
