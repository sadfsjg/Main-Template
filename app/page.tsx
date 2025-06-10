import Header from "@/components/header"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Services from "@/components/sections/services"
import Gallery from "@/components/sections/gallery"
import Reviews from "@/components/sections/reviews"
import Contact from "@/components/sections/contact"
import SocialMedia from "@/components/sections/social-media"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Reviews />
      <Contact />
      <SocialMedia />
      <Footer />
    </main>
  )
}