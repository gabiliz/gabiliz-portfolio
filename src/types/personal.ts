import type { Localized } from '@/i18n/types'

/** The six lines of /now. `reading` is derived from reading.json, not stored here. */
export type NowEntryKey = 'work' | 'learning' | 'finished' | 'life' | 'wanting'

export type BookStatus = 'reading' | 'finished' | 'abandoned'

export type Book = {
  id: string
  title: string
  author: string
  status: BookStatus
  /** 0–5, or null when a book was dropped without one */
  rating: number | null
  note: Localized
  page: number | null
  pages: number | null
  startedAt: string | null
  finishedAt: string | null
  /** placeholder the author still has to fill in — render the brackets as they are */
  pending: boolean
}

export type OffArtKind = 'barbell' | 'paws' | 'steam' | 'bars' | 'slot'

export type OffCard = {
  id: string
  art: OffArtKind
  pending: boolean
  cadence: Localized
  title: Localized
  text: Localized
}

export type UsesItem = {
  key: string
  label: Localized
  value: Localized
  pending: boolean
}

export type UsesGroup = {
  id: string
  label: Localized
  items: UsesItem[]
}

/** Filter keys of /credentials. Every item carries `all` so the default chip matches everything. */
export type CredentialArea = 'all' | 'front' | 'back' | 'test' | 'arch' | 'lang' | 'degree'

export type Credential = {
  id: string
  title: Localized
  /** a proper name — not translated */
  issuer: string
  /** 2–3 letter typographic mark, authored in the JSON rather than derived from initials */
  issuerMark: string
  areas: CredentialArea[]
  year: number
  /** set when consecutive years collapse into one band, e.g. "2020 — 2022" */
  yearLabel: string | null
  hours: Localized | null
  /** full issue date when known; the row shows `year`, so this is reference only */
  issuedAt?: string | null
  status: 'done' | 'progress' | 'award'
  /** 0–100; unused by the list format, kept for the card layout */
  progress: number | null
  verifyUrl: string | null
  pending: boolean
}
