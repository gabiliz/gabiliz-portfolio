'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo } from 'react'

import CredentialRow from '@/components/CredentialRow'
import FilterChips from '@/components/FilterChips'
import PersonalPageShell from '@/components/personal/PersonalPageShell'
import { useStackFilter } from '@/hooks/useStackFilter'
import { useLang } from '@/i18n/LanguageProvider'
import type { Credential } from '@/types/personal'
import credentialsData from '@/utils/credentials.json'

const credentials = credentialsData.items as Credential[]

/** year desc; inside a year, what's in progress first, then by title */
function sortWithin(items: Credential[], pick: (field: { en: string; pt: string }) => string) {
  return [...items].sort((a, b) => {
    if (a.status !== b.status) {
      if (a.status === 'progress') return -1
      if (b.status === 'progress') return 1
    }
    return pick(a.title).localeCompare(pick(b.title))
  })
}

export default function CredentialsPage() {
  const { t, pick } = useLang()
  const router = useRouter()
  const searchParams = useSearchParams()

  // the active area lives in the URL: ?area=back is the link she sends a recruiter
  const area = searchParams.get('area') ?? 'all'

  const setArea = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (key === 'all') params.delete('area')
      else params.set('area', key)

      const query = params.toString()
      router.replace(query ? `/credentials?${query}` : '/credentials', { scroll: false })
    },
    [router, searchParams],
  )

  const { active, setActive, filtered, total } = useStackFilter(credentials, {
    keys: (credential) => credential.areas,
    active: area,
    onActiveChange: setArea,
  })

  // groups are built from the *filtered* list, so a year that lost all its items
  // never renders a header
  const groups = useMemo(() => {
    const byLabel: Record<string, { label: string; year: number; items: Credential[] }> = {}
    const labels: string[] = []

    for (const credential of filtered) {
      // a band like "2020 — 2022" groups its years together; everything else groups by its own
      const label = credential.yearLabel ?? String(credential.year)
      if (byLabel[label]) {
        byLabel[label].items.push(credential)
        byLabel[label].year = Math.max(byLabel[label].year, credential.year)
      } else {
        byLabel[label] = { label, year: credential.year, items: [credential] }
        labels.push(label)
      }
    }

    return labels
      .map((label) => byLabel[label])
      .sort((a, b) => b.year - a.year)
      .map((group) => ({ label: group.label, items: sortWithin(group.items, pick) }))
  }, [filtered, pick])

  const filters = credentialsData.filters.map((filter) => ({
    key: filter.key,
    label: pick(filter.label),
  }))

  return (
    <PersonalPageShell title={t('credentials.title')} subtitle={t('credentials.subtitle')}>
      <div className="mb-[22px] flex flex-wrap items-center justify-between gap-4">
        <FilterChips
          filters={filters}
          active={active}
          onChange={setActive}
          label={t('credentials.filterLabel')}
        />
        {/* the noun agrees with the total, which is why `count` is the total here */}
        <span className="font-mono text-[11px] uppercase leading-none tracking-widest text-bone/62">
          {t('credentials.count', { shown: filtered.length, count: total })}
        </span>
      </div>

      {groups.map((group, index) => (
        <section key={group.label}>
          <h2
            className={`border-b border-bone/16 pb-2.5 font-mono text-[9.5px] uppercase leading-none tracking-[.16em] text-amber ${
              index === 0 ? '' : 'pt-[22px]'
            }`}
          >
            {group.label}
          </h2>
          <ul className="m-0 list-none p-0">
            {group.items.map((credential) => (
              <CredentialRow key={credential.id} credential={credential} />
            ))}
          </ul>
        </section>
      ))}
    </PersonalPageShell>
  )
}
