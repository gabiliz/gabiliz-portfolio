'use client'

import Link from 'next/link'
import { useState } from 'react'

import FilterChips from '@/components/FilterChips'
import RoleAccordion, { type Role } from '@/components/home/RoleAccordion'
import { useStackFilter } from '@/hooks/useStackFilter'
import { useLang } from '@/i18n/LanguageProvider'
import credentials from '@/utils/credentials.json'
import education from '@/utils/education.json'
import experiences from '@/utils/experiences.json'
import now from '@/utils/now.json'

const roles = experiences.roles as Role[]
const currentRole = roles.find((role) => role.current) ?? roles[0]

export default function PathSection() {
  const { t, pick } = useLang()
  const { active, setActive, filtered, total } = useStackFilter(roles)
  // several roles can stay open at once; the current one starts expanded
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set([currentRole.id]))

  const toggleRole = (id: string) =>
    setOpenIds((previous) => {
      const next = new Set(previous)
      if (!next.delete(id)) next.add(id)
      return next
    })

  return (
    <section
      id="path"
      className="grid gap-10 px-5 py-7 lg:grid-cols-[1.3fr_1fr] lg:gap-[50px] lg:px-11 lg:pb-[54px] lg:pt-[46px]"
    >
      {/* min-w-0: a grid item's automatic minimum size is its min-content, and the
          nowrap filter chips would otherwise stretch the track past the viewport
          instead of scrolling inside their own container */}
      <div className="min-w-0">
        <div className="mb-[18px] flex items-baseline justify-between gap-5">
          <h2 className="font-display text-[28px] font-bold leading-none tracking-[-.02em] lg:text-[38px]">
            {t('sections.path')}
          </h2>
          <span className="font-mono text-[11px] uppercase leading-none tracking-widest text-bone/70">
            {t('filter.roleCount', { count: filtered.length, total })}
          </span>
        </div>

        <div className="mb-3 font-mono text-[10.5px] uppercase leading-none tracking-[.12em] text-bone/70">
          {t('filter.label')}
        </div>

        <div className="mb-7">
          <FilterChips
            filters={experiences.filters}
            active={active}
            onChange={setActive}
            label={t('filter.label')}
          />
        </div>

        <div className="mb-3.5 font-mono text-[10.5px] uppercase leading-none tracking-widest text-bone/60">
          {t('filter.clickToExpand')}
        </div>

        {/* no border on the track: each role draws its own segment down to the
            next dot, so the line never runs past the first or last one */}
        <div className="flex flex-col gap-5 pl-[31px]">
          {filtered.map((role, index) => (
            <RoleAccordion
              key={role.id}
              role={role}
              open={openIds.has(role.id)}
              onToggle={() => toggleRole(role.id)}
              isLast={index === filtered.length - 1}
            />
          ))}
        </div>
      </div>

      <div className="min-w-0">
        <div className="mb-[22px] flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="font-display text-[28px] font-bold leading-none tracking-[-.02em] lg:text-[38px]">
            {t('sections.now')}
          </h2>
          <Link
            href="/now"
            className="flex min-h-[44px] items-center font-mono text-[10.5px] uppercase leading-none tracking-[.12em] text-amber transition-opacity hover:opacity-80 lg:min-h-0"
          >
            /now →
          </Link>
        </div>
        <div className="flex flex-col gap-3.5 text-[14.5px] leading-[1.65] text-bone/75">
          {now.items.map((item, index) => (
            <div key={index} className="rounded-xl border border-line p-4">
              {pick(item)}
            </div>
          ))}
        </div>

        <div className="mb-3.5 mt-9 flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-mono text-[10.5px] uppercase leading-none tracking-[.12em] text-bone/70">
            {t('sections.education')}
          </h3>
          <Link
            href="/credentials"
            className="flex min-h-[44px] items-center font-mono text-[10.5px] uppercase leading-none tracking-[.12em] text-amber transition-opacity hover:opacity-80 lg:min-h-0"
          >
            {t('credentials.all', { count: credentials.items.length })}
          </Link>
        </div>
        <ul className="flex list-none flex-col gap-2 p-0 text-[13.5px] leading-[1.6] text-bone/75">
          {education.items.map((item, index) => (
            <li key={index} className="flex gap-2.5">
              <span className="text-amber">—</span>
              <span>{pick(item)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
