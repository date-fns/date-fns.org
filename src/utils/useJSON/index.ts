import { useState, useEffect } from 'preact/hooks'
import { getJSON } from '~/utils/request'
import { RequestHookResult } from '~/types/hooks'
import * as Sentry from '@sentry/browser'

export function useJSON<TResult>(url: string): RequestHookResult<TResult> {
  const [result, setResult] = useState<TResult | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    getJSON(url)
      .then((json) => {
        setResult(json)
        setLoading(false)
      })
      .catch((e) => setError(e))
  }, [])

  useEffect(() => {
    if (error) {
      console.error(error)
      Sentry.captureException(error)
    }
  }, [error])

  return [result, { loading, error }]
}
