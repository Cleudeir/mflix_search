"use client";
import React, { Suspense } from "react";
import Card from "./Card";
import usePageHome from "./useHome";
import Header from "./Header";
import Loading from "./loading";

interface Props {
  type: "movie" | "tv";
  save: any[];
}

export default function HomePage({ type, save }: Props): JSX.Element {
  const { error, data, setData, search } = usePageHome(
    type,
    save
  );

  return (
    <div className="min-h-screen bg-slate-700">     
        <Header          
          type={type}
          search={search}
        />      
      <div className="flex flex-row flex-wrap justify-center items-center  w-full p-1 min-h-[calc(100vh-54px)]">
        <Suspense fallback={<Loading />}>
          {!error && data &&
            data.map((item: any, index: number) => {
              return (
                <div key={item.id + index+ item.url} onClick={() => setData(null)}>
                  {/* @ts-expect-error Server Component */}
                  <Card item={item} type={type} />
                </div>
              );
            })}
          {error && <h2 className="text-white">{error}</h2>}
        </Suspense>
        {!data && !error && <Loading />}
      </div>
    </div>
  );
}
