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

export { Sponsor }

const SPONSORS_URL = `${CONFIG.apiURL}/sponsors`

export function useSponsors(): RequestHookResult<Sponsors> {
  const [result, meta] = useJSON<SponsorsResponse>(SPONSORS_URL)

  if (result) {
    return [
      {
        gold: result.data.account.orders.nodes
          .filter(isGold)
          .sort(sponsorsSortFn)
          .map(sponsorsMapFn),
        silver: result.data.account.orders.nodes
          .filter(isSilver)
          .sort(sponsorsSortFn)
          .map(sponsorsMapFn),
        bronze: result.data.account.orders.nodes
          .filter(isBronze)
          .sort(sponsorsSortFn)
          .map(sponsorsMapFn),
        backers: result.data.account.orders.nodes
          .filter(isBacker)
          .sort(sponsorsSortFn)
          .map(sponsorsMapFn),
      },
      meta,
    ]
  }

  return [result, meta]
}
