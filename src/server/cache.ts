import subDays from 'date-fns/subDays'

const cacheStore: {
  [key: string]: {
    response?: any
    lastUpdated: Date
    error?: any
  }
} = {}

export async function cache(id: string, callback: () => Promise<any>) {
  if (
    !cacheStore[id] ||
    cacheStore[id].error ||
    cacheStore[id].lastUpdated < subDays(new Date(), 1)
  ) {
    try {
      const response = await callback()
      cacheStore[id] = {
        response,
        lastUpdated: new Date(),
      }
    } catch (e) {
      console.error(e)
      cacheStore[id] = {
        error: e,
        lastUpdated: new Date(),
      }
      return { error: 'Fetch failed' }
    }
  }
  return cacheStore[id].response
}
