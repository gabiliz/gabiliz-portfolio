'use client'

import type { StackFilter } from '@/hooks/useStackFilter'
import { useLang } from '@/i18n/LanguageProvider'

type Props = {
  filters: StackFilter[]
  active: string
  onChange: (key: string) => void
  label?: string
}

export default function FilterChips({ filters, active, onChange, label }: Props) {
  const { t } = useLang()

  return (
    // biome-ignore lint/a11y/useSemanticElements: <fieldset> is for grouping form controls, and its min-content sizing would fight the horizontal scroll container these chips live in
    <div
      role="group"
      aria-label={label}
      className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
    >
      {filters.map((filter) => {
        const isActive = filter.key === active
        // every other chip is a technology name, which reads the same in both
        // languages — "all" is the only label that has to be translated
        const text = filter.key === 'all' ? t('filter.all') : filter.label
        return (
          <button
            key={filter.key}
            type="button"
            onClick={() => onChange(filter.key)}
            aria-pressed={isActive}
            className={`inline-flex min-h-[44px] flex-none items-center whitespace-nowrap rounded-full border px-3.5 py-[9px] font-mono text-[11.5px] font-medium uppercase leading-none tracking-[.06em] transition-colors lg:min-h-0 ${
              isActive
                ? 'border-amber bg-amber text-ink'
                : 'border-line-strong bg-transparent text-bone/80 hover:border-bone/40 hover:text-bone'
            }`}
          >
            {text}
          </button>
        )
      })}
    </div>
  )
}
