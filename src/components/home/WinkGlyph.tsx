'use client'

import { useEffect, useRef, useState } from 'react'

import { useReducedMotion } from '@/hooks/useMotionEnabled'

const RESTING = ':)'
const SEQUENCE = [';)', ':)', ';)', ':D']
const STEP_MS = 170

export default function WinkGlyph() {
  const reduced = useReducedMotion()
  const [face, setFace] = useState(RESTING)
  const [hovered, setHovered] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  // clears on unmount; reads the ref directly so the effect owns no dependency
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
    },
    [],
  )

  const onMouseEnter = () => {
    // drop any running sequence, otherwise overlapping runs scramble the face
    clearTimers()
    setHovered(true)
    SEQUENCE.forEach((next, index) => {
      timers.current.push(setTimeout(() => setFace(next), index * STEP_MS))
    })
  }

  const onMouseLeave = () => {
    clearTimers()
    setHovered(false)
    timers.current.push(setTimeout(() => setFace(RESTING), 200))
  }

  return (
    <div
      aria-hidden="true"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative flex h-[104px] w-[104px] cursor-pointer items-center justify-center rounded-[22px] border transition-[border-color,transform] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
        hovered ? 'border-[oklch(.78_.16_85/.45)]' : 'border-bone/16'
      } ${hovered && !reduced ? 'rotate-[-4deg] scale-105' : ''}`}
    >
      <span
        style={{ fontFamily: 'ui-monospace, Menlo, monospace' }}
        className={`text-[30px] leading-none transition-colors duration-300 ${
          hovered ? 'text-amber' : 'text-bone/85'
        }`}
      >
        {face}
      </span>
    </div>
  )
}
