'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useTilt } from '@/hooks/useTilt'
import { useLang } from '@/i18n/LanguageProvider'
import projectsData from '@/utils/projects.json'

const featured = projectsData.projects.filter((project) => project.featured).slice(0, 3)

export default function FeaturedProjects() {
  const { t, pick } = useLang()
  const { tiltProps, tiltClassName } = useTilt()

  return (
    <section id="work" className="px-5 py-7 lg:px-11 lg:pb-5 lg:pt-[52px]">
      <div className="mb-6 flex items-baseline justify-between gap-4 lg:mb-[26px]">
        <h2 className="font-display text-[28px] font-bold leading-none tracking-[-.02em] lg:text-[38px]">
          {t('sections.projects')}
        </h2>
        <Link
          href="/projects"
          className="tap-area border-b border-amber/40 pb-[3px] font-mono text-[11px] font-medium uppercase leading-none tracking-widest text-amber lg:text-[11.5px]"
        >
          {t('actions.allProjects')} ↗
        </Link>
      </div>

      <div className="grid gap-5 perspective-distant lg:grid-cols-3">
        {featured.map((project) => (
          <a
            key={project.id}
            href={project.deploy ?? project.link}
            target="_blank"
            rel="noreferrer"
            {...tiltProps}
            className={`block overflow-hidden rounded-card border border-line bg-surface transform-3d hover:border-line-strong ${tiltClassName}`}
          >
            <div className="relative h-[140px] overflow-hidden bg-[#191920] lg:h-[150px]">
              <Image
                src={project.image}
                alt={project.name}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="px-[18px] pb-[22px] pt-[18px]">
              <div className="font-display text-[22px] font-bold">
                {project.name} <span className="text-amber">↗</span>
              </div>
              <p className="mb-3 mt-1.5 text-[13.5px] leading-[1.6] text-bone/70">
                {pick(project.description)}
              </p>
              <div className="font-mono text-[10.5px] uppercase leading-[1.6] tracking-[.06em] text-bone/60">
                {project.technologies.slice(0, 3).join(' · ')}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
