'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import 'lenis/dist/lenis.css'

/**
 * Site-wide damped smooth scroll (Lenis) kept in sync with GSAP's
 * ScrollTrigger. Wraps the app in layout.tsx without touching page structure.
 *
 * Note: motion runs regardless of the OS reduced-motion setting so the
 * scroll effects are always visible. To honor prefers-reduced-motion for
 * production accessibility, early-return here (and gate the section GSAP
 * timelines) when window.matchMedia('(prefers-reduced-motion: reduce)')
 * matches.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis({
      // lerp: how much the scroll position catches up per frame
      // (lower = floatier, higher = snappier). Tune between 0.08–0.15.
      lerp: 0.1,
      // smooth-scroll anchor links too; offset clears the fixed navbar
      anchors: { offset: -80 },
    })

    // Drive Lenis from GSAP's ticker so ScrollTrigger and Lenis share one clock
    lenis.on('scroll', ScrollTrigger.update)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
