/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Movie } from "@/app/interfaces/Movie";
import { Tv } from "@/app/interfaces/Tv";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import noCors from "@/app/utils/noCors";

interface Props {
  type: "movie" | "tv";
  video: [id: string, url: string];
}
function usePageVideo(params: Props) {
  const route = useRouter()
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
          `/info/${type}`,
          {
            method: "POST",
            body: JSON.stringify(item),
          }
        );  
        if (movie.error) {
          return route.push(`/${type}`)
        }
        setEpisodes([movie]);
        setEpisode(movie);
      } else if (type === "tv") {
        let _episodes = await noCors(
          `/list/${type}`,
          {
            method: "POST",
            body: JSON.stringify(item),
          }
        );
        if (_episodes.error) {
          return route.push(`/${type}`)
        }
        setEpisodes(_episodes);
        let _index;
        const remember = localStorage.getItem(String(type + item?.id))
        if (remember) {
          _index = Number(remember)
          setIndex(_index)
        } else {
          _index = index          
        }
        const _item = _episodes[_index];
        const _episode = await noCors(
          `/info/${type}`,
          {
            method: "POST",
            body: JSON.stringify(_item),
          }
        );
        if (_episode.error) {
          return route.push(`/${type}`)
        }
        setEpisode(_episode);
        const _item2 = _episodes[_index + 1];
        await noCors(
          `/info/${type}`,
          {
            method: "POST",
            body: JSON.stringify(_item2),
          }
        );
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
          `/info/${type}`,
          {
            method: "POST",
            body: JSON.stringify(_item),
          }
        );
        setEpisode(_episode);
        localStorage.setItem(String(type + item?.id), String(index))
      }
    }
    change();
  }, [index]);

  return { episode, setEpisode, episodes, type, item, index, setIndex };
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
