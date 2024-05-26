/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { Loading } from '@/app/components/common/loading';

export interface categoryProps {
  genreId: number;
  type: "movie" | "tv";
}

function usePageHome(type: "movie" | "tv", save: any[], all: any[]) {
  const [data, setData] = useState<null | any[]>(null);
  const [Loading, setLoading] = useState<boolean>(false);
 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setData(save)
  }, [])

  const request = async (item: string) => {
    try {
      const url = `/api/tmdb/${type}`  
      const resp2 = await fetch(url,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          item
        }),
        next: { revalidate: 24 * 1 * 60 },
      }
    )
    const data = await resp2.json()
    return data
    } catch (error) {
      console.error(error)
    }
   
  };

 async function search(input: any) {    

    if(Loading) return  
    if (input !== '') {
      if (all) {
        const filter = all.filter((x: any) =>
          x.title.toLowerCase().includes(input.toLowerCase())
        );
        const slice = filter.slice(0, 10)
        const requests = slice.map((x: any) => request(x))
        setLoading(true)
        const promises = await Promise.all(requests) 
       
        if (slice.length > 0) {
          setError(null)                 
          setData(promises);
          
        } else {
          setError("Nada Encontrado!")
        }
        setLoading(false)
      }
    }else{
      setData(save)
    }
  }

  return { error, data, setData, search };
}

export default usePageHome;
