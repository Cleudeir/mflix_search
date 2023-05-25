import Home from "./Home";
interface Props {
  params: {
    type: "movie" | "tv";
  };
}
export default async function HomePage({
  params,
}: Props): Promise<JSX.Element> {
  const type = params.type;
  console.log(params);
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
      cache:"no-cache"      
    }
  )
  const trending = await resp2.json()
  //console.log('trending: ', trending);

  return (<Home save={trending} type={type} />);
}
