'use client'

import { useEffect, useRef } from 'react'

import { useLang } from '@/i18n/LanguageProvider'
import type { Localized } from '@/i18n/types'

export type Role = {
  id: string
  company: string
  current: boolean
  date: Localized
  title: Localized
  stack: string[]
  bullets: Localized[]
}

type Props = {
  role: Role
  open: boolean
  onToggle: () => void
  /** the last visible role stops the timeline instead of trailing past it */
  isLast: boolean
}

export default function RoleAccordion({ role, open, onToggle, isLast }: Props) {
  const { pick } = useLang()
  const body = useRef<HTMLUListElement>(null)
  // no open/close transition on the very first paint
  const mounted = useRef(false)

  useEffect(() => {
    const element = body.current
    if (!element) return

    if (!mounted.current) {
      // take over max-height from the CSS fallback, without animating
      mounted.current = true
      element.style.maxHeight = open ? 'none' : '0px'
      return
    }

    const height = element.scrollHeight

    if (open) {
      element.style.maxHeight = `${height}px`
      // release the cap after the transition, so reflowing text is never clipped
      const timer = setTimeout(() => {
        if (body.current) body.current.style.maxHeight = 'none'
      }, 500)
      return () => clearTimeout(timer)
    }

    // start from the measured height and force a reflow — otherwise the browser
    // has no value to animate away from and the close snaps shut
    element.style.maxHeight = `${height}px`
    void element.offsetHeight
    element.style.maxHeight = '0px'
  }, [open])

  return (
    <div className="relative transition-opacity duration-300">
      {/* the 9px dot and the 1px connector share a centre line at -30.5px */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute bottom-[-29.5px] left-[-31px] top-[9.5px] w-px bg-bone/16"
        />
      )}
      <span
        className={`absolute left-[-35px] top-[5px] block h-[9px] w-[9px] rounded-full ${
          role.current ? 'animate-pulseRing bg-amber' : 'bg-bone/30'
        }`}
      />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="grid w-full grid-cols-[1fr_20px] items-baseline gap-3.5 pb-0.5 text-left"
      >
        <span>
          <span className="block font-mono text-[11px] uppercase leading-none tracking-widest text-bone/70">
            {pick(role.date)}
          </span>
          <span className="mt-[5px] block text-base font-semibold leading-[1.4]">
            {pick(role.title)} · {role.company}
          </span>
        </span>
        <span
          aria-hidden
          className={`text-right font-mono text-[17px] leading-none text-amber transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
            open ? 'rotate-45' : 'rotate-0'
          }`}
        >
          +
        </span>
      </button>

      <ul
        ref={body}
        // max-height is written imperatively in the effect above and must never
        // appear in this style object — React would rewrite it on every render,
        // before the effect runs, and the transition would have no start value.
        // Until hydration a CSS rule on this attribute keeps closed bodies shut.
        data-accordion={open ? 'open' : 'closed'}
        style={{ opacity: open ? 1 : 0, marginTop: open ? 8 : 0 }}
        className="flex list-none flex-col gap-1.5 overflow-hidden p-0 text-[13.5px] leading-[1.6] text-bone/75 transition-[max-height,opacity,margin-top] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
      >
        {role.bullets.map((bullet, index) => (
          <li
            key={index}
            style={{
              transitionDelay: open ? `${90 + index * 55}ms` : '0ms',
              transform: open ? 'none' : 'translateY(-8px)',
              opacity: open ? 1 : 0,
            }}
            className="flex gap-[9px] transition-[transform,opacity] duration-450 ease-[cubic-bezier(.2,.8,.2,1)]"
          >
            <span className="text-amber">—</span>
            <span>{pick(bullet)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
