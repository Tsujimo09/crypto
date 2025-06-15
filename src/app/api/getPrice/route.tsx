import axios from 'axios';
import { URL } from '@/Utility/URL';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // ビットバンクAPIから通貨の情報を取得
    const response = await axios.get<Pairlist>(`${URL.BITBANK.PUBLIC}/tickers`);
    const data = response.data.data;

    // jpy建の通貨名と現在価格のみを取得する
    const cryptoList = data
      .filter((item) => item.pair.endsWith('_jpy'))
      .map((item) => ({
        pair: item.pair.split('_')[0],
        last: Number(item.last),
      }));

    return NextResponse.json({ cryptoList });
  } catch {
    return NextResponse.json({ error: '仮想通貨の取得に失敗しました。' });
  }
}
