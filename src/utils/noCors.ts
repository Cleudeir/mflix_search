"use client";

async function fetchTimeout(
  url: RequestInfo | URL,
  options?: RequestInit | undefined,
  timeout = 100000
): Promise<any> {
  return await Promise.race([
    fetch(url, options),
    new Promise((solve, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    ),
  ]);
}


async function noCors(
  input: string,
  init?: RequestInit | undefined
): Promise<any> {
  let url = "/api" + input.split(":").join("__").replace("//", "/");
  if (!init) {
    try {
      const resp = await fetchTimeout(url);
      const data = await resp.json();
      if (data.results) {
        return data.results;
      }

      return data;
    } catch (error: any) {
      return { error: error.message, url };
    }
  } else {
    try {
      const resp = await fetchTimeout(url, init);
      const data = await resp.json();
      if (data.results) {
        return data.results;
      }
      return data;
    } catch (error: any) {
      return { error: error.message, url };
    }
  }
}

export default noCors;
