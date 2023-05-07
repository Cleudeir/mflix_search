/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Movie } from "@/app/interfaces/Movie";
import { Tv } from "@/app/interfaces/Tv";
import noCors from "@/utils/noCors";
import { useEffect, useState } from "react";

interface Props {
  type: "movie" | "tv";
  video: [id: string, url: string]
}
function usePageVideo(params: Props) {
  const [episodes, setEpisodes] = useState<any[] | null>(null);
  const [selectValue, setSelectValue] = useState(0);

  const { type, video } = params;
  const [id, url] = video;
  let item: Tv | Movie;
  if (type === "movie") {
    item = urlTransformMovie(url, id);
  } else if (type === "tv") {
    item = urlTransformTv(url, id);
  }

  useEffect(() => {   
    async function start() {
        console.log(item);
      const _data = await noCors(
        `${process.env.NEXT_PUBLIC_BACK_URL}/info/${type}`,
        {
          method: "POST",
          body: JSON.stringify(item),
        }
      );
      if (type === "movie") {
        setEpisodes(_data)
      } else if (type === "tv") {
        
      }
      console.log(_data);      
    }
    if (item && id && url) {
      start();
    }
  }, []);

  useEffect(() => {

    if (item.episodes) {

        void (async () => {
          let _item = item.episodes[0];
          const _video = await getInfo({ item: _item });
          setEpisodes(_video);
          _item = item.episodes[1];
          await getInfo({ item: _item });
        })();      
    }
  }, [item]);

  async function getInfo({ item }: { item: episode }): Promise<DataTv | null> {
    try {
     const data = await fetch(`/info/tv`, {
      method: 'POST',
      body: JSON.stringify({ item }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
     })
     const json = await data.json()
     return json
    } catch (error) {
     console.warn(error)
     return null
    }
   }

  async function changeIndex(e: number, id?: number): Promise<void> {
    if (item.episodes && video) {
     setVideo(null)
     let _id = video.id
     if (id !== undefined) {
      _id = id
     }
     let _index = _id + e
     const episodesLength = item.episodes.length
     if (_index >= episodesLength - 1) {
      _index = episodesLength - 1
     }
     if (_index < 0) {
      _index = 0
     }
     setSelectValue(_index)
     const _item = item.episodes[_index]
     const _video = await getInfo({ item: _item })
     localStorage.setItem(String(item.id), JSON.stringify(_video))
     setVideo(_video)
     _index = _index + 1
     if (_index < episodesLength - 1) {
      const nextItem = item.episodes[_index]
      await getInfo({ item: nextItem })
     }
    }
   }

  return { episodes, type, item ,changeIndex, selectValue, setSelectValue};
}

export default usePageVideo;

function urlTransformMovie(url: string, id: string): Movie {
  const [baseArray]: string[] = url.split("-").join(" ").split("_");
  const baseString = baseArray.split(" ");
  const title: string = baseString
    .slice(0, -2)
    .filter((item: string) => item !== "dublado")
    .join(" ");
  const dub: boolean = baseString.includes("dublado");
  const [year, quality]: string[] = baseString.slice(-2);
  return {
    id: Number(id),
    title,
    dub,
    year,
    quality,
    url,
  };
}
function urlTransformTv(url: string, id: string): Tv {
  const [title]: string[] = url
    .replace("browse-", "")
    .split("-")
    .join(" ")
    .split(" videos");
  const obj = {
    id: Number(id),
    url,
    title,
    episodes: [],
  };
  return obj;
}
