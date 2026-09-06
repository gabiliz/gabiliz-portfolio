'use client'

/**
 * Shared frame for the four personal routes (/now, /reading, /off, /uses).
 *
 * The prototype draws a top bar of its own — back link, route name, EN/PT — but
 * that only exists because each artboard is standalone. In the app `SiteHeader`
 * already renders `← home` plus the language toggle on every non-home route, and
 * the active link is amber, so the bar isn't repeated here.
 *
 * No `Grain` either: the handoff asks for these pages without it.
 */
export default function PersonalPageShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <main className="relative">
      <div className="px-5 pb-5 pt-8 lg:px-8 lg:pt-10">
        <h1 className="animate-fadeUp [animation-delay:.05s] font-display text-[34px] font-extrabold leading-[.96] tracking-[-.03em] lg:text-[52px]">
          {title}
        </h1>
        <p className="animate-fadeUp [animation-delay:.18s] mt-4 max-w-[460px] text-[15px] leading-[1.65] text-bone/76">
          {subtitle}
        </p>
      </div>

      <div className="px-5 pb-[34px] lg:px-8">{children}</div>
    </main>
  )
}
