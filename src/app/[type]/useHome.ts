/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import noCors from "@/utils/noCors";
import { useEffect, useState } from "react";


function usePageHome(type: "movie" | "tv") {
  const [data, setData] = useState<null | any[]>(null);
  const [save, setSave] = useState<null | any[]>(null);
  const [input, setInput] = useState<string>("");

  async function dataFilter(
    mode: "category" | "popular",
    param?: string | number
  ): Promise<void> {
    setData(null)
    let url;
    if (mode === "category") {
      url = `https://api.themoviedb.org/3/discover/${type}?api_key=5417af578f487448df0d4932bc0cc1a5&language=pt-BR&with_genres=${param}&sort_by=popularity.desc&page=`;
    } else if (mode === "popular") {
      url = `https://api.themoviedb.org/3/${type}/popular?api_key=5417af578f487448df0d4932bc0cc1a5&language=pt-BR&page=`;
    }

    let PromiseTrending = await Promise.all([
      noCors(url + "1"),
      noCors(url + "2"),
      noCors(url + "3"),
      noCors(url + "4"),
      noCors(url + "5"),
      noCors(url + "6"),
      noCors(url + "7"),
      noCors(url + "8"),
      noCors(url + "9"),
      noCors(url + "10"),
    ]);
    const trending = PromiseTrending.flat();
    let trendingTitle: any[];
    if (type === "movie") {
      trendingTitle = trending.map((item: any) =>
        item.title.replace(/[^\w\s]/gi, "").toLowerCase()
      );
    } else if (type === "tv") {
      trendingTitle = trending.map((item: any) =>
        item.name.replace(/[^\w\s]/gi, "").toLowerCase()
      );
    }
    const isData = save;
    const dataFilter = isData?.filter((item: any) =>    
      trendingTitle.includes(item.title.toLowerCase())
    );   
    if(dataFilter) setTimeout(()=>setData(dataFilter),50);    
  }

  useEffect(() => {
    async function start() {
      let url = `${process.env.NEXT_PUBLIC_BACK_URL}/map/${type}`;
      const respMap = await noCors(url);
      if(!respMap.error){
        setSave(respMap);
      }      
    }
    if (type) {
      start();
    }
  }, []);

  useEffect(() => {
    async function start() {
      if (save !== null) {
        const mode = "popular";
        await dataFilter(mode);      
      }
    }
    if (type) {
      start();
    }
  }, [save]);

  useEffect(() => {
    async function start() {
      if (save) {
        const filter = save.filter((x: any) =>
          x.title.toLowerCase().includes(input.toLowerCase())
        );
        setData(filter.slice(0, 30));
      }
    }
    start();  
  }, [input]);

  return { data, input, setData, setInput, dataFilter };
}

export default usePageHome;
