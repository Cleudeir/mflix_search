'use client'
import Loading from '@/app/components/common/loading';
import HomePage from '../../components/common/HomePage'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
interface Props {
  params: {
    id: string;
    type: "movie" | "tv";
  };
}
export default function HomeWatched({
  params,
}: Props): JSX.Element | null {
  const router = useRouter()
  const [isSave, setSave] = useState(null)
  const type = params.type;
  useEffect(() => {   
    console.log('params: ', params);
    const remember = localStorage.getItem(`${type}_watched`)
    console.log(`${type}_watched`, remember);
    if (remember) {
      const save = JSON.parse(remember).slice(-10)
      console.log('trending: ', save);
      setSave(save)
    }else{
      router.push(`/${type}`)
    }
  }, [params, router, type])

  return (isSave && <HomePage save={isSave} type={type} />) 

}
