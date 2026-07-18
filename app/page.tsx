import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { ScrollStatement } from '@/components/sections/scroll-statement'
import { Services } from '@/components/sections/services'
import { Cta } from '@/components/sections/cta'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'
import { ScrollProgress } from '@/components/scroll-progress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ScrollStatement />
        <Services />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
