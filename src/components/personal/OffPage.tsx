'use client'

import OffArt from '@/components/personal/OffArt'
import PersonalPageShell from '@/components/personal/PersonalPageShell'
import { useLang } from '@/i18n/LanguageProvider'
import type { OffCard } from '@/types/personal'
import offData from '@/utils/off.json'

const cards = offData.cards as OffCard[]

export default function OffPage() {
  const { t, pick } = useLang()

  return (
    <PersonalPageShell title={t('personal.off.title')} subtitle={t('personal.off.subtitle')}>
      <div className="grid gap-4 lg:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col gap-3 rounded-panel border border-line bg-surface p-[22px]"
          >
            <OffArt kind={card.art} />

            <span className="font-mono text-[10px] uppercase leading-none tracking-[.14em] text-amber">
              {pick(card.cadence)}
            </span>
            <h2
              className={`font-display text-[19px] font-bold leading-tight tracking-[-.01em] ${
                card.pending ? 'text-bone/60' : ''
              }`}
            >
              {pick(card.title)}
            </h2>
            <p className="text-[13.5px] leading-[1.6] text-bone/74">{pick(card.text)}</p>
          </div>
        ))}
      </div>
    </PersonalPageShell>
  )
}
