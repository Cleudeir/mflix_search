"use client";
import React, { Suspense } from "react";
import Card from "./Card";
import usePageHome from "./usePage";
import Link from "next/link";
import Header from "./Header";

export const metaData = {
  title: "movie",
};
interface Props {
  params: {
    type: "movie" | "tv";
  };
}

export default function Home({ params }: Props): JSX.Element {

 const {data, type, input, setInput, dataFilter} = usePageHome(params)
  return (
    <div className="min-h-screen">
    <Header dataFilter={dataFilter} type={type} input={input} setInput={setInput}/>
    <div className="flex flex-row flex-wrap justify-center items-center bg-slate-700 w-full min-h-screen p-1">
      {data &&
        data.map((item: any) => {
          console.log(item)
          return (
            <Suspense  key={item.url}>
              {/* @ts-expect-error Server Component */} 
              <Card item={item} type={type} />
            </Suspense>
          );
        })}
    </div>
    </div>
  );
}
