'use client'

import PersonalPageShell from '@/components/personal/PersonalPageShell'
import { useLang } from '@/i18n/LanguageProvider'
import type { UsesGroup } from '@/types/personal'
import usesData from '@/utils/uses.json'

const groups = usesData.groups as UsesGroup[]

export default function UsesPage() {
  const { t, pick } = useLang()

  return (
    <PersonalPageShell title={t('personal.uses.title')} subtitle={t('personal.uses.subtitle')}>
      <div className="grid gap-x-[34px] gap-y-9 lg:grid-cols-2">
        {groups.map((group) => (
          <section key={group.id}>
            <h2 className="font-mono text-[10px] uppercase leading-none tracking-[.14em] text-amber">
              {pick(group.label)}
            </h2>

            <dl className="m-0 mt-2">
              {group.items.map((item) => (
                <div
                  key={item.key}
                  className="grid gap-x-[18px] gap-y-1 border-b border-bone/8 py-[13px] lg:grid-cols-[96px_1fr]"
                >
                  <dt className="font-mono text-[10px] uppercase leading-none tracking-[.14em] text-bone/60 lg:pt-1">
                    {pick(item.label)}
                  </dt>
                  {/* placeholders stay in brackets, dimmed — nothing invented here */}
                  <dd
                    className={`m-0 text-sm leading-normal ${
                      item.pending ? 'text-bone/60' : 'text-bone/85'
                    }`}
                  >
                    {pick(item.value)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </PersonalPageShell>
  )
}
