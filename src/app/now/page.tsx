import type { Metadata } from 'next'

import NowPage from '@/components/personal/NowPage'

// i18n runs client-side, so metadata stays in the default language (en)
export const metadata: Metadata = {
  title: 'Now',
  description: 'What I am working on, learning, reading and wanting right now.',
}

export default function Page() {
  return <NowPage />
}
