import { useJSON } from '~/utils/useJSON'
import { RequestHookResult } from '~/types/hooks'
import { CONFIG } from '~/constants'

interface Job {
  ref: {
    id: string
  }
  data: {
    sourceData: {
      howToApply: string
      description: string
    }
    location: string
    source: string
    sourceId: string
    featuredUntil: string
    descriptionHTML: string
    featured: boolean
    companyName: string
    engagmentType: string
    sourceURL: string
    position: string
    publishedAt: string
    tags: string[]
    companyURL: string
    approved: boolean
    companyLogo: string
  }
}

interface JobsFetchResponse {
  jobs: Job[]
  tags: {
    [k: string]: string
  }
}

export function useJobs(): RequestHookResult<JobsFetchResponse> {
  return useJSON<JobsFetchResponse>(`${CONFIG.jobsURL}/api/jobs`)
}
