'use client'

import Image from 'next/image'
import Link from 'next/link'

import Grain from '@/components/Grain'
import { EMAIL } from '@/hooks/useCopyEmail'
import { useTilt } from '@/hooks/useTilt'
import { useLang } from '@/i18n/LanguageProvider'
import type { Localized } from '@/i18n/types'

type FlowStep = { label: string | Localized; highlight?: boolean; dashed?: boolean }
type Metric = { value: string | null; placeholder: string; label: Localized }

type CaseStudyData = {
  meta: { context: Localized; role: Localized; timeline: Localized }
  thesis: Localized
  problem: Localized[]
  constraints: Localized[]
  decisions: { title: Localized; body: Localized }[]
  redirectFlow: FlowStep[]
  outcome: Metric[]
  retrospective: Localized[]
}

type Project = {
  id: string
  name: string
  image: string
  link: string
  deploy?: string | null
  technologies: string[]
  caseStudy?: unknown
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 font-mono text-[11px] uppercase leading-none tracking-[.12em] text-amber lg:mb-[22px]">
    {children}
  </div>
)

export default function CaseStudy({
  project,
  position,
  totalProjects,
}: {
  project: Project
  position: number
  totalProjects: number
}) {
  const { t, pick } = useLang()
  const { tiltProps, tiltClassName } = useTilt()

  const data = project.caseStudy as CaseStudyData
  // some flow steps are plain strings (a literal URL), others are translated
  const flowLabel = (label: FlowStep['label']) => (typeof label === 'string' ? label : pick(label))

  return (
    <main className="relative">
      <Grain />

      <div className="relative flex items-center justify-center border-b border-line-subtle px-5 py-3 font-mono text-[11px] uppercase leading-none tracking-widest text-bone/70 lg:text-[11.5px]">
        {t('caseStudy.label')} — {String(position).padStart(2, '0')} /{' '}
        {String(totalProjects).padStart(2, '0')}
      </div>

      <section className="relative overflow-hidden px-5 pb-8 pt-10 lg:px-11 lg:pb-10 lg:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-140px] left-[40%] h-[420px] w-[520px] rounded-full [background:radial-gradient(circle,oklch(.72_.17_85/.22),transparent_66%)]"
        />

        <div className="relative mb-5 font-mono text-[11.5px] uppercase leading-none tracking-[.12em] text-amber">
          {pick(data.meta.context)}
        </div>

        <div className="relative">
          <h1 className="animate-fadeUp [animation-delay:.05s] font-display text-[48px] font-extrabold leading-[.94] tracking-[-.04em] lg:text-[92px]">
            {project.name}
          </h1>
        </div>

        <p className="animate-fadeUp [animation-delay:.2s] relative mt-[22px] max-w-[620px] text-base leading-[1.6] text-bone/80 lg:text-[19px]">
          {pick(data.thesis)}
        </p>

        <div className="relative mt-10 grid grid-cols-1 gap-px border border-line-subtle bg-line-subtle sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: t('caseStudy.role'), value: pick(data.meta.role) },
            { label: t('caseStudy.timeline'), value: pick(data.meta.timeline) },
            { label: t('caseStudy.stack'), value: project.technologies.join(' · ') },
          ].map((cell) => (
            <div key={cell.label} className="bg-ink px-5 py-[18px]">
              <div className="mb-[7px] font-mono text-[10.5px] uppercase leading-none tracking-widest text-bone/70">
                {cell.label}
              </div>
              <div className="text-[14.5px] leading-normal">{cell.value}</div>
            </div>
          ))}
          <div className="bg-ink px-5 py-[18px]">
            <div className="mb-[7px] font-mono text-[10.5px] uppercase leading-none tracking-widest text-bone/70">
              {t('caseStudy.links')}
            </div>
            <div className="flex flex-col text-[14.5px] leading-[1.7]">
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[44px] items-center text-amber lg:min-h-0"
              >
                GitHub ↗
              </a>
              {project.deploy ? (
                <a
                  href={project.deploy}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-[44px] items-center text-amber lg:min-h-0"
                >
                  {t('caseStudy.deploy')} ↗
                </a>
              ) : (
                <span className="font-mono text-[11px] leading-[1.4] text-bone/70">
                  {t('caseStudy.deployMissing')}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-8 perspective-[1400px] lg:px-11 lg:pb-[46px]">
        <div
          {...tiltProps}
          className={`overflow-hidden rounded-panel border border-bone/[.14] bg-surface transform-3d ${tiltClassName}`}
        >
          <Image
            src={project.image}
            alt={`${project.name} interface`}
            width={1080}
            height={620}
            className="block h-auto w-full"
          />
        </div>
        <div className="mt-3 font-mono text-[11px] uppercase leading-none tracking-widest text-bone/70">
          {t('caseStudy.figure')}
        </div>
      </section>

      <section className="relative grid gap-px border-y border-line-subtle bg-line-subtle lg:grid-cols-2">
        <div className="bg-ink px-5 py-8 lg:p-11">
          <SectionLabel>01 — {t('caseStudy.problem')}</SectionLabel>
          {data.problem.map((paragraph, index) => (
            <p key={index} className="mb-3.5 text-base leading-[1.7] text-bone/85 last:mb-0">
              {pick(paragraph)}
            </p>
          ))}
        </div>
        <div className="bg-ink px-5 py-8 lg:p-11">
          <SectionLabel>02 — {t('caseStudy.constraints')}</SectionLabel>
          <ul className="flex list-none flex-col gap-3 p-0 text-[15.5px] leading-[1.65] text-bone/85">
            {data.constraints.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-amber">—</span>
                <span>{pick(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative px-5 py-8 lg:px-11 lg:py-[46px]">
        <SectionLabel>03 — {t('caseStudy.decisions')}</SectionLabel>
        <div className="grid gap-4 perspective-distant lg:grid-cols-3">
          {data.decisions.map((decision, index) => (
            <div
              key={index}
              {...tiltProps}
              className={`rounded-card border border-line bg-surface p-[22px] transform-3d ${tiltClassName}`}
            >
              <div className="mb-2 font-display text-[19px] font-bold">{pick(decision.title)}</div>
              <p className="m-0 text-sm leading-[1.65] text-bone/75">{pick(decision.body)}</p>
            </div>
          ))}
        </div>

        <div className="mt-[26px] rounded-card border border-line bg-surface-2 p-5 lg:p-[26px]">
          <div className="mb-[18px] font-mono text-[10.5px] uppercase leading-none tracking-[.12em] text-bone/70">
            {t('caseStudy.redirectFlow')}
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[12.5px] font-medium leading-[1.4]">
            {data.redirectFlow.map((step, index) => {
              const previous = data.redirectFlow[index - 1]
              return (
                <span key={index} className="flex items-center gap-3">
                  {index > 0 &&
                    (step.dashed ? (
                      <span aria-hidden className="mx-1 block h-8 w-px bg-bone/[.14]" />
                    ) : (
                      <span aria-hidden className="text-amber">
                        →
                      </span>
                    ))}
                  <span
                    className={`rounded-[10px] px-4 py-[13px] ${
                      step.highlight
                        ? 'border border-amber/50 bg-amber-soft'
                        : step.dashed
                          ? 'border border-dashed border-bone/30 text-bone/75'
                          : 'border border-line-strong'
                    }`}
                  >
                    {flowLabel(step.label)}
                  </span>
                  {previous ? null : null}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-8 lg:px-11 lg:pb-[46px]">
        <SectionLabel>04 — {t('caseStudy.outcome')}</SectionLabel>
        <div className="grid grid-cols-1 gap-px border border-line-subtle bg-line-subtle sm:grid-cols-3">
          {data.outcome.map((metric, index) => (
            <div key={index} className="bg-ink px-6 py-[26px]">
              {/* placeholders stay visible until the numbers are measured */}
              <div className="font-display text-[32px] font-bold leading-none text-amber lg:text-[40px]">
                {metric.value ?? metric.placeholder}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase leading-normal tracking-[.08em] text-bone/70">
                {pick(metric.label)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative grid gap-px border-t border-line-subtle bg-line-subtle lg:grid-cols-2">
        <div className="bg-ink px-5 py-8 lg:p-11">
          <SectionLabel>05 — {t('caseStudy.retrospective')}</SectionLabel>
          <ul className="flex list-none flex-col gap-3 p-0 text-[15.5px] leading-[1.65] text-bone/85">
            {data.retrospective.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-amber">—</span>
                <span>{pick(item)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center gap-5 bg-ink px-5 py-8 lg:p-11">
          <div className="font-display text-[28px] font-bold leading-[1.1] tracking-[-.02em] lg:text-[34px]">
            {t('caseStudy.next')}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex min-h-[44px] items-center rounded-full bg-amber px-[22px] font-mono text-[12.5px] font-semibold uppercase leading-none tracking-[.06em] text-ink transition-[background-color,box-shadow] duration-300 hover:bg-[oklch(.83_.15_85)] hover:shadow-[0_0_0_4px_oklch(.78_.16_85/.16)]"
            >
              {t('actions.allProjects')} →
            </Link>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex min-h-[44px] items-center rounded-full border border-bone/30 px-[22px] font-mono text-[12.5px] font-semibold uppercase leading-none tracking-[.06em] transition-colors duration-300 hover:border-bone/60 hover:bg-bone/6"
            >
              {t('actions.getInTouch')}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
