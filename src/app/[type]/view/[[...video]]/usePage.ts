/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Movie } from "@/app/interfaces/Movie";
import { Tv } from "@/app/interfaces/Tv";
import noCors from "@/utils/noCors";
import { useEffect, useState } from "react";

interface Props {
  type: "movie" | "tv";
  video: [id: string, url: string];
}
function usePageVideo(params: Props) {
  const [episodes, setEpisodes] = useState<any[] | null>(null);
  const [episode, setEpisode] = useState<any>(null);
  const [index, setIndex] = useState(0);

  const { type, video } = params;
  const [id, url] = video;
  let item: Tv | Movie | undefined;
  if (type === "movie") {
    item = urlTransformMovie(url, id);
  } else if (type === "tv") {
    item = urlTransformTv(url, id);
  }

  useEffect(() => {
    async function start() { 
      if (type === "movie") {
        const movie = await noCors(
          `${process.env.NEXT_PUBLIC_BACK_URL}/info/${type}`,
          {
            method: "POST",
            body: JSON.stringify(item),
          }
        );  
        setEpisode(movie);
      } else if (type === "tv") {
        let _episodes = await noCors(
          `${process.env.NEXT_PUBLIC_BACK_URL}/list/${type}`,
          {
            method: "POST",
            body: JSON.stringify(item),
          }
        );
        setEpisodes(_episodes);
        const _item = _episodes[index];
        const _episode = await noCors(
          `${process.env.NEXT_PUBLIC_BACK_URL}/info/${type}`,
          {
            method: "POST",
            body: JSON.stringify(_item),
          }
        );
        setEpisode(_episode);
      }
    }
    if (item && id && url) {
      start();
    }
  }, []);

  useEffect(() => {
    async function change() {
      if (episodes) {    
        const _item = episodes[index];
        const _episode = await noCors(
          `${process.env.NEXT_PUBLIC_BACK_URL}/info/${type}`,
          {
            method: "POST",
            body: JSON.stringify(_item),
          }
        );
        setEpisode(_episode);
      }
    }
    change();
  }, [index]);

  return { episode,setEpisode, episodes, type, item, index, setIndex };
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
  };
  return obj;
}
