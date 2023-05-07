"use client";
import noCors from "@/utils/noCors";
import { useEffect, useState } from "react";

interface Props {
  type: "movie" | "tv";
}
function usePageHome(params: Props) {
  const type = params.type;
  const [data, setData] = useState<null | any[]>(null);
  useEffect(() => {
    async function start() {
      const url = `${process.env.NEXT_PUBLIC_BACK_URL}/map/${type}`;
      console.log(url);
      const respMapMovie = await noCors(url);
      console.log(respMapMovie);
      if (respMapMovie !== null) {
        const slice = await respMapMovie.slice(0, 100);
        console.log(slice);
        setData(slice);
      }
    }
    if (type) {
      start();
    }
    console.log(type);
  }, []);

  return { data, type };
}

export default usePageHome;
