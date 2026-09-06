import './globals.css'
import type { Metadata } from 'next'
import { DM_Mono, IBM_Plex_Sans } from 'next/font/google'

import SiteFooter from '@/components/SiteFooter'
import SiteHeader from '@/components/SiteHeader'
import { LanguageProvider } from '@/i18n/LanguageProvider'

// Bricolage Grotesque isn't in next/font's list on Next 13.4, so it comes from a
// stylesheet link below and `--font-bricolage` is declared in globals.css.
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Gabriela Liz',
    template: '%s · Gabriela Liz',
  },
  description:
    'Six years of React and TypeScript across fintech, consultancies and SaaS — currently frontend tech lead at Twila. Front-end or full-stack, remote.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${plexSans.variable} ${dmMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-ink font-sans text-bone antialiased">
        <LanguageProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  )
}
