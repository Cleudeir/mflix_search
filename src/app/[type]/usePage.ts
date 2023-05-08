/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import noCors from "@/utils/noCors";
import { useEffect, useState } from "react";

interface Props {
  type: "movie" | "tv";
}
function usePageHome(params: Props) {
  const type = params.type;
  const [data, setData] = useState<null | any[]>(null);
  const [save, setSave] = useState<null | any[]>(null);
  const [input, setInput] = useState<string>("");
  useEffect(() => {
    async function start() {
      let url = `${process.env.NEXT_PUBLIC_BACK_URL}/map/${type}`;
      console.log(url);
      const respMap = await noCors(url);
      console.log(respMap);
      if (respMap !== null) {
        // https://api.themoviedb.org/3/discover/movie?api_key=5417af578f487448df0d4932bc0cc1a5&language=pt-BR&with_genres=16&sort_by=popularity.desc&page=1
        const url = `https://api.themoviedb.org/3/${type}/popular?api_key=5417af578f487448df0d4932bc0cc1a5&language=pt-BR&page=`;
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
        const trending = PromiseTrending.flat()
        console.log(trending);
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

        const dataFilter = respMap.filter((item: any) =>
          trendingTitle.includes(item.title.toLowerCase())
        );
        console.log(dataFilter);    
        setData(dataFilter);
        setSave(respMap);
      }
    }
    if (type) {
      start();
    }
    console.log(type);
  }, []);
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
    console.log(input);
  }, [input]);

  return { data, type, input, setInput };
}

export default usePageHome;
