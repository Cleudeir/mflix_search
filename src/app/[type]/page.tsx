"use client";
import React, { Suspense } from "react";
import Card from "./Card";
import usePageHome from "./usePage";
import Loading from "./loading";
import Link from "next/link";

export const metadata = {
  title: "movie",
};
interface Props {
  params: {
    type: "movie" | "tv";
  };
}

export default function Home({ params }: Props): JSX.Element {

 const {data, type} = usePageHome(params)
  return (
    <>
    <div className="flex flex-row flex-wrap justify-center items-center bg-slate-700 w-full p-1">
      <div className="mx-1 my-2">
      <Link className={`${type === 'tv' ? "bg-green-300 text-gray-900" : "bg-slate-900" } py-3 px-4 m-1 rounded-lg hover:bg-opacity-50`} href={'/tv'}>Series</Link>
      <Link className={`${type === 'movie' ? "bg-green-300 text-gray-900" : "bg-slate-900" } py-3 px-4 m-1 rounded-lg hover:bg-opacity-50`} href={'/movie'}>Movie</Link>
      </div>     
      <input type="text" className="mx-1 my-2 p-3 rounded-lg text-center" placeholder="Buscar"/>
      </div>
    <div className="flex flex-row flex-wrap justify-center items-center bg-slate-900 w-full min-h-screen">
      
      {data &&
        data.map((item: any) => {
          console.log(item)
          return (
            <Suspense fallback={<div className="w-80 h-64"><Loading /></div>} key={item.url}>
              <Card item={item} type={type} />
            </Suspense>
          );
        })}
    </div>
    </>
  );
}
