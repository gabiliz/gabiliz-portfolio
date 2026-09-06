import type { Metadata } from 'next'

import ReadingPage from '@/components/personal/ReadingPage'

export const metadata: Metadata = {
  title: 'Reading',
  description: 'The shelf: what I am reading, what stayed with me and what I put down.',
}

export default function Page() {
  return <ReadingPage />
}
