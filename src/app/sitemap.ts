import type { MetadataRoute } from 'next'

import { publishedCaseStudies as caseStudies } from '@/utils/caseStudies'
import { USES_READY } from '@/utils/uses'

const BASE_URL = 'https://gabiliz.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  // /uses stays out while it's all placeholders (it's noindex too)
  const paths = [
    '/',
    '/projects',
    ...caseStudies.map((project) => `/projects/${project.id}`),
    '/now',
    '/reading',
    '/off',
    '/credentials',
    ...(USES_READY ? ['/uses'] : []),
  ]

  return paths.map((path) => ({ url: `${BASE_URL}${path}` }))
}
