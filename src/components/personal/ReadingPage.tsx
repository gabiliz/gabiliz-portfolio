'use client'

import PersonalPageShell from '@/components/personal/PersonalPageShell'
import { useLang } from '@/i18n/LanguageProvider'
import type { Book } from '@/types/personal'
import { formatDate } from '@/utils/date'
import readingData from '@/utils/reading.json'

const books = readingData.books as Book[]

const current = books.find((book) => book.status === 'reading')

/** reading first, then most recently finished; anything undated sinks to the bottom */
const shelf = [...books].sort((a, b) => {
  if (a.status === 'reading') return -1
  if (b.status === 'reading') return 1
  return (b.finishedAt ?? '').localeCompare(a.finishedAt ?? '')
})

function StatusPill({ status }: { status: Book['status'] }) {
  const { t } = useLang()
  const reading = status === 'reading'

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase leading-none tracking-[.12em] ${
        reading ? 'border-amber/50 text-amber' : 'border-line-strong text-bone/75'
      }`}
    >
      {t(`personal.reading.status.${status}`)}
    </span>
  )
}

function Rating({ value }: { value: number }) {
  const { t } = useLang()

  return (
    // role="img" is what makes the label reachable: a bare span is generic, and
    // screen readers ignore an aria-label on it
    <span
      role="img"
      className="flex items-center gap-1.5"
      aria-label={t('personal.reading.rating', { value })}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <i
          key={index}
          aria-hidden
          className={`block h-1.5 w-1.5 rounded-full ${index < value ? 'bg-amber' : 'bg-bone/22'}`}
        />
      ))}
    </span>
  )
}

function CurrentCard({ book }: { book: Book }) {
  const { t, lang } = useLang()
  const { page, pages } = book
  const hasProgress = page !== null && pages !== null && pages > 0
  const ratio = hasProgress ? Math.min(page / pages, 1) : 0
  const percent = Math.round(ratio * 100)

  return (
    <div className="mb-[26px] rounded-card border border-line bg-surface-2 p-[22px]">
      <span className="font-mono text-[10px] uppercase leading-none tracking-[.14em] text-amber">
        {t('personal.reading.current')}
      </span>

      <h2
        className={`mt-3.5 font-display text-2xl font-bold leading-tight tracking-[-.02em] ${
          book.pending ? 'text-bone/60' : ''
        }`}
      >
        {book.title}
      </h2>
      <p className={`mt-1 text-[13px] ${book.pending ? 'text-bone/60' : 'text-bone/62'}`}>
        {book.author}
      </p>

      {hasProgress && (
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t('personal.reading.current')}
          className="mt-[18px] h-1 overflow-hidden rounded-full bg-bone/12"
        >
          {/* scaleX, not width: the bar can't reflow the card while it animates */}
          <span
            className="animate-barFill block h-full origin-left rounded-full bg-amber"
            style={{ transform: `scaleX(${ratio})` }}
          />
        </div>
      )}

      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10.5px] uppercase leading-none tracking-widest text-bone/65">
        {hasProgress && <span>{t('personal.reading.progress', { percent, page })}</span>}
        {book.startedAt && (
          <span>
            {t('personal.reading.since', {
              date: formatDate(book.startedAt, lang, { month: 'short', day: 'numeric' }),
            })}
          </span>
        )}
      </div>
    </div>
  )
}

export default function ReadingPage() {
  const { t, pick } = useLang()

  return (
    <PersonalPageShell
      title={t('personal.reading.title')}
      subtitle={t('personal.reading.subtitle')}
    >
      {current && <CurrentCard book={current} />}

      <div className="hidden grid-cols-[26px_1fr_118px_74px] gap-4 border-b border-line pb-2.5 font-mono text-[9.5px] uppercase leading-none tracking-[.14em] text-bone/60 lg:grid">
        <span aria-hidden />
        <span>{t('personal.reading.colBook')}</span>
        <span>{t('personal.reading.colStatus')}</span>
        <span>{t('personal.reading.colRating')}</span>
      </div>

      <ul className="m-0 list-none p-0">
        {shelf.map((book, index) => (
          <li
            key={book.id}
            className="grid gap-x-4 gap-y-3 border-b border-line-subtle py-[18px] lg:grid-cols-[26px_1fr_118px_74px] lg:items-start"
          >
            <span className="font-mono text-[11px] leading-none text-bone/60">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div>
              <p className={`text-base font-semibold ${book.pending ? 'text-bone/60' : ''}`}>
                {book.title}
              </p>
              <p
                className={`mt-0.5 text-[12.5px] ${book.pending ? 'text-bone/60' : 'text-bone/62'}`}
              >
                {book.author}
              </p>
              {pick(book.note) && (
                <p className="mt-2 text-[13.5px] leading-[1.55] text-bone/74">{pick(book.note)}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:contents">
              <StatusPill status={book.status} />
              {book.rating !== null && <Rating value={book.rating} />}
            </div>
          </li>
        ))}
      </ul>
    </PersonalPageShell>
  )
}
