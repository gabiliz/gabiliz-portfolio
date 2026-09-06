'use client'

import FilterChips from '@/components/FilterChips'
import Grain from '@/components/Grain'
import ProjectRow, { type Project } from '@/components/ProjectRow'
import { useStackFilter } from '@/hooks/useStackFilter'
import { useLang } from '@/i18n/LanguageProvider'
import projectsData from '@/utils/projects.json'

// newest first. Array.prototype.sort is stable, so projects sharing a year keep
// the curated order they have in the JSON. The numbering below follows this list,
// and `indexOf` reads from it unfiltered so a project keeps its number when the
// filter narrows the page.
const projects = [...(projectsData.projects as Project[])].sort(
  (a, b) => Number.parseInt(b.year, 10) - Number.parseInt(a.year, 10),
)

export default function ProjectsPage() {
  const { t } = useLang()
  const { active, setActive, filtered, total } = useStackFilter(projects)

  return (
    <main className="relative">
      <Grain />

      <div className="relative px-5 pb-6 pt-8 lg:px-11 lg:pb-6 lg:pt-12">
        <h1 className="animate-fadeUp [animation-delay:.05s] font-display text-[48px] font-extrabold leading-[.94] tracking-[-.04em] lg:text-[72px]">
          {t('sections.projects')}
        </h1>
        <p className="animate-fadeUp [animation-delay:.2s] mt-[18px] max-w-[620px] text-[15px] leading-[1.65] text-bone/80 lg:text-[16.5px]">
          {t('projects.subtitle')}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
          <FilterChips
            filters={projectsData.filters}
            active={active}
            onChange={setActive}
            label={t('filter.label')}
          />
          <span className="font-mono text-[11px] uppercase leading-none tracking-widest text-bone/70">
            {t('filter.projectCount', { count: filtered.length, total })}
          </span>
        </div>
      </div>

      <div className="relative flex flex-col gap-4 px-5 pb-5 perspective-[1600px] lg:px-11">
        {filtered.map((project) => (
          <ProjectRow key={project.id} project={project} index={projects.indexOf(project)} />
        ))}
      </div>
    </main>
  )
}
