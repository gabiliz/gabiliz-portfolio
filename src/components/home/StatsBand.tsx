'use client'

import { useLang } from '@/i18n/LanguageProvider'

const STATS = [
  { value: '6', label: 'stats.years' },
  { value: '7', label: 'stats.companies' },
  { value: '2', label: 'stats.languages' },
  { value: '∞', label: 'stats.masterchef' },
]

export default function StatsBand() {
  const { t } = useLang()

  return (
    <section className="animate-fadeUp [animation-delay:.2s] mx-5 grid grid-cols-2 gap-px border border-line-subtle bg-line-subtle lg:mx-11 lg:grid-cols-4">
      {STATS.map(({ value, label }, index) => (
        <div
          key={label}
          // the design only keeps the first two stats on mobile
          className={`bg-ink px-5 py-[22px] ${index > 1 ? 'hidden lg:block' : ''}`}
        >
          <div className="font-display text-[30px] font-bold leading-none lg:text-4xl">{value}</div>
          <div className="mt-1.5 font-mono text-[11px] uppercase leading-[1.4] tracking-[.08em] text-bone/70">
            {t(label)}
          </div>
        </div>
      ))}
    </section>
  )
}
