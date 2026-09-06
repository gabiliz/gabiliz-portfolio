import type { Project } from '@/components/ProjectRow'
import projectsData from '@/utils/projects.json'

/**
 * Projects whose case study is published.
 *
 * The brev.ly case is parked under `caseStudyDraft` in projects.json while it is
 * rewritten, and nothing reads that key: no /projects/<slug> route, no "read the
 * case" link on the card, no sitemap entry. Renaming it back to `caseStudy`
 * republishes all three at once — this is the only place that decides.
 */
export const publishedCaseStudies = (projectsData.projects as Project[]).filter((project) =>
  Boolean(project.caseStudy),
)
