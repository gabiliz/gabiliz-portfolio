'use client'

const STACK = [
  'React',
  'TypeScript',
  'Next.js',
  'React Query',
  'Zustand',
  'Jest + RTL',
  'Radix',
  'Tailwind',
  'Prisma',
  'tRPC',
]

const line = `${STACK.join(' · ')} · `

export default function StackTicker() {
  return (
    <div className="relative overflow-hidden border-y border-line-subtle py-[11px] lg:hidden">
      <div className="flex w-max animate-marquee font-mono text-[11.5px] uppercase leading-none tracking-[.12em] text-bone/70">
        {/* duplicated so translateX(-50%) loops seamlessly */}
        <span className="whitespace-pre">{line}</span>
        <span aria-hidden className="whitespace-pre">
          {line}
        </span>
      </div>
    </div>
  )
}
