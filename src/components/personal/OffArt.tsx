import type { OffArtKind } from '@/types/personal'

const BAR_HEIGHTS = [26, 40, 18, 46, 32, 22]

/**
 * The four card illustrations, all pure CSS — no images, no icon library.
 * Purely decorative, so the whole box is hidden from assistive tech.
 *
 * `globals.css` kills every animation under `prefers-reduced-motion: reduce`.
 */
export default function OffArt({ kind }: { kind: OffArtKind }) {
  return (
    <div aria-hidden className="flex h-[74px] items-center justify-center">
      {kind === 'barbell' && (
        <div className="animate-lift flex items-center gap-px">
          <i className="block h-[26px] w-[9px] rounded-[3px] bg-bone" />
          <i className="block h-[3px] w-[36px] rounded-full bg-amber" />
          <i className="block h-[26px] w-[9px] rounded-[3px] bg-bone" />
        </div>
      )}

      {kind === 'paws' && (
        <div className="flex items-center gap-3.5">
          {[0, 1, 2, 3].map((index) => (
            <i
              key={index}
              className="animate-pawStep block h-[11px] w-[11px] rounded-full bg-bone"
              style={{ animationDelay: `${index * 0.3}s` }}
            />
          ))}
        </div>
      )}

      {kind === 'steam' && (
        <div className="flex flex-col items-center">
          <div className="mb-1 flex h-[14px] items-end gap-2">
            {[0, 1, 2].map((index) => (
              <i
                key={index}
                className="animate-steam block h-[14px] w-[3px] rounded-full bg-amber"
                style={{ animationDelay: `${index * 0.45}s` }}
              />
            ))}
          </div>
          {/* the pan: open at the top, so the steam reads as coming out of it */}
          <div className="h-6 w-[52px] rounded-b-xl border-2 border-t-0 border-bone" />
        </div>
      )}

      {kind === 'bars' && (
        <div className="flex h-[46px] items-end gap-2">
          {BAR_HEIGHTS.map((height, index) => (
            <i
              key={index}
              className={`animate-breathe block w-1.5 origin-bottom rounded-xs ${
                index === 3 ? 'bg-amber' : 'bg-bone'
              }`}
              style={{
                height,
                animationDuration: `${2.6 + index * 0.3}s`,
                animationDelay: `${index * 0.18}s`,
              }}
            />
          ))}
        </div>
      )}

      {kind === 'slot' && (
        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-card border border-dashed border-bone/[.28] font-mono text-xl text-bone/40">
          +
        </div>
      )}
    </div>
  )
}
