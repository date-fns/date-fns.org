import { useJSON } from 'utils/useJSON'
import { RequestHookResult } from 'types/hooks'

const CONTRIBUTORS_URL = 'https://november-experiment.web.app/api/contributors'

type ContributorsFetchResponse = {
  id: string
  html_url: string
  avatar_url: string
  login: string
}[]

interface Contributor {
  id: string
  url: string
  avatarUrl: string
  name: string
}

export function useContributors (): RequestHookResult<Contributor[]> {
  const [result, meta] = useJSON<ContributorsFetchResponse>(CONTRIBUTORS_URL)

  if (result) {
    return [
      result.map(user => ({
        id: user.id,
        url: user.html_url,
        avatarUrl: user.avatar_url,
        name: user.login
      })),
      meta
    ]
  }

  return [result, meta]
}