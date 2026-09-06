'use client'

import type { MouseEvent } from 'react'

import { useMotionEnabled } from './useMotionEnabled'

const TRANSITION = 'transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]'

/**
 * 3D tilt for cards and project rows. The container must set `perspective`.
 * Deliberately restrained: the card turns toward the cursor without lifting
 * off the page.
 */
export function useTilt({ maxDeg = 5 } = {}) {
  const enabled = useMotionEnabled()

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (!enabled) return

    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5

    element.style.transform = `rotateY(${px * maxDeg}deg) rotateX(${-py * maxDeg}deg)`
    element.style.boxShadow = `${-px * 14}px ${-py * 14 + 8}px 28px rgba(0,0,0,.4)`
  }

  const onMouseLeave = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.style.transform = ''
    event.currentTarget.style.boxShadow = ''
  }

  return { enabled, tiltProps: { onMouseMove, onMouseLeave }, tiltClassName: TRANSITION }
}
