"use client";
import React, { Suspense } from "react";
import Card from "./Card";
import usePageHome from "./useHome";
import Link from "next/link";
import Header from "./Header";
import Loading from "@/components/loading";

interface Props {
  type: "movie" | "tv";
  save: any[];
}

export default function Home({ type, save }: Props): JSX.Element {
  const { data, setData, input, setInput, dataFilter } = usePageHome(
    type,
    save
  );

  return (
    <div className="min-h-screen bg-slate-700">
      <Header
        dataFilter={dataFilter}
        type={type}
        input={input}
        setInput={setInput}
      />
      <div className="flex flex-row flex-wrap justify-center items-center  w-full p-1 min-h-[calc(100vh-54px)]">
        <Suspense>
          {data &&
            data.map((item: any) => {
              return (
                <div key={item.url} onClick={() => setData(null)}>
                  {/* @ts-expect-error Server Component */}
                  <Card item={item} type={type} />
                </div>
              );
            })}
        </Suspense>
        {!data && <Loading />}
      </div>
    </div>
  );
}
