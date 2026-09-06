'use client'

import Image from 'next/image'

import WinkGlyph from '@/components/home/WinkGlyph'
import { useLang } from '@/i18n/LanguageProvider'
import now from '@/utils/now.json'

const RESUMES = {
  en: '/assets/Gabriela-Liz-Moreira-RESUME.pdf',
  pt: '/assets/Gabriela-Liz-Moreira-CV.pdf',
}

export default function Hero() {
  const { lang, t, pick } = useLang()

  const badge = (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink px-3 py-2 font-mono text-[10px] font-medium uppercase leading-none tracking-widest lg:text-[10.5px]">
      <i className="block h-[7px] w-[7px] animate-pulseRing rounded-full bg-amber" />
      {pick(now.availability.badge)}
    </span>
  )

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-60px] top-[-120px] h-[520px] w-[520px] rounded-full blur-[6px] [background:radial-gradient(circle,oklch(.72_.17_85/.30),transparent_66%)]"
      />
      {/* the glow must fade to transparent before the section's bottom edge:
          overflow-hidden clips there, and the stats band below has a different
          background, so any overshoot reads as a hard horizontal seam */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-[-80px] h-[460px] w-[460px] rounded-full [background:radial-gradient(circle,oklch(.62_.13_250/.22),transparent_68%)]"
      />

      <div className="relative grid items-center gap-8 px-5 pb-7 pt-8 lg:grid-cols-[1fr_auto_340px] lg:gap-[26px] lg:px-11 lg:pb-10 lg:pt-[74px]">
        {/* photo + badge sit above the name on mobile, beside it on desktop */}
        <div className="flex items-center gap-3.5 lg:hidden">
          <Image
            src="/profile-picture.jpeg"
            alt={t('hero.photoAlt')}
            width={62}
            height={62}
            className="h-[62px] w-[62px] rounded-full object-cover"
          />
          {badge}
        </div>

        <div>
          <h1 className="animate-fadeUp font-display text-[54px] font-extrabold leading-[.92] tracking-[-.035em] [animation-delay:.05s] lg:text-[104px] lg:tracking-[-.04em]">
            Gabriela
            <br />
            Liz<span className="text-amber">.</span>
          </h1>

          <p className="animate-fadeUp mt-[18px] max-w-[460px] text-[15px] leading-[1.65] text-bone/75 [animation-delay:.25s] lg:mt-7 lg:text-base lg:leading-[1.7]">
            <span className="lg:hidden">{t('hero.bioShort')}</span>
            <span className="hidden lg:inline">{t('hero.bio')}</span>
          </p>

          <div className="animate-fadeUp mt-7 flex flex-wrap gap-3.5 [animation-delay:.4s] lg:mt-[34px]">
            <a
              href="#contact"
              className="inline-flex min-h-[44px] items-center rounded-full bg-amber px-[26px] font-mono text-[13px] font-semibold uppercase leading-none tracking-[.06em] text-ink transition-[background-color,box-shadow] duration-300 hover:bg-[oklch(.83_.15_85)] hover:shadow-[0_0_0_4px_oklch(.78_.16_85/.16)]"
            >
              {t('actions.getInTouch')}
            </a>
            <a
              href={RESUMES[lang]}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-full border border-bone/30 px-[26px] font-mono text-[13px] font-semibold uppercase leading-none tracking-[.06em] transition-colors duration-300 hover:border-bone/60 hover:bg-bone/6"
            >
              {t('actions.resume')}
            </a>
          </div>
        </div>

        {/* hover-only affordance, so it stays out of the mobile stack */}
        <div className="hidden lg:flex lg:justify-center">
          <WinkGlyph />
        </div>

        <div className="relative hidden justify-self-end lg:mr-10 lg:block">
          <div className="pointer-events-none absolute -inset-4 rounded-full border border-bone/[.14]" />
          <Image
            src="/profile-picture.jpeg"
            alt={t('hero.photoAlt')}
            width={300}
            height={300}
            priority
            className="h-[300px] w-[300px] rounded-full object-cover"
          />
          <span className="absolute -right-1.5 bottom-1.5">{badge}</span>
        </div>
      </div>
    </section>
  )
}
