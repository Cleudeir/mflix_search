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
  const styleButton = "cursor-pointer h-[34px] w-[52px] ml-1 bg-gray-700 text-white font-bold rounded-sm"

  return (
    episodes && item && (
      <div
        className={`
        group flex bg-slate-700  flex-col portrait:rotate-90 items-center justify-center w-screen h-screen font-bold text-xs 
        portrait:w-[100vh] portrait:h-[100vw] portrait:overflow-hidden portrait:mt-[-100vw] origin-bottom-left          
        `}

      >
        <div
          className={`
          hover:opacity-80 opacity-20 transition-opacity flex flex-row 
          items-center justify-center z-40 text-shadow bg-white bg-opacity-50 
          rounded-sm p-2 mb-[-55px] text-white 
          `}
        >
          <Link href={localStorage.getItem('page') || `${type}`}>
            <button
              type="button"
              className={styleButton}
            >
              Home
            </button>
          </Link>

          {type === "tv" ? (
            <div className="flex flex-row relative">
              <Dropdown >
                <Dropdown.Toggle className=" !bg-gray-700 ml-1  !text-sm !border-gray-700  !rounded-sm" id="dropdown-basic">
                  {episodes.filter(x => x.id === index)[0].name}
                </Dropdown.Toggle>
                <Dropdown.Menu className="!min-w-full  portrait:!min-h-full overflow-auto portrait:!max-h-[50vw] !max-h-[50vh]">
                  {episodes &&
                    episodes.map((_item, key) => (
                      <Dropdown.Item key={key} onClick={() => {
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
                className={styleButton}
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
                className={styleButton}
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
