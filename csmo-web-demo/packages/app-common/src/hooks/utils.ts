import { chain } from 'lodash'
import type { FormatLookups } from './useLookup'

const findLabel = (lookups: FormatLookups[], value: string | undefined | null): string =>
  chain(lookups)
    .find((lookup) => lookup.value === value)
    .get('label')
    .value()

const findLabels = (lookups: FormatLookups[], value: string | undefined | null): string => {
  return chain(lookups)
    .filter((lookup) => (value?.split(',') ?? []).includes(lookup.value ?? ''))
    .map((item) => item.label)
    .join(',')
    .value()
}

const findOption = (lookups: FormatLookups[], value: string | undefined | null): FormatLookups =>
  chain(lookups)
    .find((lookup) => lookup.value === value)
    .value()

const includeOptionsByValue = (lookups: FormatLookups[], excludeValues: string[]) =>
  chain(lookups)
    .intersectionWith(excludeValues, (lookup, value) => {
      return lookup.value === value
    })
    .value()

const excludeOptionsByValue = (lookups: FormatLookups[], excludeValues: string[]) =>
  chain(lookups)
    .pullAllWith(excludeValues, (lookup, value) => {
      return lookup.value === value
    })
    .value()

export { excludeOptionsByValue, findLabel, findLabels, findOption, includeOptionsByValue }
