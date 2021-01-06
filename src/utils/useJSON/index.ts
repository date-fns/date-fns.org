import { useState, useEffect } from 'preact/hooks'
import { getJSON } from 'utils/request'
import { RequestHookResult } from 'types/hooks'

export function useJSON<TResult>(url: string): RequestHookResult<TResult> {
  const [result, setResult] = useState<TResult | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getJSON(url).then(json => {
      setResult(json)
      setLoading(false)
    })
  }, [])

  return [result, { loading }]
}
