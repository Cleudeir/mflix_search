/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import noCors from "@/utils/noCors";
import { useEffect, useState } from "react";
import { isNullishCoalesce } from "typescript";

export interface categoryProps {
  genreId: number;
  type: "movie" | "tv";
}

function usePageHome(type: "movie" | "tv", save: any[]) {
  const [data, setData] = useState<null | any[]>(null);
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  async function convergentes(trending: any[]) {
    let trendingTitle: any[];
    if (type === "movie") {
      trendingTitle = trending.map((item: any) =>
        item.title.replace(/[^\w\s]/gi, "").toLowerCase()
      );
    } else if (type === "tv") {
      trendingTitle = trending.map((item: any) =>
        item.name.replace(/[^\w\s]/gi, "").toLowerCase()
      );
    }
    const dataFilter = save?.filter((item: any) =>
      trendingTitle.includes(item.title.toLowerCase())
    );
    if (dataFilter && dataFilter.length > 0) {
      setError(null)
      setTimeout(() => setData(dataFilter), 50)
    } else {
      setError("Nada Encontrado!")
    }
  }

  async function dataFilter(
    genreId: number
  ): Promise<void> {
    setData(null)
    const item: categoryProps = {
      genreId,
      type
    }
    const trending = await noCors(
      `/tmdb/category`,
      {
        method: "POST",
        body: JSON.stringify(item),
      }
    );
    convergentes(trending)
  }

  async function dataFilterPopular(): Promise<void> {
    setData(null)
    const item = {
      type
    }
    const trending = await noCors(
      `/tmdb/popular`,
      {
        method: "POST",
        body: JSON.stringify(item),
      }
    );
    convergentes(trending)
  }

  useEffect(() => {
    async function start() {
      if (save !== null) {
        await dataFilterPopular();
      }
    }
    if (type) {
      start();
    }
  }, [save]);

  function search() {
    if (input !== '') {
      console.log('input: ', input);
      if (save) {
        const filter = save.filter((x: any) =>
          x.title.toLowerCase().includes(input.toLowerCase())
        );
        const slice = filter.slice(0, 30)
        if (slice.length > 0) {
          setError(null)
          setTimeout(() => setData(slice), 50);
        } else {
          setError("Nada Encontrado!")
        }
      }
    }
  }

  return { error, data, input, setData, setInput, dataFilter, search };
}

export default usePageHome;
