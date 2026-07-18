'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export function Cta() {
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  // Subtle background parallax: the glow drifts ~30px while the section
  // crosses the viewport, tied directly to scroll (gentle scrub).
  useGSAP(
    () => {
      gsap.fromTo(
        glowRef.current,
        { y: -30 },
        {
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-950/60 via-black to-black px-6 py-16 text-center md:px-16 md:py-24"
        >
          <div
            ref={glowRef}
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 size-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[120px]"
          />

          <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
              Ready to transform your business?
            </h2>
            <p className="text-neutral-400 md:text-lg">
              Talk to us and find out how Polaris Enterprises can accelerate
              your next stage of growth.
            </p>
            <a
              href="#contact"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'h-12 border-transparent bg-indigo-600 px-8 text-base text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500'
              )}
            >
              Talk to Us
              <ArrowRight className="size-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
