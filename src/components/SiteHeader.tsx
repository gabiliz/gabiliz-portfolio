'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import LangToggle from '@/components/LangToggle'
import { useLang } from '@/i18n/LanguageProvider'
import { USES_READY } from '@/utils/uses'

type NavItem = { key: string; type: 'anchor' | 'route' }

/**
 * Professional first, personal after the divider, contact on its own at the end.
 *
 * `work` stays an anchor to the home section, with `projects` next to it for the
 * full list — the section only shows the featured ones, so without this link the
 * list has no way in from the header.
 *
 * `/uses` joins the personal group on its own, the moment `uses.json` has no
 * placeholder left; until then a header link would lead to a page of brackets.
 */
const NAV_GROUPS: NavItem[][] = [
  [
    { key: 'work', type: 'anchor' },
    { key: 'projects', type: 'route' },
    { key: 'path', type: 'anchor' },
    { key: 'credentials', type: 'route' },
  ],
  [
    { key: 'now', type: 'route' },
    { key: 'reading', type: 'route' },
    { key: 'off', type: 'route' },
    ...(USES_READY ? [{ key: 'uses', type: 'route' } as NavItem] : []),
  ],
  [{ key: 'contact', type: 'anchor' }],
]

export default function SiteHeader() {
  const pathname = usePathname()
  const { t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const menu = useRef<HTMLElement>(null)
  // no open/close transition on the very first paint
  const mounted = useRef(false)

  useEffect(() => {
    const element = menu.current
    if (!element) return

    if (!mounted.current) {
      mounted.current = true
      element.style.maxHeight = menuOpen ? 'none' : '0px'
      return
    }

    const height = element.scrollHeight

    if (menuOpen) {
      element.style.maxHeight = `${height}px`
      // release the cap once open, so a language switch can reflow the list
      const timer = setTimeout(() => {
        if (menu.current) menu.current.style.maxHeight = 'none'
      }, 400)
      return () => clearTimeout(timer)
    }

    // measure, force a reflow, then collapse — without a start value the close snaps
    element.style.maxHeight = `${height}px`
    void element.offsetHeight
    element.style.maxHeight = '0px'
  }, [menuOpen])

  // anchors live on the home page, so prefix them when we're anywhere else
  const anchorHref = (section: string) => (pathname === '/' ? `#${section}` : `/#${section}`)

  const renderItem = (item: NavItem, onNavigate?: () => void, className = '') => {
    // a case study keeps `projects` lit, so the nav never goes blank mid-section
    const active =
      item.type === 'route' && (pathname === `/${item.key}` || pathname.startsWith(`/${item.key}/`))
    const classes = `transition-colors ${active ? 'text-amber' : 'hover:text-bone'} ${className}`

    if (item.type === 'route') {
      return (
        <Link
          key={item.key}
          href={`/${item.key}`}
          onClick={onNavigate}
          aria-current={active ? 'page' : undefined}
          className={classes}
        >
          {t(`nav.${item.key}`)}
        </Link>
      )
    }

    return (
      <a key={item.key} href={anchorHref(item.key)} onClick={onNavigate} className={classes}>
        {t(`nav.${item.key}`)}
      </a>
    )
  }

  return (
    <header className="relative z-20 border-b border-line-subtle font-mono text-[11px] font-medium uppercase leading-none tracking-widest lg:text-[11.5px]">
      <div className="flex items-center justify-between px-5 py-3 lg:px-11 lg:py-[22px]">
        {pathname === '/' ? (
          <span>
            GL<span className="hidden lg:inline"> — {t('header.role')}</span>
          </span>
        ) : (
          <Link href="/" className="flex min-h-[44px] items-center lg:min-h-0">
            ← {t('nav.home')}
          </Link>
        )}

        <div className="flex items-center gap-3.5 lg:gap-[26px]">
          <nav className="hidden items-center gap-4 text-bone/72 lg:flex">
            {NAV_GROUPS.map((group, index) => (
              <span key={group[0].key} className="flex items-center gap-4">
                {index > 0 && <span aria-hidden className="h-3 w-px bg-line-strong" />}
                {group.map((item) => renderItem(item))}
              </span>
            ))}
          </nav>

          <LangToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={t('nav.menu')}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1 lg:hidden"
          >
            <i
              className={`block h-[1.5px] w-5 bg-bone transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
                menuOpen ? 'translate-y-[2.75px] rotate-45' : ''
              }`}
            />
            <i
              className={`block h-[1.5px] w-5 bg-bone transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
                menuOpen ? '-translate-y-[2.75px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* stays mounted so it can animate shut; `inert` keeps it out of the tab
          order and away from screen readers while collapsed. max-height is
          written imperatively in the effect above and must never appear in this
          style object — React would rewrite it before the effect runs. */}
      <nav
        ref={menu}
        inert={!menuOpen}
        style={{ opacity: menuOpen ? 1 : 0 }}
        className="flex flex-col overflow-hidden bg-surface-2 text-bone/72 transition-[max-height,opacity] duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)] lg:hidden"
      >
        {/* the rule lives inside the clipped box: on the <nav> it would still
            paint as a stray line under the header while collapsed */}
        <div className="border-t border-line-subtle px-5">
          {NAV_GROUPS.map((group, groupIndex) => (
            // the same split as desktop: a rule where the vertical divider sits
            <div
              key={group[0].key}
              className={`flex flex-col ${groupIndex > 0 ? 'border-t border-line-subtle' : ''}`}
            >
              {group.map((item) => {
                const order = NAV_GROUPS.slice(0, groupIndex).flat().length + group.indexOf(item)
                return (
                  <span
                    key={item.key}
                    style={{
                      transitionDelay: menuOpen ? `${60 + order * 35}ms` : '0ms',
                      transform: menuOpen ? 'none' : 'translateY(-6px)',
                      opacity: menuOpen ? 1 : 0,
                    }}
                    className="flex flex-col border-b border-line-subtle transition-[transform,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] last:border-b-0"
                  >
                    {renderItem(item, () => setMenuOpen(false), 'flex min-h-[44px] items-center')}
                  </span>
                )
              })}
            </div>
          ))}
        </div>
      </nav>
    </header>
  )
}
