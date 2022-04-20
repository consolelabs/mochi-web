const get = async <T>(
  endpoint: string,
  initHeaders?: HeadersInit
): Promise<T | undefined> => {
  try {
    const headers: Record<string, any> = {
      "Content-Type": "application/json",
      ...initHeaders,
    };

    const fetcher = await fetch(endpoint, {
      headers,
      method: "GET",
    });
    const response = await fetcher.json();
    return response as T;
  } catch (e) {
    console.error(`Call to ${endpoint} error\n`, e);
  }
};

const post = async <T>(
  endpoint: string,
  body: Record<string, any>,
  initHeaders?: HeadersInit
): Promise<T | undefined> => {
  try {
    const headers: Record<string, any> = {
      "Content-Type": "application/json",
      ...initHeaders,
    };

    const fetcher = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    const response = await fetcher.json();
    return response as T;
  } catch (e) {
    console.error(`Call to ${endpoint} error\n`, e);
  }
};

export const fetcher = { get, post };
