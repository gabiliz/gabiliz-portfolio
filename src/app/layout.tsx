import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from './theme-provider'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gabriela Liz',
  description: `Gabriela's portfolio`,
  icons: {
    icon: 'icon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full'>
      <body className='flex min-h-full bg-white antialiased dark:bg-zinc-900'>
        <div className='h-full w-full lg:ml-72 xl:ml-80'>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Sidebar />
          {children}
        </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
