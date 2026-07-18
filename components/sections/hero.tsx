'use client'

import { useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import NeuralBackground from '@/components/ui/flow-field-background'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const textColRef = useRef<HTMLDivElement>(null)
  const sceneColRef = useRef<HTMLDivElement>(null)

  // Robot and copy are fully visible on the first screen (entrance via
  // framer-motion). On scroll-out, a gentle parallax lifts the copy up and
  // fades it while the scene scales down — tied 1:1 to scroll (scrub). Only
  // the Card wrapper is transformed; the SplineScene inside is never touched.
  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
        .to(textColRef.current, { y: -80, opacity: 0, ease: 'none' }, 0)
        .to(
          sceneColRef.current,
          { y: -40, scale: 0.92, opacity: 0.6, ease: 'none' },
          0
        )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-black/[0.96] pt-28 pb-16 md:pt-32"
    >
      {/* subtle flow-field "rays" backdrop */}
      <NeuralBackground
        className="absolute inset-0"
        color="#6366f1"
        particleCount={260}
        speed={0.5}
        trailOpacity={0.08}
        opacity={0.45}
      />
      {/* bottom fade so the rays dissolve into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black"
      />

      <Spotlight
        className="from-white/40 via-indigo-300/20 to-transparent"
        size={440}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <div ref={textColRef}>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-6"
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-neutral-300 backdrop-blur-sm"
            >
              <span className="size-1.5 rounded-full bg-indigo-500" />
              Enterprise technology solutions
            </motion.span>

            <motion.h1
              variants={item}
              className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl"
            >
              Technology that Moves the Future
            </motion.h1>

            <motion.p
              variants={item}
              className="max-w-xl text-base leading-relaxed text-neutral-300 md:text-lg"
            >
              Polaris Enterprises helps companies grow with custom software,
              resilient cloud infrastructure and applied artificial
              intelligence — from strategy to execution, focused on measurable
              results.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'h-12 border-transparent bg-indigo-600 px-6 text-base text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500'
                )}
              >
                Get Started
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#services"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'h-12 border-white/15 bg-white/5 px-6 text-base text-neutral-100 backdrop-blur-sm hover:bg-white/10 hover:text-white'
                )}
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div ref={sceneColRef}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <Card className="relative h-[500px] w-full overflow-hidden bg-black/60 py-0 ring-white/10 md:h-[600px]">
              {/*
                NOTE: demo Spline scene (interactive robot).
                Replace with Polaris Enterprises' own 3D scene before
                going to production. Only this Card wrapper is transformed
                by the scroll parallax — the scene itself is untouched.
              */}
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="h-full w-full"
              />
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
