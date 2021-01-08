export type RequestHookResult<TResult> = [
  TResult | undefined,
  { loading: boolean; error?: any }
]
