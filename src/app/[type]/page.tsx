import HomePage from "../components/common/HomePage";

interface Props {
  params: {
    type: "movie" | "tv";
  };
}
export default async function HomeDefault({
  params,
}: Props): Promise<JSX.Element> {
  const type = params.type;
  const resp = await fetch(`${process.env.BACK_URL}/all/${type}`,
  {
    method: "GET",   
     next: { revalidate: 10 * 60 },

  }
  )
  const all = await resp.json()
  const resp2 = await fetch(`${process.env.BACK_URL}/tmdb/popular/${type}`,
  {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type
    }),
     next: { revalidate: 10 * 60 },

  }
  )

  const trending = await resp2.json()
  return (<HomePage save={trending} all={all} type={type} />);
}
