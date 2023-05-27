"use client";
import Link from "next/link";
import usePageVideo from "./usePage";
import Loading from "../../../components/common/loading";
import { Dropdown } from "react-bootstrap";

export interface episode {
  id: number;
  url: string;
  name?: string;
}

export interface Props {
  params: any;
}

export default function Video({ params }: Props): JSX.Element | null | undefined {
  const { episode, setEpisode, episodes, item, type, setIndex, index } =
    usePageVideo(params);
  if (!episodes) {
    return (
      <div className="bg-slate-700 w-screen h-screen">
        <Loading />
      </div>
    )
  }

  return (
    episodes && item && (
      <div
        className={`bg-slate-700 flex av flex-col portrait:rotate-90 portrait:w-[100vh] portrait:h-[100vw] portrait:mt-[-100vw] object-cover origin-bottom-left items-center justify-center w-screen h-screen font-bold text-xs `}
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
              <Dropdown >
                <Dropdown.Toggle  variant="success" id="dropdown-basic">
                {episodes.filter(x=> x.id === index)[0].name}
                </Dropdown.Toggle>                
                <Dropdown.Menu  className="!min-w-full portrait:!min-h-full overflow-auto portrait:!max-h-[50vw] !max-h-[50vh]">
                  {episodes &&
                    episodes.map((_item, key) => (
                      <Dropdown.Item  key={key} onClick={() => {
                        setEpisode(null)
                        setIndex(Number(_item.id));
                      }}>
                        {_item.name || _item.id + 1}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
               
              </Dropdown>

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
