"use client";
async function noCors(
  input: string,
  init?: RequestInit | undefined
): Promise<any> {
  let url = "/api/" + input.split(":").join("__").replace("//", "/");  
  let data;
  if (!init) {
    console.log(url);
    const resp = await fetch(url);
    data = await resp.json();
    console.log(data)
  } else {
    console.log(url, init);
    const resp = await fetch(url, init);
    data = await resp.json();
  }
  if (data.results) {
    return data.results;
  }
  console.log(data)
  return data;
}

export default noCors;
