/* eslint-disable @next/next/no-img-element */
import { Tv } from "@/app/interfaces/Tv";
import { Movie } from "../interfaces/Movie";
import Link from "next/link";

interface Props {
  item: Tv | Movie;
  type: "movie" | "tv";
}

async function Card({ item, type }: Props): Promise<JSX.Element | null> {
  const newLocal: number = item?.overview?.length || 0;
  console.log('item: ', item);
  return (
    item && (
      <Link
        href={"/" + type + "/view/" + item.id + item.url.replace(".html", "")}
      >
        <div className="group relative flex-col items-center justify-start p-0 m-1 max-w-[97vw] w-96 h-64 rounded-lg text-black  bg-gray-300 shadow transition-all duration-300 scale-95 hover:scale-100 border-2">
          <img
            className="w-full h-full object-cover object-center rounded-lg"
            src={imagePath(item)
            }
            alt={item.url}
          />
          <div className="w-full max-h-full absolute bottom-0 text-justify left-0 transition-all duration-300 rounded-lg bg-black text-white bg-opacity-90 text-ellipsis overflow-hidden ">
            <div className="flex flex-row justify-between gap-4  px-4 py-1 text-shadow  bg-opacity-30 font-bold">
              <div>{item.title || item.original_title || item.original_name}</div>
              <div>⭐{Math.round(item.vote_average * 10) / 10}</div>
            </div>
            <div
              className="hidden h-80 group-hover:block group-hover:transition-all group-hover:duration-300
             transition-all duration-300 text-base p-3 text-justify font-light"
            >
              {newLocal > 630
                ? `${item?.overview?.slice(0, 630)}...`
                : item.overview}
            </div>
          </div>
        </div>
      </Link>
    )
  );
}

export default Card;

function imagePath(item: any): string | undefined {
  let imagePath;
  if (item.backdrop_path) {
    imagePath = "https://image.tmdb.org/t/p/w780" + String(item.backdrop_path);
  } else if (item.poster_path) {
    imagePath = "https://image.tmdb.org/t/p/w500" + String(item.poster_path);
  } else {
    imagePath = "https://img.freepik.com/free-photo/top-view-cinema-elements-red-background-with-white-frame_23-2148457849.jpg?w=500";
  }
  return imagePath
}

