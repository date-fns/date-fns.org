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
        ).filter((s) => s.name !== 'date-fns'),

        silver: uniqBy(
          ([
            Date.now() < +new Date(2023, 11, 1) && {
              id: 'rmvrwng4-kj03dpbk-9b0pz57o-yl9e8xba',
              url: 'https://polskiekasynohex.org/',
              imageUrl:
                'https://images.opencollective.com/polskiekasynohex/b25daf6/logo.png',
              name: 'KasynoHEX',
            },

            Date.now() < +new Date(2024, 3, 28) && {
              id: 'gamblewamble',
              url: 'https://gamblewamble.com/',
              imageUrl:
                'https://firebasestorage.googleapis.com/v0/b/date-fns-org.appspot.com/o/sponsors%2Fgamblewamble.png?alt=media&token=44a3705d-df0a-4697-8a61-56c135685c43',
              name: 'zugelassene online casinos deutschland',
            },

            Date.now() < +new Date(2024, 3, 3) && {
              id: 'slotzilla',
              url: 'https://www.slotozilla.com/de/',
              imageUrl:
                'https://firebasestorage.googleapis.com/v0/b/date-fns-org.appspot.com/o/sponsors%2Fslotzilla.png?alt=media&token=99f2558a-4714-4c57-bdb9-ad0aaf35eca2',
              name: 'Slotzilla',
            },

            Date.now() < +new Date(2025, 2, 10) && {
              id: 'automatenspiele',
              url: 'https://automatenspielex.com/',
              imageUrl:
                'https://firebasestorage.googleapis.com/v0/b/date-fns-org.appspot.com/o/sponsors%2Fautomatenspiele.png?alt=media&token=a722fa3f-9514-4932-a4f7-8b13246dcada',
              name: 'automatenspielex.com',
            },
          ].filter((s) => !!s) as Sponsor[]).concat(
            result.data.account.orders.nodes
              .filter(isSilver)
              .sort(sponsorsSortFn)
              .map(sponsorsMapFn)
          ),
          'id'
        ),

        bronze: uniqBy(
          ([
            Date.now() < +new Date(2024, 10, 17) && {
              id: 'utlandskacasino',
              url: 'https://xn--utlndskacasino-7hb.se/',
              imageUrl:
                'https://firebasestorage.googleapis.com/v0/b/date-fns-org.appspot.com/o/sponsors%2Futlandskacasino.png?alt=media&token=72c59dc1-cfcc-4f0e-b788-40e0f5686b04',
              name: 'Utländska Casino',
            },
          ].filter((s) => !!s) as Sponsor[]).concat(
            result.data.account.orders.nodes
              .filter(isBronze)
              .sort(sponsorsSortFn)
              .map(sponsorsMapFn)
          ),
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
