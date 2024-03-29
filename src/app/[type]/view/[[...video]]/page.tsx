"use client";
import Link from "next/link";
import usePageVideo from "./usePage";
import Loading from "../../../components/common/loading";
import { Dropdown, Form } from "react-bootstrap";

export interface episode {
  id: number;
  url: string;
  name?: string;
}

export interface Props {
  params: any;
}

export default function Video({
  params,
}: Props): JSX.Element | null | undefined {
  const { episode, setEpisode, episodes, item, type, setIndex, index } =
    usePageVideo(params);
  if (!episodes) {
    return (
      <div className="bg-slate-700 w-screen h-screen">
        <Loading />
      </div>
    );
  }
  const styleButton =
    "cursor-pointer h-[34px] w-[52px] ml-1 bg-gray-700 text-white font-bold rounded-sm";

  return (
    episodes &&
    item && (
      <div
        className={`
        group flex bg-slate-700  flex-col portrait:rotate-90 items-center justify-center w-screen h-screen font-bold text-xs 
        portrait:w-[100vh] portrait:h-[100vw] portrait:overflow-hidden portrait:mt-[-100vw] origin-bottom-left
        max-w-[100vw] max-h-[100vh]
        portrait:max-h-[100vw] portrait:max-w-[100vh]
        `}
      >
        <div
          className={`
          absolute
          top-0
          hover:opacity-80 opacity-30 transition-opacity flex flex-row 
          items-center justify-center z-40 text-shadow bg-white bg-opacity-50 
          rounded-sm p-2 text-white 
          `}
        >
          <Link href={localStorage.getItem("page") || `${type}`}>
            <button type="button" className={styleButton}>
              Home
            </button>
          </Link>

          {type === "tv" ? (
            <div className="flex flex-row flex-nowrap relative ">
              <select
                className="!text-white !bg-gray-700 ml-1 !text-sm !border-gray-700  !rounded-sm"
                value={index}
                onChange={(e: any) => {
                  setEpisode(null);
                  setIndex(Number(e.target.value));
                }}
              >
                {episodes &&
                  episodes.map((_item, key) => (
                    <option
                      key={key}
                      value={_item.id}
                      className="!text-white !min-w-full portrait:!min-h-full !bg-gray-700 "
                    >
                      {_item.name || _item.id + 1}
                    </option>
                  ))}
              </select>

              <button
                type="button"
                className={styleButton}
                onClick={() => {
                  if (index > 0) {
                    setEpisode(null);
                    setIndex(index - 1);
                  }
                }}
              >
                Return
              </button>
              <button
                type="button"
                className={styleButton}
                onClick={() => {
                  if (episodes && index < episodes.length - 1) {
                    setEpisode(null);
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
            className="w-screen h-screen portrait:w-[100vh] portrait:h-[100vw]"
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
