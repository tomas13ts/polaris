'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { BrainCircuit, CloudCog, Code2, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { gsap } from '@/lib/gsap'

const services = [
  {
    icon: TrendingUp,
    title: 'Digital Transformation Consulting',
    description:
      'We map processes and design the technology strategy that accelerates your business growth.',
  },
  {
    icon: Code2,
    title: 'Custom Software Development',
    description:
      'Scalable web and mobile products, tailor-made and centered on user experience.',
  },
  {
    icon: CloudCog,
    title: 'Cloud Infrastructure & DevOps',
    description:
      'Secure cloud architectures, CI/CD automation and observability to operate without interruptions.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Applied to Business',
    description:
      'Artificial intelligence models and automation that turn data into decisions and competitive advantage.',
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  // Desktop: the section pins while each card is unmasked bottom-up
  // (clip-path) with its icon spinning in, one after another, driven by
  // scroll (scrub). Mobile keeps a simple staggered reveal — pinning is
  // fragile on small screens.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          desktop: '(min-width: 768px)',
          mobile: '(max-width: 767px)',
        },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean }
          const cards = gsap.utils.toArray<HTMLElement>('[data-service-card]')

          if (desktop) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                // total pinned scroll distance — raise for a slower sequence
                end: '+=1800',
                pin: true,
                scrub: 0.5,
                anticipatePin: 1,
              },
            })
            cards.forEach((card, index) => {
              const icon = card.querySelector('[data-service-icon]')
              tl.fromTo(
                card,
                { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, y: 40 },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  opacity: 1,
                  y: 0,
                  ease: 'none',
                  duration: 0.5,
                },
                index * 0.5
              )
              if (icon) {
                tl.fromTo(
                  icon,
                  { rotate: -25, scale: 0.5, opacity: 0 },
                  {
                    rotate: 0,
                    scale: 1,
                    opacity: 1,
                    ease: 'back.out(1.7)',
                    duration: 0.4,
                  },
                  index * 0.5 + 0.15
                )
              }
            })
          } else {
            gsap.from(cards, {
              opacity: 0,
              y: 40,
              duration: 0.5,
              ease: 'power2.out',
              stagger: 0.12,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            })
          }
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="services" className="bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center"
        >
          <Badge
            variant="outline"
            className="border-white/10 bg-white/5 px-3 text-neutral-300"
          >
            Services
          </Badge>
          <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl font-bold text-transparent md:text-5xl">
            What We Do
          </h2>
          <p className="text-neutral-400">
            End-to-end solutions covering your company&apos;s entire technology
            lifecycle — from strategy to operations.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, description }) => (
            <div key={title} data-service-card>
              <Card className="h-full bg-white/5 ring-white/10 backdrop-blur-sm transition-colors duration-300 hover:ring-indigo-500/40">
                <CardHeader className="gap-4">
                  <div
                    data-service-icon
                    className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25"
                  >
                    <Icon className="size-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-white">{title}</CardTitle>
                  <CardDescription className="leading-relaxed text-neutral-400">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
