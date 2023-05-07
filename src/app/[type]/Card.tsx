/* eslint-disable @next/next/no-img-element */
import { Tv } from "@/app/interfaces/Tv";

interface Props {
  item: Tv;
  type: "movie" | "tv";
}

async function Card({ item, type }: Props): JSX.Element {
  const resp = await fetch(
    `https://api.themoviedb.org/3/search/${type}?include_adult=false&page=1&language=pt-BR&api_key=5417af578f487448df0d4932bc0cc1a5&query=${item.title}&year=${item.year}`,
    { next: { revalidate: 60 } }
  );
  const json = await resp.json();
  console.log(json);
  const data = json.results[0];
  if (!data) {
    return null;
  }
  console.log(data);
  console.log(
    "https://image.tmdb.org/t/p/w342" +
    String(data.backdrop_path || data.poster_path)
  );

  const newLocal: number = data?.overview?.length || 0;
  return (
    data && (
      <a href={"/" + type + "/view/" + data.id + item.url.replace(".html", "")}>
        <div className="group relative flex-col items-center justify-start p-0 m-1 w-80 h-64 text-black rounded-5 bg-gray-300 shadow transition-all duration-300 scale-95 hover:scale-100 rounded-lg border-2">
          <img
            className="w-full h-full object-cover object-center rounded-lg"
            src={
              "https://image.tmdb.org/t/p/w500" +
              String(data.backdrop_path || data.poster_path)
            }
            alt={data.url}
          />
          <div className="w-full max-h-full absolute bottom-0 left-0 transition-all duration-300 rounded-md bg-black text-white bg-opacity-90 text-ellipsis overflow-hidden ">
            <div className="flex flex-row justify-between  px-4 py-1 text-shadow  bg-opacity-30 font-bold">
              <div>{data.title || data.name}</div>
              <div>⭐{Math.round(data.vote_average*10)/10 }</div>
            </div>
            <div className="hidden h-80 text-ellipsis group-hover:block group-hover:transition-all group-hover:duration-300
            overflow-hidden  transition-all duration-300 text-sm p-5 text-justify font-light">
              <h4>
                {newLocal > 630
                  ? `${data?.overview?.slice(0, 630)}...`
                  : data.overview}
              </h4>
            </div>
          </div>
        </div>
      </a>
    )
  );
}

export default Card;
