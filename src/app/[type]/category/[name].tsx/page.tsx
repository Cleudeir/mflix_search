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
  const url = `${process.env.BACK_URL}/map/${type}`;
  const resp = await fetch(url,{next:{revalidate:60*60*24}});
  const save = await resp.json();

  return (<Home save={save} type={type} />);
}
