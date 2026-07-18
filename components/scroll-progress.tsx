'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

/**
 * Subtle fixed progress rail on the right edge — a thin vertical line whose
 * indigo fill grows top-to-bottom with total page scroll, reinforcing the
 * "one continuous sequence" feel. Desktop only.
 */
export function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px)', () => {
      gsap.set(fillRef.current, { scaleY: 0, transformOrigin: 'top' })
      gsap.to(fillRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    })
  })

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-1/2 right-5 z-40 hidden h-40 w-px -translate-y-1/2 overflow-hidden bg-white/10 md:block"
    >
      <div
        ref={fillRef}
        className="h-full w-full origin-top bg-gradient-to-b from-indigo-400 to-violet-500"
      />
    </div>
  )
}
