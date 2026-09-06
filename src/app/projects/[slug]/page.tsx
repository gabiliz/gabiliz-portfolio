import { notFound } from 'next/navigation'

import CaseStudy from '@/components/CaseStudy'
import { publishedCaseStudies as withCase } from '@/utils/caseStudies'
import projectsData from '@/utils/projects.json'

export function generateStaticParams() {
  return withCase.map((project) => ({ slug: project.id }))
}

// params is a promise as of Next 15
export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const index = withCase.findIndex((project) => project.id === slug)
  if (index === -1) notFound()

  return (
    <CaseStudy
      project={withCase[index]}
      position={index + 1}
      totalProjects={projectsData.projects.length}
    />
  )
}
