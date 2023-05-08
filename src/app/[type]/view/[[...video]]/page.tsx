"use client";
import { useEffect, useState } from "react";
import noCors from "@/utils/noCors";
import { Movie } from "@/app/interfaces/Movie";
import { Tv } from "@/app/interfaces/Tv";
import Link from "next/link";
import usePageVideo from "./usePage";
import Loading from "../../loading";

export async function generateMetadata({ params }) {
  const [id, url] = params.video;
  console.log("url: ", id, url);
  return {
    title: { url },
  };
}

export interface episode {
  id: number;
  url: string;
  name?: string;
}

export default function View({ params }): JSX.Element {
  const { episode, episodes, item, type, setIndex, index } =
    usePageVideo(params);
  if (!episode && !item) {
    return <Loading />;
  }
  return (
    episode &&
    item && (
      <div
        className={`flex flex-col items-center justify-center w-screen h-screen`}
      >
        <div
          className={`flex flex-row items-center justify-center z-40 text-shadow bg-white bg-opacity-50 rounded-md py-2 px-4 mb-[-50px] text-white text-sm`}
        >
          <Link href={`${type}`}>
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
          { type === 'tv' ?
            <div className="mr-5 flex flex-row">
            <h2>
              <select
                className="h-10 mr-2 bg-gray-700 text-white font-bold rounded-md pl-2 pr-6 cursor-pointer appearance-none"
                value={index}
                name="select"
                onChange={(e) => {
                  setIndex(Number(e.target.value));
                }}
              >
                {episodes.map((_item, key) => (
                  <option key={key} value={_item.id}>
                    {_item.name || _item.id + 1}
                  </option>
                ))}
              </select>
            </h2>

            <button
              type="button"
              className="cursor-pointer h-10 w-20 text-white bg-gray-700 font-bold rounded-md mr-2"
              onClick={() => {
                if(index > 0){
                  setIndex(index - 1);
                }
                
              }}
            >
              Return
            </button>
            <button
              type="button"
              className="cursor-pointer h-10 w-20 text-white bg-gray-700 font-bold rounded-md"
              onClick={() => {
                if(index < episodes?.length -1){
                  setIndex(index + 1);
                }
                
              }}
            >
              Next
            </button>
          </div>
          : ""
          }
        </div>
        {episode && (
          <iframe
            frameBorder={0}
            src={"https://sinalpublico.com" + episode.url}
            allowFullScreen={false}
            className="w-screen h-screen"
          />
        )}
      </div>
    )
  );
}
