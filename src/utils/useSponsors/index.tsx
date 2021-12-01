import { useJSON } from '~/utils/useJSON'
import { RequestHookResult } from '~/types/hooks'
import {
  isGold,
  isSilver,
  isBronze,
  isBacker,
  sponsorsSortFn,
  sponsorsMapFn,
} from './utils'
import { SponsorsResponse, Sponsors, Sponsor } from './types'
import { CONFIG } from '~/constants'
import uniqBy from 'lodash/uniqBy'

export { Sponsor }

const SPONSORS_URL = `${CONFIG.apiURL}/sponsors?v2`

export function useSponsors(): RequestHookResult<Sponsors> {
  const [result, meta] = useJSON<SponsorsResponse>(SPONSORS_URL)

  if (result) {
    return [
      {
        gold: uniqBy(
          result.data.account.orders.nodes
            .filter(isGold)
            .sort(sponsorsSortFn)
            .map(sponsorsMapFn),
          'id'
        ),
        silver: uniqBy(
          result.data.account.orders.nodes
            .filter(isSilver)
            .sort(sponsorsSortFn)
            .map(sponsorsMapFn),
          'id'
        ),
        bronze: uniqBy(
          result.data.account.orders.nodes
            .filter(isBronze)
            .sort(sponsorsSortFn)
            .map(sponsorsMapFn),
          'id'
        ),
        backers: uniqBy(
          result.data.account.orders.nodes
            .filter(isBacker)
            .sort(sponsorsSortFn)
            .map(sponsorsMapFn),
          'id'
        ),
      },
      meta,
    ]
  }

  return [result, meta]
}
