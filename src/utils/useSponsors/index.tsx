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
          (Date.now() < +new Date(2024, 3, 3)
            ? [
                {
                  id: 'slotzilla',
                  url: 'https://www.slotozilla.com/de/',
                  imageUrl:
                    'https://firebasestorage.googleapis.com/v0/b/date-fns-org.appspot.com/o/sponsors%2Fslotzilla.png?alt=media&token=99f2558a-4714-4c57-bdb9-ad0aaf35eca2',
                  name: 'Slotzilla',
                },
              ]
            : []
          ).concat(
            (Date.now() < +new Date(2024, 2, 10)
              ? [
                  {
                    id: 'automatenspiele',
                    url:
                      'https://automatenspielex.com/online-casino-bonus/ohne-einzahlung',
                    imageUrl:
                      'https://firebasestorage.googleapis.com/v0/b/date-fns-org.appspot.com/o/sponsors%2Fautomatenspiele.png?alt=media&token=a722fa3f-9514-4932-a4f7-8b13246dcada',
                    name: 'bonus ohne einzahlung',
                  },
                ]
              : []
            ).concat(
              result.data.account.orders.nodes
                .filter(isSilver)
                .sort(sponsorsSortFn)
                .map(sponsorsMapFn)
            )
          ),
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
