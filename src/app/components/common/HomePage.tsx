"use client";
import React, { Suspense } from "react";
import Card from "./Card";
import usePageHome from "./useHome";
import Header from "./Header";
import Loading from "./loading";
import { usePathname } from "next/navigation";

interface Props {
  type: "movie" | "tv";
  save: any[];
  all: any[]
}

export default function HomePage({ type, save , all}: Props): JSX.Element {
  
  const pathname = usePathname()
  const { error, data, setData, search } = usePageHome(
    type,
    save,
    all
  );

  const onClick = (item: any) => {
    let list;
    const remember = localStorage.getItem(String(`${type}_watched`))
    if (remember) {
      list = JSON.parse(remember)
      const exists = list.find((x: any) => x.id === item.id)
      localStorage.setItem(String(`${type}_all`), JSON.stringify(all))
      if (!exists) {
        localStorage.setItem(String(`${type}_watched`), JSON.stringify([item, ...list]))        
      }
    } else {
      localStorage.setItem(String(`${type}_watched`), JSON.stringify([item]))
    }
    localStorage.setItem(String(`page`), pathname)
    setData(null)
  }

  return (
    <div className="min-h-screen bg-slate-700">
      <Header
        type={type}
        search={search}
      />
      <div className="flex flex-row flex-wrap justify-center items-center  w-full p-1 min-h-[calc(100vh-54px)]">
        <Suspense fallback={<Loading />}>
          {!error && data &&
            data.map((item: any, index: number) =>(
            <div key={item.id + index + item.url} onClick={() => onClick(item)}>
                  {/* @ts-expect-error Server Component */}
                  <Card item={item} type={type} />
                </div>
              )
            )}
          {error && <h2 className="text-white">{error}</h2>}
        </Suspense>
        {!data && !error && <Loading />}
      </div>
    </div>
  );
}
