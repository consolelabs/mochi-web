const get = async <T>(
  endpoint: string,
  initHeaders?: HeadersInit,
): Promise<T | undefined> => {
  try {
    const headers: Record<string, any> = {
      'Content-Type': 'application/json',
      ...initHeaders,
    }

    const fetcher = await fetch(endpoint, {
      headers,
      method: 'GET',
    })
    const response = await fetcher.json()
    return response as T
  } catch (e) {
    console.error(`Call to ${endpoint} error\n`, e)
  }
}

const post = async (
  endpoint: string,
  body: Record<string, any>,
  initHeaders?: HeadersInit,
): Promise<Response | null> => {
  try {
    const headers: Record<string, any> = {
      'Content-Type': 'application/json',
      ...initHeaders,
    }

    return await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      method: 'POST',
      body: JSON.stringify(body),
    })
  } catch (e) {
    console.error(`Call to ${endpoint} error\n`, e)
    return null
  }
}

export const fetcher = { get, post }
