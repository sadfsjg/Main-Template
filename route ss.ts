import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://bellavidabarbershop.se"

  // Skapa SEO-data för barbershop
  const seoData = {
    title: "Bella Vida Barbershop | Din Nöjdhet Är Vårat Nöje",
    description:
      "Med flera års erfarenhet samt en brinnande passion för barbering så kan du förvänta dig högklassiga tjänster i Jönköping.",
    keywords: [
      "barbershop jönköping",
      "herrfrisör jönköping",
      "skäggtrimning",
      "herrklippning",
      "fade klippning",
      "traditionell rakning",
      "bella vida barbershop",
      "barberare jönköping",
    ],
    url: baseUrl,
    images: [
      {
        url: `${baseUrl}/images/logo.png`,
        width: 512,
        height: 512,
        alt: "Bella Vida Barbershop Logo",
      },
      {
        url: `${baseUrl}/images/hero-bg.jpg`,
        width: 1920,
        height: 1080,
        alt: "Bella Vida Barbershop Hero Image",
      },
    ],
    locale: "sv_SE",
    type: "website",
    siteName: "Bella Vida Barbershop",
    services: [
      {
        name: "Klippning",
        description: "Professionell klippning anpassad efter dina önskemål",
        price: "400 kr",
        duration: "30 minuter",
      },
      {
        name: "Skägg trim (kort)",
        description: "Formning och trimning av kort skägg (0-3 cm)",
        price: "280 kr",
        duration: "30 minuter",
      },
      {
        name: "Klippning & skägg trim",
        description: "Komplett styling med klippning och skäggtrimning",
        price: "550 kr",
        duration: "50 minuter",
      },
    ],
    address: {
      street: "Lantmätargränd 26",
      city: "Jönköping",
      postalCode: "553 20",
      country: "Sverige",
      coordinates: {
        latitude: 57.7826,
        longitude: 14.1618,
      },
    },
    contact: {
      phone: "070-455 66 15",
      email: "mechofarouh5@gmail.com",
    },
    openingHours: {
      monday: "09:00 - 19:00",
      tuesday: "09:00 - 19:00",
      wednesday: "09:00 - 19:00",
      thursday: "09:00 - 19:00",
      friday: "09:00 - 19:00",
      saturday: "10:00 - 16:00",
      sunday: "11:00 - 16:00",
    },
    socialMedia: [
      {
        platform: "Instagram",
        url: "https://www.instagram.com/bellavida.barbershop/",
      },
      {
        platform: "Facebook",
        url: "https://www.facebook.com/profile.php?id=100087779565128",
      },
      {
        platform: "TikTok",
        url: "https://www.tiktok.com/@bellavidabarbershop",
      },
    ],
    reviews: {
      average: 4.9,
      count: 500,
      featured: [
        {
          author: "Alexander Svensson",
          date: "2024-04-18",
          rating: 5,
          text: "Fantastisk service och resultat! Bästa barberaren i Jönköping utan tvekan.",
        },
        {
          author: "Emma Lindqvist",
          date: "2024-03-27",
          rating: 5,
          text: "Min man är supernöjd med sin nya frisyr. Professionell service och trevlig personal!",
        },
      ],
    },
  }

  return NextResponse.json(seoData, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  })
}
