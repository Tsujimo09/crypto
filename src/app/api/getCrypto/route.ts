import axios from 'axios';
import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';
import { URL } from '@/Utility/URL';
import { NextResponse } from 'next/server';

export async function GET() {
  //ユーザーの総投資額を取得
  const session = await auth();
  const totalAmt: number = Number(session?.user.totalAmount) ?? 0;
  const jpyAmt: number = Number(session?.user.jpyAmount) ?? 0;

  try {
    // ビットバンクAPIから通貨の情報を取得
    const response = await axios.get<Pairlist>(`${URL.BITBANK.PUBLIC}/tickers`);
    const data = response.data.data;

    // jpy建の通貨名と現在価格のみを取得する
    const cryptoList = data
      .filter((item) => item.pair.endsWith('_jpy'))
      .map((item) => ({
        pair: item.pair,
        last: Number(item.last),
      }));

    // DBよりコイン保有枚数を取得
    const DBcoinAssets = await prisma.cryptoAssets.findMany({
      where: { userId: session?.user.id },
      distinct: ['coinName'],
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        coinName: true,
        coinAmount: true,
      },
    });

    // APIとDBの内容を突合させリストを取得
    const cryptoInfo: CryptoData[] = DBcoinAssets.map((asset) => {
      const Info = cryptoList.find((crypto) => crypto.pair.split('_')[0] === asset.coinName);
      return {
        coinName: asset.coinName,
        coinAmount: Number(asset.coinAmount),
        lastPrice: Info ? Info.last : 0,
        CryptoJpy: Math.round(Number(asset.coinAmount) * (Info ? Info.last : 0)),
      };
    });

    // ユーザーの保有する通貨の合計金額を取得
    const totalCrypto = cryptoInfo.reduce((sum, { CryptoJpy }) => sum + CryptoJpy, 0);

    // 利益の計算
    const profit = totalCrypto + jpyAmt - totalAmt;

    // 整形したデータ
    const amount: AmountData[] = [
      { label: '💰 投資金額', value: totalAmt },
      { label: '💵 総資産', value: totalCrypto + jpyAmt },
      { label: '📈 利益', value: profit, color: profit >= 0 ? 'text-green-500' : 'text-red-500' },
    ];

    return NextResponse.json({ cryptoInfo, amount, jpyAmt });
  } catch {
    return NextResponse.json({ error: '仮想通貨の取得に失敗しました。' });
  }
}
