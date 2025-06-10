import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import InstallButton from "@/components/InstallButton"
import DownloadReminder from "@/components/pwa/download-reminder"
import OfflineIndicator from "@/components/pwa/offline-indicator"
import { ReminderToast } from "@/components/pwa/reminder-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Samos Barbershop | Professionell Frisör & Barberare i Jönköping",
  description:
    "Samos Barbershop grundades 2010. Vi har flera års erfarenhet av att klippa och forma alla typer av hår och skägg. Centralt beläget på Klostergatan 50B i Jönköping med fri parkering.",
  keywords: [
    "samos barbershop",
    "frisör jönköping",
    "barberare jönköping",
    "herrklippning",
    "damklippning",
    "barnklippning",
    "skägg",
    "klostergatan",
    "torpa",
    "fri parkering",
  ],
  authors: [{ name: "Samos Barbershop" }],
  creator: "Samos Barbershop",
  publisher: "Samos Barbershop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://samosbarbershop.se"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Samos Barbershop | Professionell Frisör & Barberare i Jönköping",
    description:
      "Samos Barbershop grundades 2010. Vi har flera års erfarenhet av att klippa och forma alla typer av hår och skägg. Centralt beläget med fri parkering.",
    url: "https://samosbarbershop.se",
    siteName: "Samos Barbershop",
    images: [
      {
        url: "https://fvega0dwq1jnr8l4.public.blob.vercel-storage.com/logo-LfwF1WGknmDvZTika58ZPF9PDceuCD.png",
        width: 1200,
        height: 630,
        alt: "Samos Barbershop Logo",
      },
    ],
    locale: "sv_SE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samos Barbershop | Professionell Frisör & Barberare i Jönköping",
    description:
      "Samos Barbershop grundades 2010. Vi har flera års erfarenhet av att klippa och forma alla typer av hår och skägg.",
    images: [
      "https://fvega0dwq1jnr8l4.public.blob.vercel-storage.com/logo-LfwF1WGknmDvZTika58ZPF9PDceuCD.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#1a365d" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Samos Barbershop" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#1a365d" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <InstallButton />
          <DownloadReminder />
          <OfflineIndicator />
          <ReminderToast />
        </ThemeProvider>
      </body>
    </html>
  )
}