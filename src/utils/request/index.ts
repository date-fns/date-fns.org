interface RequestOptions {
  method?: 'GET' | 'POST'
  data?: any
  headers?: { [key: string]: string }
}

interface BuiltInFetchOptions extends RequestOptions {
  mode?: RequestMode
  body?: string
}

export async function request(url: string, options: RequestOptions = {}) {
  const { method = 'GET', data, headers: defaultHeaders = {} } = options

  let headers = defaultHeaders
  let fetchOptions: BuiltInFetchOptions = { mode: 'cors' }

  if (data) {
    if (method === 'GET') {
      // TODO: Enable qs when GET with data will be required.
      // url += `?${qs.stringify(data, {arrayFormat: 'brackets'})}`
    } else {
      fetchOptions = { ...fetchOptions, body: JSON.stringify(data) }
      headers = { ...headers, 'Content-Type': 'application/json' }
    }
  }

  const response = await fetch(url, {
    ...fetchOptions,
    method,
    headers: new Headers(headers)
  })

  const { status } = response

  if (status === 500) {
    // TODO: Process 500 when it will be required.
  }

  if (status >= 400 && status < 500) {
    // TODO: Process 4xx when it will be required.
  }

  return response
}

export async function requestJSON(url: string, options: RequestOptions = {}) {
  const response = await request(
    url,
    {
      ...options,
      headers: {
        ...(options.headers ?? {}),
        Accept: 'application/json'
      }
    }
  )

  return response.json()
}

export function getJSON(url: string, options: RequestOptions = {}) {
  return requestJSON(url, {...options, method: 'GET'})
}

export function requestGraphQL(url: string, query: string, headers?: { [key: string]: string }) {
  return requestJSON(url, { method: 'POST', data: { query }, headers})
}
