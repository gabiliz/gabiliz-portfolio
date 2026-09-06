'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useTilt } from '@/hooks/useTilt'
import { useLang } from '@/i18n/LanguageProvider'
import type { Localized } from '@/i18n/types'

export type Project = {
  id: string
  name: string
  year: string
  tag: Localized
  stack: string[]
  technologies: string[]
  image: string
  link: string
  deploy?: string | null
  description: Localized
  caseStudy?: unknown
}

export default function ProjectRow({ project, index }: { project: Project; index: number }) {
  const { t, pick } = useLang()
  const { tiltProps, tiltClassName } = useTilt()

  const hasCase = Boolean(project.caseStudy)
  const href = hasCase ? `/projects/${project.id}` : (project.deploy ?? project.link)
  const external = !hasCase

  const content = (
    <>
      <div className="relative min-h-[172px] w-full flex-none self-stretch overflow-hidden bg-[#191920] sm:w-[260px]">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 640px) 260px, 100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-[9px] px-[26px] py-6">
        <div className="flex items-center justify-between gap-3.5">
          <span className="font-mono text-[11px] uppercase leading-none tracking-[.12em] text-bone/60">
            {String(index + 1).padStart(3, '0')} · {project.year}
          </span>
          <span className="rounded-full border border-bone/20 px-2.5 py-[5px] font-mono text-[10px] font-medium uppercase leading-none tracking-widest text-bone/75">
            {pick(project.tag)}
          </span>
        </div>

        <div className="font-display text-[20px] font-bold tracking-[-.02em] lg:text-[25px]">
          {project.name} <span className="text-amber">{external ? '↗' : '→'}</span>
        </div>

        <p className="m-0 max-w-[460px] text-sm leading-[1.6] text-bone/75">
          {pick(project.description)}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[10.5px] uppercase leading-[1.6] tracking-[.06em] text-bone/60">
            {project.technologies.slice(0, 4).join(' · ')}
          </span>
          {hasCase && (
            <span className="font-mono text-[11px] font-medium uppercase leading-none tracking-[.08em] text-amber">
              {t('actions.readTheCase')} →
            </span>
          )}
        </div>
      </div>
    </>
  )

  const className = `flex flex-col overflow-hidden rounded-panel border border-line bg-surface transform-3d sm:flex-row sm:items-stretch ${tiltClassName}`

  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={className} {...tiltProps}>
      {content}
    </a>
  ) : (
    <Link href={href} className={className} {...tiltProps}>
      {content}
    </Link>
  )
}
