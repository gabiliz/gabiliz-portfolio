'use client'

import Link from 'next/link'

import PersonalPageShell from '@/components/personal/PersonalPageShell'
import { useLang } from '@/i18n/LanguageProvider'
import type { Book, NowEntryKey } from '@/types/personal'
import { formatDate } from '@/utils/date'
import nowData from '@/utils/now.json'
import readingData from '@/utils/reading.json'

const books = readingData.books as Book[]

/** The reading line is derived from reading.json — never duplicated into now.json. */
const current = books.find((book) => book.status === 'reading')

const BEFORE_READING: NowEntryKey[] = ['work', 'learning', 'finished']
const AFTER_READING: NowEntryKey[] = ['life', 'wanting']

function Row({
  label,
  live = false,
  children,
}: {
  label: string
  live?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-2 border-b border-line-subtle py-[18px] lg:grid-cols-[104px_1fr] lg:items-baseline lg:gap-5">
      <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase leading-none tracking-[.14em] text-bone/65">
        {live && (
          <i
            aria-hidden
            className="animate-pulseRing [animation-duration:2.6s] block h-1.5 w-1.5 rounded-full bg-amber"
          />
        )}
        {label}
      </span>
      <span className="text-[15px] leading-[1.65] text-bone/85">{children}</span>
    </div>
  )
}

export default function NowPage() {
  const { t, lang, pick } = useLang()

  return (
    <PersonalPageShell title={t('personal.now.title')} subtitle={t('personal.now.subtitle')}>
      <div className="pt-2">
        {BEFORE_READING.map((key) => (
          <Row key={key} label={t(`personal.now.${key}`)} live={key === 'work'}>
            {pick(nowData.entries[key])}
          </Row>
        ))}

        {current && (
          <Row label={t('personal.now.reading')}>
            <Link
              href="/reading"
              className="tap-area underline decoration-line-strong underline-offset-4 transition-colors hover:text-bone hover:decoration-amber"
            >
              <span className={current.pending ? 'text-bone/60' : undefined}>{current.title}</span>
              {' — '}
              <span className={current.pending ? 'text-bone/60' : undefined}>{current.author}</span>
            </Link>
          </Row>
        )}

        {AFTER_READING.map((key) => (
          <Row key={key} label={t(`personal.now.${key}`)}>
            {pick(nowData.entries[key])}
          </Row>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 font-mono text-[10.5px] uppercase leading-none tracking-widest">
        <span className="flex flex-wrap items-center gap-x-4 gap-y-2 text-bone/65">
          <span>{t('personal.now.updated', { date: formatDate(nowData.updatedAt, lang) })}</span>
          {/* /uses is out of the header while it's all placeholders, so this is its only link in */}
          <Link
            href="/uses"
            className="flex min-h-[44px] items-center transition-colors hover:text-bone lg:min-h-0"
          >
            {t('personal.now.uses')}
          </Link>
        </span>
        <Link
          href="/#contact"
          className="flex min-h-[44px] items-center text-amber transition-opacity hover:opacity-80 lg:min-h-0"
        >
          {t('actions.getInTouch')} →
        </Link>
      </div>
    </PersonalPageShell>
  )
}
