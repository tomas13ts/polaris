import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register the plugin on the client only — this module is also evaluated
// during SSR, where window does not exist.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
