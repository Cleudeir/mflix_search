"use client";
import Link from "next/link";
import usePageVideo from "./usePage";
import Loading from "../../../../components/loading";

export interface episode {
  id: number;
  url: string;
  name?: string;
}

export interface Props {
  params: any;
}

export default function Video({ params }: Props): JSX.Element  | null | undefined {
  const { episode,setEpisode, episodes, item, type, setIndex, index } =
    usePageVideo(params);
    if( !episodes){
      return (
      <div className="bg-slate-700 w-screen h-screen">
        <Loading />
      </div>
      )
    }
   
  return (
    episodes && item && (
      <div
        className={`bg-slate-700 flex flex-col items-center justify-center w-screen h-screen font-bold  text-xs `}
      >
        <div
          className={`flex flex-row items-center justify-center z-40 text-shadow bg-white bg-opacity-50 rounded-md p-2 mb-[-55px] text-white `}
        >
          <Link href={`${type}`}>
            <button
              type="button"
              className="cursor-pointer h-10 w-12 mx-2 bg-gray-700 text-white font-bold rounded-md"
            >
              Home
            </button>
          </Link>
          <div className="mx-2 text-gray-900  uppercase px-2 py-1">
            {item.title}
          </div>
          {type === "tv" ? (
            <div className="flex flex-row">
              <select
                className="text-center h-10 w-18 mx-2 bg-gray-700 text-white  rounded-md  cursor-pointer "
                value={index}
                name="select"
                onChange={(e) => {
                  setEpisode(null)
                  setIndex(Number(e.target.value));
                }}
              >
                {episodes &&
                  episodes.map((_item, key) => (
                    <option key={key} value={_item.id}>
                      {_item.name || _item.id + 1}
                    </option>
                  ))}
              </select>

              <button
                type="button"
                className="cursor-pointer h-10 w-12 mx-2 text-white bg-gray-700 font-bold rounded-md"
                onClick={() => {
                  if (index > 0) {
                    setEpisode(null)
                    setIndex(index - 1);
                  }
                }}
              >
                Return
              </button>
              <button
                type="button"
                className="cursor-pointer h-10 w-12 text-white bg-gray-700 font-bold rounded-md"
                onClick={() => {
                  if (episodes && index < episodes.length - 1) {
                    setEpisode(null)
                    setIndex(index + 1);
                  }
                }}
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {episode && (             
          <iframe
            frameBorder={0}
            src={episode.url}
            allowFullScreen={false}
            className="w-screen h-screen"
          />       
        )}
        {!episode && (
          <div className="bg-slate-700 w-screen h-screen">
            <Loading />
          </div>
        )}
      </div>
    )
  );
}
