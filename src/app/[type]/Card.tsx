/* eslint-disable @next/next/no-img-element */
import { Tv } from "@/app/interfaces/Tv";
import { Movie } from "../interfaces/Movie";
import Link from "next/link";

interface Props {
  item: Tv | Movie;
  type: "movie" | "tv";
}

async function Card({ item, type }: Props): Promise<JSX.Element | null> {
  const url = `https://api.themoviedb.org/3/search/${type}?include_adult=false&page=1&language=pt-BR&api_key=5417af578f487448df0d4932bc0cc1a5&query=${item.title}&year=${item.year}`;

  const resp = await fetch(url, { next: { revalidate: 60 } });
  const json = await resp.json();
  const data = json.results[0];
  if (!data) {
    return null;
  }  
  const newLocal: number = data?.overview?.length || 0;
  return (
    data && (
      <Link
        href={"/" + type + "/view/" + data.id + item.url.replace(".html", "")}
      >
        <div className="group relative flex-col items-center justify-start p-0 m-1 max-w-[97vw] w-96 h-64 rounded-lg text-black  bg-gray-300 shadow transition-all duration-300 scale-95 hover:scale-100 border-2">
          <img
            className="w-full h-full object-cover object-center rounded-lg"
            src={
              "https://image.tmdb.org/t/p/w500" +
              String(data.backdrop_path || data.poster_path)
            }
            alt={data.url}
          />
          <div className="w-full max-h-full absolute bottom-0 text-justify left-0 transition-all duration-300 rounded-lg bg-black text-white bg-opacity-90 text-ellipsis overflow-hidden ">
            <div className="flex flex-row justify-between  px-4 py-1 text-shadow  bg-opacity-30 font-bold">
              <div>{data.title || data.name}</div>
              <div>⭐{Math.round(data.vote_average * 10) / 10}</div>
            </div>
            <div
              className="hidden h-80 group-hover:block group-hover:transition-all group-hover:duration-300
             transition-all duration-300 text-base p-3 text-justify font-light"
            >
              {newLocal > 630
                ? `${data?.overview?.slice(0, 630)}...`
                : data.overview}
            </div>
          </div>
        </div>
      </Link>
    )
  );
}

export default Card;
