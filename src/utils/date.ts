import type { Lang } from '@/i18n/types'

const LOCALES: Record<Lang, string> = { en: 'en-US', pt: 'pt-BR' }

/**
 * Formats a plain ISO date (`2026-09-05`) for display.
 *
 * `timeZone: 'UTC'` matters: a bare ISO date parses as midnight UTC, which in
 * GMT-3 would otherwise render as the day before.
 */
export function formatDate(
  iso: string,
  lang: Lang,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'long' },
) {
  return new Intl.DateTimeFormat(LOCALES[lang], { timeZone: 'UTC', ...options }).format(
    new Date(iso),
  )
}
