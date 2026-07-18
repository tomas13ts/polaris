'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const STATEMENT = "We build the infrastructure behind tomorrow's companies."
const WORDS = STATEMENT.split(' ')

export function ScrollStatement() {
  const sectionRef = useRef<HTMLElement>(null)
  const blockRef = useRef<HTMLParagraphElement>(null)

  // Word-by-word illumination: each word lifts from dim to full as the
  // scroll passes over it (the classic "text that lights up as you read"
  // effect). Desktop pins the section so the reading is deliberate; smaller
  // screens scrub without pinning.
  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>('[data-word]')
      const mm = gsap.matchMedia()
      mm.add(
        {
          desktop: '(min-width: 768px)',
          mobile: '(max-width: 767px)',
        },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean }

          // the block "emerges" with a top-down mask reveal as it enters
          gsap.fromTo(
            blockRef.current,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                end: 'top 45%',
                scrub: true,
              },
            }
          )

          gsap.set(words, { opacity: 0.15 })

          if (desktop) {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top top',
                  // pinned reading distance — raise for a slower reveal
                  end: '+=900',
                  pin: true,
                  scrub: 0.4,
                },
              })
              .to(words, {
                opacity: 1,
                ease: 'none',
                stagger: 0.5,
                duration: 1,
              })
          } else {
            gsap.to(words, {
              opacity: 1,
              ease: 'none',
              stagger: 0.3,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'bottom 60%',
                scrub: true,
              },
            })
          }
        }
      )
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="flex min-h-screen w-full items-center bg-black py-32"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p
          ref={blockRef}
          className="text-3xl leading-tight font-semibold tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          {WORDS.map((word, index) => (
            <span
              key={`${word}-${index}`}
              data-word
              className="mr-[0.25em] inline-block"
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
