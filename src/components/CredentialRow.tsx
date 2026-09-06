'use client'

import { useLang } from '@/i18n/LanguageProvider'
import type { Credential } from '@/types/personal'

/**
 * One credential. Five columns on desktop (44px 1fr 130px 92px 74px); below
 * 1024px the last three drop to a second line, indented 60px so they sit under
 * the title. `lg:contents` is what lets the same markup do both.
 */
export default function CredentialRow({ credential }: { credential: Credential }) {
  const { t, pick } = useLang()
  const inProgress = credential.status === 'progress'

  return (
    <li className="grid grid-cols-[44px_1fr] items-center gap-4 border-b border-line-subtle py-[15px] transition-opacity lg:grid-cols-[44px_1fr_130px_92px_74px]">
      <span
        aria-hidden
        className={`flex h-11 w-11 items-center justify-center rounded-[11px] border font-mono text-[12.5px] font-medium ${
          inProgress ? 'border-amber/45 text-amber' : 'border-bone/18 text-bone/80'
        }`}
      >
        {credential.issuerMark}
      </span>

      {/* min-w-0 so a long title truncates instead of blowing the column out */}
      <div className="min-w-0">
        <p
          className={`text-[15px] font-semibold leading-[1.35] ${
            credential.pending ? 'text-bone/60' : ''
          }`}
        >
          {pick(credential.title)}
        </p>
        <p
          className={`mt-0.5 text-[12.5px] ${credential.pending ? 'text-bone/60' : 'text-bone/65'}`}
        >
          {credential.issuer}
        </p>
      </div>

      <div className="col-span-2 flex items-center justify-between gap-3 pl-[60px] lg:contents">
        <span
          className={`inline-flex w-fit items-center justify-self-start rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase leading-none tracking-[.12em] ${
            inProgress ? 'border-amber/50 text-amber' : 'border-line-strong text-bone/75'
          }`}
        >
          {t(`credentials.status.${credential.status}`)}
        </span>

        <span className="font-mono text-[11px] uppercase leading-[1.4] tracking-[.06em]">
          <span className="text-bone/68">{credential.yearLabel ?? credential.year}</span>
          <br />
          <span className={credential.pending ? 'text-bone/60' : 'text-bone/60'}>
            {credential.hours ? pick(credential.hours) : '—'}
          </span>
        </span>

        {credential.verifyUrl ? (
          // the word wrapped inside the 74px column and pushed the arrow onto a
          // second line, so the arrow carries the link on its own — the label
          // keeps the accessible name and gives pointer users a tooltip
          <a
            href={credential.verifyUrl}
            target="_blank"
            rel="noopener"
            aria-label={t('credentials.verify')}
            title={t('credentials.verify')}
            className="inline-flex min-h-[44px] items-center justify-self-end font-mono text-[15px] leading-none text-amber transition-opacity hover:opacity-80 lg:min-h-0"
          >
            ↗
          </a>
        ) : (
          <span className="inline-flex min-h-[44px] items-center justify-self-end font-mono text-[10px] text-bone/40 lg:min-h-0">
            —
          </span>
        )}
      </div>
    </li>
  )
}
