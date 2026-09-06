'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export const EMAIL = 'gabrielalizmoreira@gmail.com'

export function useCopyEmail(email: string = EMAIL) {
  const [copied, setCopied] = useState(false)
  // React 19 requires an explicit initial value
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const copy = useCallback(() => {
    navigator.clipboard.writeText(email)
    setCopied(true)

    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setCopied(false), 2200)
  }, [email])

  useEffect(() => () => clearTimeout(timeout.current), [])

  return { copied, copy }
}
