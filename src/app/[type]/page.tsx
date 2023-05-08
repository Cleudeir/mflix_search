"use client";
import React, { Suspense } from "react";
import Card from "./Card";
import usePageHome from "./usePage";
import Link from "next/link";
import Header from "./Header";
import Loading from "../loading";

interface Props {
  params: {
    type: "movie" | "tv";
  };
}

export default function Home({ params }: Props): JSX.Element {
  const { data, setData, type, input, setInput, dataFilter } =
    usePageHome(params);

  return (
    <div className="min-h-screen bg-slate-700">
      <Header
        dataFilter={dataFilter}
        type={type}
        input={input}
        setInput={setInput}
      />
      <div className="flex flex-row flex-wrap justify-center items-center  w-full p-1 min-h-[calc(100vh-54px)]">
        {data &&
          data.map((item: any) => {
            return (
              <Suspense key={item.url}>
                <div onClick={() => setData(null)}>
                  {/* @ts-expect-error Server Component */}
                  <Card item={item} type={type} />
                </div>
              </Suspense>
            );
          })}
        {!data && <Loading />}
      </div>
    </div>
  );
}
