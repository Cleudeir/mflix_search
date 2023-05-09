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
  const url = `${process.env.NEXT_PUBLIC_BACK_URL}/map/${type}`;
  console.log(url);
  const resp = await fetch(url);
  const save = await resp.json();
  console.log("save: ", save.length);

  return (<Home save={save} type={type} />);
}
