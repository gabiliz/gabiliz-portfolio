import type { Metadata } from 'next'

import UsesPage from '@/components/personal/UsesPage'
import { USES_READY } from '@/utils/uses'

// Header, sitemap and robots all read the same flag, so the page can't end up
// advertised in one place and hidden in another.
export const metadata: Metadata = {
  title: 'Uses',
  description: 'The setup I write code on.',
  robots: { index: USES_READY },
}

export default function Page() {
  return <UsesPage />
}
