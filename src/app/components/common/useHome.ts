/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

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


  return { error, data, setData };
}

export default usePageHome;
