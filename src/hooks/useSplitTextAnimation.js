import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(SplitText, ScrollTrigger)

/**
 * Attach the same word-by-word scroll animation as the About page
 * to every h1, h2, h3, p inside the returned ref.
 *
 * @param {Array} deps - re-run when these change (e.g. after async data loads)
 * @returns ref  - attach to the page's root element
 */
export default function useSplitTextAnimation(deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const targets = ref.current.querySelectorAll('h1, h2, h3, p')
    const splits = []
    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        const split = SplitText.create(el, { type: 'words' })
        splits.push(split)
        gsap.from(split.words, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })
      })
    }, ref)
    return () => {
      ctx.revert()
      splits.forEach((s) => s.revert())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
