import { NextResponse } from "next/server"

export async function GET() {
  // Skapa metadata specifikt för AI-crawlers
  const aiMetadata = {
    website: {
      name: "Bella Vida Barbershop",
      description:
        "Professionell barbershop i Jönköping med högklassiga tjänster och expertis inom herrklippning och skäggtrimning",
      url: "https://bellavidabarbershop.se",
      language: "sv-SE",
      type: "local business",
      category: "beauty & personal care",
      subcategory: "barbershop",
    },
    business: {
      name: "Bella Vida Barbershop",
      legalName: "Bella Vida Barbershop AB",
      foundingDate: "2018",
      founders: ["Bella Vida Team"],
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
      contactPoints: [
        {
          type: "customer service",
          telephone: "070-455 66 15",
          email: "mechofarouh5@gmail.com",
          availableLanguage: ["Swedish", "English"],
        },
      ],
      openingHours: [
        {
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "19:00",
        },
        {
          dayOfWeek: "Saturday",
          opens: "10:00",
          closes: "16:00",
        },
        {
          dayOfWeek: "Sunday",
          opens: "11:00",
          closes: "16:00",
        },
      ],
    },
    services: [
      {
        name: "Klippning",
        description: "Professionell klippning anpassad efter dina önskemål",
        price: "400 kr",
        duration: "30 minuter",
        url: "https://bellavidabarbershop.se/#tjänster",
      },
      {
        name: "Skägg trim (kort)",
        description: "Formning och trimning av kort skägg (0-3 cm)",
        price: "280 kr",
        duration: "30 minuter",
        url: "https://bellavidabarbershop.se/#tjänster",
      },
      {
        name: "Klippning & skägg trim",
        description: "Komplett styling med klippning och skäggtrimning",
        price: "550 kr",
        duration: "50 minuter",
        url: "https://bellavidabarbershop.se/#tjänster",
      },
    ],
    content: {
      mainSections: [
        {
          id: "hero",
          type: "hero",
          headline: "Din Nöjdhet Är Vårat Nöje",
          subheading:
            "Med flera års erfarenhet samt en brinnande passion för barbering så kan du förvänta dig högklassiga tjänster.",
        },
        {
          id: "om",
          type: "about",
          headline: "Om Oss",
          content:
            "Med flera års erfarenhet samt en brinnande passion för barbering så kan du förvänta dig högklassiga tjänster. Inget gör oss gladare än att se våra kunder bli nöjda när de kliver ut ur shopen.",
        },
        {
          id: "tjänster",
          type: "services",
          headline: "Våra Tjänster",
          content:
            "Vi erbjuder ett brett utbud av professionella barberartjänster för att möta dina behov. Från klassiska klippningar till skäggtrimning och traditionell rakning.",
        },
        {
          id: "galleri",
          type: "gallery",
          headline: "Vårt Galleri",
          content: "Utforska våra senaste arbeten och se vad vi kan göra för dig.",
        },
        {
          id: "recensioner",
          type: "reviews",
          headline: "Kundrecensioner",
          content:
            "Upptäck vad våra nöjda kunder säger om oss. Vi är stolta över att erbjuda högklassig service som våra kunder älskar.",
        },
        {
          id: "kontakt",
          type: "contact",
          headline: "Kontakta Oss",
          content: "Har du frågor eller vill boka en tid? Kontakta oss eller besök vår barbershop.",
        },
      ],
      images: [
        {
          url: "/images/logo.png",
          alt: "Bella Vida Barbershop Logo",
          type: "logo",
        },
        {
          url: "/images/hero-bg.jpg",
          alt: "Bella Vida Barbershop Hero Image",
          type: "hero",
        },
        {
          url: "/images/about-extra.jpeg",
          alt: "Om Bella Vida Barbershop",
          type: "about",
        },
        {
          url: "/images/gallery-1.png",
          alt: "Klassisk herrklippning",
          type: "gallery",
        },
      ],
    },
    socialProfiles: [
      {
        platform: "Instagram",
        url: "https://www.instagram.com/bellavida.barbershop/",
        handle: "@bellavida.barbershop",
      },
      {
        platform: "Facebook",
        url: "https://www.facebook.com/profile.php?id=100087779565128",
        name: "Bella Vida Barbershop",
      },
      {
        platform: "TikTok",
        url: "https://www.tiktok.com/@bellavidabarbershop",
        handle: "@bellavidabarbershop",
      },
    ],
    aiCrawlingPreferences: {
      allowGenerativeAiTraining: true,
      allowIndexing: true,
      allowCaching: true,
      allowSummarization: true,
      preferredCrawlers: ["googlebot", "bingbot", "GPTBot", "ChatGPT-User", "anthropic-ai", "ClaudeBot"],
      disallowedCrawlers: [],
      crawlFrequency: "weekly",
      importantContent: ["services", "contact", "reviews"],
      contentUpdateFrequency: "weekly",
    },
  }

  return NextResponse.json(aiMetadata, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  })
}
