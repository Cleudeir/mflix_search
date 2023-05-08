"use client";
async function noCors(
  input: string,
  init?: RequestInit | undefined
): Promise<any> {
  let url = "/api/" + input.split(":").join("__").replace("//", "/");  
  if (!init) {   
    const resp = await fetch(url);
    const data = await resp.json();  
    if (data.results) {    
      return data.results;
    } 
    return data;
  } else {    
    const resp = await fetch(url, init);
    const data = await resp.json();    
    if (data.results) {     
      return data.results;
    } 
    return data;
  }

}

export default noCors;
