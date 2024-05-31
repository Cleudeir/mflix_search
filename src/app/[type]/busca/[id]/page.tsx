import genres from '@/app/utils/genres';
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
  const input = params.id;

  console.log('-----',input)

  const resp = await fetch(`${process.env.BACK_URL}/all/${type}`,
  {
    method: "GET",   
     next: { revalidate: 10 * 60 },

  }
  )
  const all = await resp.json()

  const request = async (item: string) => {
    try {
      const url = `${process.env.BACK_URL}/tmdb/${type}`  
      const resp2 = await fetch(url,
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          item
        }),
      }
    )
    const data = await resp2.json()
    return data
    } catch (error) {
      console.error(error)
    }
  };
  const filter = all.filter((x: any) =>
    x.title.toLowerCase().includes(input.toLowerCase())
  );
  const slice = filter.slice(0, 20)
  const requests = slice.map((x: any) => request(x))
  const promises = await Promise.all(requests) 
  console.log(promises)
  
  return (<HomePage save={promises} all={all} type={type} />);
}
