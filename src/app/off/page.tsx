import type { Metadata } from 'next'

import OffPage from '@/components/personal/OffPage'

export const metadata: Metadata = {
  title: 'Off',
  description: 'What I do when I am not writing code.',
}

export default function Page() {
  return <OffPage />
}
