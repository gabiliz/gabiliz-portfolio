'use client'

import { useMemo, useState } from 'react'

export type StackFilter = { key: string; label: string }

type Controls = {
  /** controlled mode — pass both to own the state elsewhere, e.g. in the URL */
  active?: string
  onActiveChange?: (key: string) => void
}

type Options<T> = Controls & {
  /** where the filter keys live on each item; defaults to `stack` */
  keys?: (item: T) => string[]
}

type Result<T> = {
  active: string
  setActive: (key: string) => void
  filtered: T[]
  total: number
}

/**
 * Single-select filter shared by the experience timeline, /projects and
 * /credentials. `all` is the initial state and matches everything.
 *
 * Controlled mode exists so /credentials can keep the active area in the query
 * string without dragging `useSearchParams` — and the static-render opt-out that
 * comes with it — into the pages that don't need it.
 */
export function useStackFilter<T extends { stack: string[] }>(
  items: T[],
  options?: Controls,
): Result<T>
export function useStackFilter<T>(
  items: T[],
  options: Controls & { keys: (item: T) => string[] },
): Result<T>
export function useStackFilter<T>(items: T[], options: Options<T> = {}): Result<T> {
  const { keys = (item) => (item as { stack?: string[] }).stack ?? [] } = options
  const [internal, setInternal] = useState('all')

  const active = options.active ?? internal
  const setActive = options.onActiveChange ?? setInternal

  // biome-ignore lint/correctness/useExhaustiveDependencies: `keys` is a literal at every call site, so listing it would rebuild the filter on every render
  const filtered = useMemo(
    () => (active === 'all' ? items : items.filter((item) => keys(item).includes(active))),
    [items, active],
  )

  return { active, setActive, filtered, total: items.length }
}
