'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import i18n, { DEFAULT_LANG, LANG_STORAGE_KEY, LANGS, resolveLang } from './config'
import type { Lang, Localized } from './types'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  /** UI strings, from the dictionaries in `config.ts` */
  t: (key: string, options?: Record<string, unknown>) => string
  /** content strings, from the `{ en, pt }` fields in `src/utils/*.json` */
  pick: (field: Localized) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function isLang(value: string | null): value is Lang {
  return value !== null && (LANGS as string[]).includes(value)
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG)

  // read after mount so the server-rendered markup always matches the default
  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY)

    // an explicit choice always wins — including one that happens to equal the
    // default, which is how someone browsing in pt-BR pins the site to English
    if (isLang(stored)) {
      setLangState(stored)
      return
    }

    // nothing stored: follow the browser/system preference
    const preferred = navigator.languages?.length ? navigator.languages : [navigator.language]
    setLangState(resolveLang(preferred))
  }, [])

  useEffect(() => {
    i18n.changeLanguage(lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    window.localStorage.setItem(LANG_STORAGE_KEY, next)
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang,
      t: (key: string, options?: Record<string, unknown>) =>
        i18n.getFixedT(lang)(key, options) as string,
      pick: (field: Localized) => field[lang],
    }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLang must be used inside a LanguageProvider')
  }
  return context
}
