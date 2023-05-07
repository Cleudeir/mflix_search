"use client";
import React, { Suspense, useEffect, useState } from "react";
import Card from "./Card";
import { Tv } from "../interfaces/Tv";
import { Movie } from "../interfaces/Movie";
import noCors from "@/utils/noCors";
import usePage from "./usePage";

export const metadata = {
  title: "movie",
};
interface Props {
  params: {
    type: "movie" | "tv";
  };
}

export default function Home({ params }: Props): JSX.Element {
  
 const {data, type} = usePage(params)
  return (
    <>
    <div className="flex flex-row flex-wrap justify-center items-center bg-purple-300 w-full h-16">
        <input type="text" className="p-2 rounded-lg w-80" placeholder="Buscar"/>
      </div>
    <div className="flex flex-row flex-wrap justify-center items-center bg-slate-900 w-full min-h-screen">
      
      {data &&
        data.map((item: any) => {
          console.log(item)
          return (
            <Suspense key={item.url}>
              <Card item={item} type={type} />
            </Suspense>
          );
        })}
    </div>
    </>
  );
}
