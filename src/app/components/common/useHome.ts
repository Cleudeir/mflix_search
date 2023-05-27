/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

export interface categoryProps {
  genreId: number;
  type: "movie" | "tv";
}

function usePageHome(type: "movie" | "tv", save: any[]) {
  const [data, setData] = useState<null | any[]>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    setData(save)
  },[])

  function search(e: any) {
    e.preventDefault()
    const input = e.target.value  
    if (input !== '') {
      if (save) {
        const filter = save.filter((x: any) =>
          x.title.toLowerCase().includes(input.toLowerCase())
        );
        const slice = filter.slice(0, 30)   
        if (slice.length > 0) {
          setError(null)
          setTimeout(() => setData(slice), 50);
        } else {
          setError("Nada Encontrado!")
        }
      }
    }    
  }

  return { error, data, setData, search };
}

export default usePageHome;
