"use client";
import { useEffect, useState } from "react";
import noCors from "@/utils/noCors";
import { Movie } from "@/app/interfaces/Movie";
import { Tv } from "@/app/interfaces/Tv";
import Link from "next/link";
import usePageVideo from "./usePage";
import Loading from "../../loading";

export interface episode {
  id: number;
  url: string;
  name?: string;
}

export default function Video({ params }): JSX.Element {
  const { episode, episodes, item, type, setIndex, index } =
    usePageVideo(params);
  if (!episode && !item) {
    return <Loading />;
  }
  return (
    episode &&
    item && (
      <div
        className={`flex flex-col items-center justify-center w-screen h-screen font-bold  text-xs `}
      >
        <div
          className={`flex flex-row items-center justify-center z-40 text-shadow bg-white bg-opacity-50 rounded-md p-2 mb-[-70px] text-white `}
        >
          <Link href={`${type}`}>
            <button
              type="button"
              className="cursor-pointer h-10 w-12 mx-2 bg-gray-700 text-white font-bold rounded-md"
            >
              Home
            </button>
          </Link>
          <div className="mx-2 text-gray-900  uppercase px-2 py-1">
            {item.title}
          </div>
          { type === 'tv' ?
            <div className="flex flex-row">            
              <select
                className="text-center h-10 w-12 mx-2 bg-gray-700 text-white  rounded-md  cursor-pointer "
                value={index}
                name="select"
                onChange={(e) => {
                  setIndex(Number(e.target.value));
                }}
              >
                {episodes?.map((_item, key) => (
                  <option key={key} value={_item.id}>
                    {_item.name || _item.id + 1}
                  </option>
                ))}
              </select>
            

            <button
              type="button"
              className="cursor-pointer h-10 w-12 mx-2 text-white bg-gray-700 font-bold rounded-md"
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
              className="cursor-pointer h-10 w-12 text-white bg-gray-700 font-bold rounded-md"
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
