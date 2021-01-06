import subDays from 'date-fns/subDays'

const cacheStore: {
  [key: string]: {
    response: any,
    lastUpdated: Date
  }
} = {}

/**
 * @killmeplease
 */
export async function cache (id: string, callback: () => Promise<any>) {
  if (!cacheStore[id] || (cacheStore[id].lastUpdated < subDays(new Date(), 1))) {
    const response = await callback()
    cacheStore[id] = {
      response,
      lastUpdated: new Date()
    }
  }
  return cacheStore[id].response
}