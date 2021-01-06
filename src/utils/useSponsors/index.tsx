import { useJSON } from 'utils/useJSON'
import { RequestHookResult } from 'types/hooks'
import {
  isSilver,
  isBronze,
  isBacker,
  sponsorsMapFn
} from './utils'
import { SponsorsResponse, Sponsors, Sponsor } from './types'

export { Sponsor }

const SPONSORS_URL = 'https://november-experiment.web.app/api/sponsors'

export function useSponsors (): RequestHookResult<Sponsors> {
  const [result, meta] = useJSON<SponsorsResponse>(SPONSORS_URL)

  if (result) {
    return [
      {
        silver: result.data.account.orders.nodes.filter(isSilver).map(sponsorsMapFn),
        bronze: result.data.account.orders.nodes.filter(isBronze).map(sponsorsMapFn),
        backers: result.data.account.orders.nodes.filter(isBacker).map(sponsorsMapFn),
      },
      meta
    ]
  }

  return [result, meta]
}

