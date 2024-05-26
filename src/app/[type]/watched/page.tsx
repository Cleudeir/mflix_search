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
  const [all, setAll] = useState(null)
  const type = params.type;

  const start = async () => {
    const remember = localStorage.getItem(`${type}_watched`)
    if (remember) {
      const save = await JSON.parse(remember).slice(-10)
      setSave(save)
    } else {
      router.push(`/${type}`)
    }

    const rememberAll = localStorage.getItem(`${type}_all`)
    if (rememberAll) {
      const _all = await JSON.parse(rememberAll)
      setAll(_all)
    }else{
      router.push(`/${type}`)
    }
  }
  useEffect(() => {
    start()
  }, [params, router, type])

  return (isSave && all && <HomePage save={isSave} all={all} type={type} />)

}
