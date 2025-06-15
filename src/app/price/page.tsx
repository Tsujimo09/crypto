'use client';
import { URL } from '@/Utility/URL';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';



export default function Price() {
  const [list, setList] = useState<Pair[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL.AIP.GET_PRICE);
        const data: Pair[] = response.data.cryptoList;

        setList(data);
      } catch (error) {
        console.log('APIの取得に失敗しました。', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-8 flex justify-center">
      <div className="w-full max-w-xl space-y-2">
        {list.map((item, index) => (
          <div key={index} className="glassListBlue flex items-center rounded border p-2">
            <Image src={`/crypto/${item.pair}.svg`} alt="crypto" className="mx-4" width={32} height={32} />
            <strong className="mr-2">{item.pair.toUpperCase()}</strong> <p>¥{item.last.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
