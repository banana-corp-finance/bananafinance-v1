const PANCAKE_EXTENDED = 'http://corstest.spacegrime.finance/spacegrimeswap-extended.json'
const PANCAKE_TOP100 = 'http://corstest.spacegrime.finance/spacegrimeswap-top-100.json'

export const UNSUPPORTED_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  PANCAKE_TOP100,
  PANCAKE_EXTENDED,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []













