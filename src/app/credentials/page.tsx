import type { Metadata } from 'next'
import { Suspense } from 'react'

import CredentialsPage from '@/components/personal/CredentialsPage'

// unlike /uses, this one is meant to be found
export const metadata: Metadata = {
  title: 'Credentials',
  description:
    'Certificates and degrees grouped by year and filtered by area, each linking to its verification page.',
  robots: { index: true },
}

export default function Page() {
  // the filter state lives in the query string, so useSearchParams needs a boundary
  return (
    <Suspense>
      <CredentialsPage />
    </Suspense>
  )
}
