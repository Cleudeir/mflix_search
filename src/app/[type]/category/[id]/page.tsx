import HomePage from '../../../components/common/HomePage'
interface Props {
  params: {
    id: string;
    type: "movie" | "tv";
  };
}
export default async function HomeCategory({
  params,
}: Props): Promise<JSX.Element> {
  const type = params.type;
  const genreId = params.id;
  console.log('params: ', params);
  const resp2 = await fetch(`${process.env.BACK_URL}/tmdb/popular/${type}`,
  {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type,
      genreId
    })     
  }
)
const trending = await resp2.json()
console.log('trending: ', trending);
  return (<HomePage save={trending} type={type} />);
}
