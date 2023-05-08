"use client";
async function noCors(
  input: string,
  init?: RequestInit | undefined
): Promise<any> {
  let url = "/api/" + input.split(":").join("__").replace("//", "/");  
  if (!init) {
    console.log(url);
    const resp = await fetch(url);
    const data = await resp.json();
    console.log(data)
    if (data.results) {
      console.log(data.results)
      return data.results;
    } 
    return data;
  } else {
    console.log(url, init);
    const resp = await fetch(url, init);
    const data = await resp.json();
    console.log(data)
    if (data.results) {
      console.log(data.results)
      return data.results;
    } 
    return data;
  }

}

export default noCors;
