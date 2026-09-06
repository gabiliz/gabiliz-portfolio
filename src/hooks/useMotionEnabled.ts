'use client'

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)'

/**
 * Cursor-driven tilt only runs on a fine pointer and when the visitor hasn't
 * asked for reduced motion.
 */
export function useMotionEnabled() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const update = () => setEnabled(media.matches)

    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return enabled
}

/** Only the reduced-motion preference, without the pointer capability check. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)

    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return reduced
}
