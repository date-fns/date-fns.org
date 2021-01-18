import { useQuery as useFirestoreQuery } from '@typesaurus/preact'
import { TypesaurusHookResult } from '@typesaurus/preact/types'
import { useEffect } from 'preact/hooks'
import { Collection, CollectionGroup, Doc, Query } from 'typesaurus'
import * as Sentry from '@sentry/browser'

export function useQuery<Model>(
  collection: Collection<Model> | CollectionGroup<Model>,
  queries: Query<Model, keyof Model>[] | undefined
): TypesaurusHookResult<
  typeof queries extends undefined ? undefined : Doc<Model>[] | undefined
> {
  const result = useFirestoreQuery(collection, queries)

  useEffect(() => {
    if (result[1].error) {
      console.error(result[1].error)
      Sentry.captureException(result[1].error)
    }
  }, [result[1].error])

  return result
}
