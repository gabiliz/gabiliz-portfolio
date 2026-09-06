'use client'

import { EMAIL, useCopyEmail } from '@/hooks/useCopyEmail'
import { useLang } from '@/i18n/LanguageProvider'
import now from '@/utils/now.json'

const PROFILES = [
  {
    key: 'linkedin',
    handle: 'gabriela-liz-moreira',
    href: 'https://www.linkedin.com/in/gabriela-liz-moreira/',
  },
  { key: 'github', handle: 'gabiliz', href: 'https://github.com/gabiliz' },
]

export default function ContactSection() {
  const { t, pick } = useLang()
  const { copied, copy } = useCopyEmail()

  return (
    <section
      id="contact"
      className="relative border-t border-line-subtle px-5 py-7 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12 lg:px-11 lg:pb-[46px] lg:pt-[52px]"
    >
      <div>
        <h2 className="mb-3.5 font-display text-[34px] font-extrabold leading-none tracking-[-.03em] lg:text-[52px]">
          {t('sections.contact')}
        </h2>
        <p className="mb-[22px] max-w-[400px] text-[15px] leading-[1.7] text-bone/80 lg:text-base">
          {pick(now.availability.statement)}
        </p>
        <div className="flex flex-col gap-2.5 font-mono text-[12.5px] leading-normal text-bone/75">
          {now.availability.facts.map((fact, index) => (
            <div key={index} className="flex gap-2.5">
              <span className="text-amber">·</span>
              <span>{pick(fact)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 lg:mt-0">
        {/* same grey frame as the profile cards below. Two actions, so the card
            itself can't be the button: an anchor nested inside a button is invalid,
            and each action needs its own hit area. No card-level hover either —
            unlike the others, this card isn't a single link. */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 rounded-card border border-bone/18 px-[22px] py-5">
          <span>
            <span className="mb-[7px] block font-mono text-[10.5px] uppercase leading-none tracking-[.12em] text-bone/70">
              {t('contact.email')}
            </span>
            <b className="text-[15px] font-semibold leading-[1.2] lg:text-[17px]">{EMAIL}</b>
          </span>

          <span className="flex items-center gap-4 font-mono text-[11px] font-medium uppercase leading-none tracking-[.08em] text-amber">
            <button
              type="button"
              onClick={copy}
              // `uppercase` has to sit on the button: form controls don't inherit
              // text-transform, and preflight only forwards `font`
              className="flex min-h-[44px] items-center whitespace-nowrap uppercase transition-opacity hover:opacity-80 lg:min-h-0"
            >
              {/* the label swaps in place, so announce the change */}
              <span aria-live="polite">{copied ? t('actions.copied') : t('actions.copy')}</span>
            </button>

            <span aria-hidden className="h-3 w-px bg-amber/40" />

            <a
              href={`mailto:${EMAIL}`}
              className="flex min-h-[44px] items-center whitespace-nowrap transition-opacity hover:opacity-80 lg:min-h-0"
            >
              {t('actions.send')} ↗
            </a>
          </span>
        </div>

        {PROFILES.map(({ key, handle, href }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-4 rounded-card border border-bone/18 px-[22px] py-5 transition-colors duration-300 hover:border-bone/40 hover:bg-bone/4"
          >
            <span>
              <span className="mb-[7px] block font-mono text-[10.5px] uppercase leading-none tracking-[.12em] text-bone/70">
                {t(`contact.${key}`)}
              </span>
              <b className="text-[15px] font-semibold leading-[1.2] lg:text-[17px]">{handle}</b>
            </span>
            <span className="text-lg text-amber">↗</span>
          </a>
        ))}

        <div className="flex gap-3">
          <a
            href="/assets/Gabriela-Liz-Moreira-CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-amber px-[18px] text-center font-mono text-[12.5px] font-semibold uppercase leading-none tracking-[.06em] text-ink transition-[background-color,box-shadow] duration-300 hover:bg-[oklch(.83_.15_85)] hover:shadow-[0_0_0_4px_oklch(.78_.16_85/.16)]"
          >
            {t('actions.resumePt')}
          </a>
          <a
            href="/assets/Gabriela-Liz-Moreira-RESUME.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-bone/30 px-[18px] text-center font-mono text-[12.5px] font-semibold uppercase leading-none tracking-[.06em] transition-colors duration-300 hover:border-bone/60 hover:bg-bone/6"
          >
            {t('actions.resumeEn')}
          </a>
        </div>
      </div>
    </section>
  )
}
