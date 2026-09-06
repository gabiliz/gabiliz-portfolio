/**
 * Subtle noise overlay. Used on /projects and the case study — the home hero is
 * deliberately clean, carrying only the two radial glows.
 *
 * The prototype specifies .4, but that reads as paper texture rather than grain
 * once rendered over #0a0a0c; .12 keeps it perceptible without the speckle.
 */
export default function Grain({ opacity = 0.12 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 bg-[url('/noise.svg')]"
    />
  )
}
