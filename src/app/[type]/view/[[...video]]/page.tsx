"use client";
import { useEffect, useState } from "react";
import noCors from "@/utils/noCors";
import { Movie } from "@/app/interfaces/Movie";
import { Tv } from "@/app/interfaces/Tv";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const [id, url] = params.video;
  console.log("url: ", url);
  return {
    title: { url },
  };
}

export interface episode {
  id: number;
  url: string;
  name?: string;
}

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

export default function View({ params }): JSX.Element {
  const [data, setData] = useState<episode | null>(null);
  const [selectValue, setSelectValue] = useState(0);

  const { type, video } = params;
  const [id, url] = video;
  let item: Tv | Movie;
  if (type === "movie") {
    item = urlTransformMovie(url, id);
  } else if (type === "tv") {
    item = urlTransformTv(url, id);
  }
  console.log(params);
  console.log(item);

  useEffect(() => {
    async function start() {
      const resp = await noCors(
        `${process.env.NEXT_PUBLIC_BACK_URL}/api/info${
          type[0].toLocaleUpperCase() + type.slice(1)
        }`,
        {
          method: "POST",
          body: JSON.stringify({ item }),
        }
      );
      console.log(resp);
      setData(resp);
    }
    if(item && id && url){
      start();
    }
    
  }, []);

  

  useEffect(() => {
    if (!item.episodes) {
     fetch(`/api/delete`, {
      method: 'DELETE',
      body: JSON.stringify({ item, type: 'Tv' }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
     })
     setTimeout(() => {
      window.location.href = '/series'
     }, 3000)
    }
  
    if (item.episodes) {
     const storage = localStorage.getItem(String(item.id))
     if (storage !== 'null' && storage !== null) {
      const item = JSON.parse(storage)
      setData(item)
      setSelectValue(item.id)
     } else {
      void (async () => {
       let _item = item.episodes[0]
       const _video = await getInfo({ item: _item })
       setData(_video)
       _item = item.episodes[1]
       await getInfo({ item: _item })
      })()
     }
    }
   }, [item])

   
  async function changeIndex(e: number, id?: number): Promise<void> {
    /*
    if (item.episodes && data) {
      setData(null);
      let _id = data.id;
      if (id !== undefined) {
        _id = id;
      }
      let _index = _id + e;
      const episodesLength = item.episodes.length;
      if (_index >= episodesLength - 1) {
        _index = episodesLength - 1;
      }
      if (_index < 0) {
        _index = 0;
      }
      setSelectValue(_index);
      const _item = item.episodes[_index];
      const _video = await getInfo({ item: _item });
      localStorage.setItem(String(item.id), JSON.stringify(_video));
      setData(_video);
      _index = _index + 1;
      if (_index < episodesLength - 1) {
        const nextItem = item.episodes[_index];
        await getInfo({ item: nextItem });
      }
    }
    */
  }

  return (
    <div
      className={` flex flex-col items-center justify-center w-full h-screen`}
    >
      <div
        className={` flex flex-row items-center justify-center z-1 text-shadow bg-white bg-opacity-50 rounded-md py-2 px-4 mb-[-50px] text-white text-sm`}
      >
        <Link href="/series">
          <button
            type="button"
            className="cursor-pointer h-10 w-20 text-white bg-gray-700 font-bold rounded-md mr-5"
          >
            Home
          </button>
        </Link>
        <div className="mr-20">
          <h2 className="uppercase">{item.title || item.name}</h2>
        </div>
        <div className="mr-5">
          <h2>
            <select
              className="h-10 bg-gray-700 text-white font-bold rounded-md pl-2 pr-6 cursor-pointer appearance-none"
              value={selectValue}
              name="select"
              onChange={(e) => {
                changeIndex(0, Number(e.target.value));
              }}
            >
              {item.episodes.map((_item, key) => (
                <option key={key} value={_item.id}>
                  {_item.name || _item.id + 1}
                </option>
              ))}
            </select>
          </h2>
        </div>
        <button
          type="button"
          className="cursor-pointer h-10 w-20 text-white bg-gray-700 font-bold rounded-md mr-5"
          onClick={() => {
            changeIndex(-1);
          }}
        >
          Return
        </button>
        <button
          type="button"
          className="cursor-pointer h-10 w-20 text-white bg-gray-700 font-bold rounded-md"
          onClick={() => {
            changeIndex(1);
          }}
        >
          Next
        </button>
      </div>
      {data && (
        <iframe
          frameBorder={0}
          src={"https://sinalpublico.com" + data.url}
          allowFullScreen={false}
          className="w-full h-full"
        />
      )}
    </div>
  );
}
