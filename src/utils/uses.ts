import usesData from '@/utils/uses.json'

/**
 * `/uses` ships with every value as a bracketed placeholder. It stays out of the
 * header, out of the sitemap and noindex until the author fills it in — deriving
 * that from the data means there's no second place to remember to update.
 */
export const USES_READY = usesData.groups.every((group) =>
  group.items.every((item) => !item.pending),
)
