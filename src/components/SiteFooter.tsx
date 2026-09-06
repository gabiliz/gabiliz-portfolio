'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { EMAIL } from '@/hooks/useCopyEmail'
import { useLang } from '@/i18n/LanguageProvider'
import credentials from '@/utils/credentials.json'

const LINKS = [
  { key: 'github', href: 'https://github.com/gabiliz' },
  { key: 'linkedin', href: 'https://www.linkedin.com/in/gabriela-liz-moreira/' },
  { key: 'email', href: `mailto:${EMAIL}` },
]

export default function SiteFooter() {
  const { t } = useLang()
  const pathname = usePathname()

  return (
    <footer className="flex flex-col gap-4 border-t border-line-subtle px-5 py-6 font-mono text-[11px] uppercase leading-none tracking-widest text-bone/70 sm:flex-row sm:items-center sm:justify-between lg:px-11 lg:py-[26px] lg:text-[11.5px]">
      <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {t('footer.copyright')}
        {/* /credentials is out of the header, so the home and this are its two ways
            in — but not while the reader is already on the page */}
        {pathname !== '/credentials' && (
          <Link
            href="/credentials"
            className="flex min-h-[44px] items-center transition-colors hover:text-bone lg:min-h-0"
          >
            {t('credentials.all', { count: credentials.items.length })}
          </Link>
        )}
      </span>
      <span className="flex gap-5 lg:gap-[22px]">
        {LINKS.map(({ key, href }) => (
          <a
            key={key}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
            className="flex min-h-[44px] items-center transition-colors hover:text-bone lg:min-h-0"
          >
            {t(`footer.${key}`)}
          </a>
        ))}
      </span>
    </footer>
  )
}
