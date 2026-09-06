'use client'

import { useLang } from '@/i18n/LanguageProvider'
import type { Lang } from '@/i18n/types'

export default function LangToggle() {
  const { lang, setLang } = useLang()

  return (
    <span className="inline-flex items-center gap-1.5">
      {(['en', 'pt'] as Lang[]).map((option, index) => (
        <span key={option} className="inline-flex items-center gap-1.5">
          {index > 0 && <span className="text-bone/60">/</span>}
          <button
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={lang === option}
            className={`flex min-h-[44px] items-center px-1 uppercase tracking-widest transition-colors lg:min-h-0 ${
              lang === option ? 'text-amber' : 'text-bone/60 hover:text-bone'
            }`}
          >
            {option}
          </button>
        </span>
      ))}
    </span>
  )
}
