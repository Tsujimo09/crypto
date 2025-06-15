import axios from 'axios';
import { URL } from '@/Utility/URL';
import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';
import { Decimal } from '@prisma/client/runtime/library';

export async function POST(req: Request) {
  //簡易認証（x-api-key 方式）
  const secret = req.headers.get('x-api-key');
  if (secret !== process.env.CRON_SECRET_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    //ユーザー一覧を取得
    const users = await prisma.user.findMany({
      where: { hisFlg: true },
      select: {
        id: true,
        jpyAmount: true,
      },
    });

    if (users) {
      // ビットバンクの価格情報を取得
      const response = await axios.get<Pairlist>(`${URL.BITBANK.PUBLIC}/tickers`);
      const data = response.data.data;
      const cryptoList = data
        .filter((item) => item.pair.endsWith('_jpy'))
        .map((item) => ({
          pair: item.pair,
          last: Number(item.last),
        }));

      //各ユーザーの資産を計算して保存
      for (const user of users) {
        const userId = user.id;
        const jpyAmt = Number(user.jpyAmount) ?? 0;

        const DBcoinAssets = await prisma.cryptoAssets.findMany({
          distinct: ['coinName'],
          orderBy: {
            updatedAt: 'desc',
          },
          where: { userId },
          select: {
            coinName: true,
            coinAmount: true,
          },
        });

        const cryptoInfo = DBcoinAssets.map((asset) => {
          const info = cryptoList.find((crypto) => crypto.pair.split('_')[0] === asset.coinName);
          const last = info ? info.last : 0;
          return {
            coinName: asset.coinName,
            coinAmount: Number(asset.coinAmount),
            lastPrice: last,
            CryptoJpy: Math.round(Number(asset.coinAmount) * last),
          };
        });

        const totalCrypto = cryptoInfo.reduce((sum, { CryptoJpy }) => sum + CryptoJpy, 0);
        const total = totalCrypto + jpyAmt;

        await prisma.assetHistory.create({
          data: {
            userId,
            Asset: new Decimal(total),
          },
        });
      }
    }

    return NextResponse.json({ status: 'OK' });
  } catch (err) {
    console.error('Error in asset recording:', err);
    return NextResponse.json({ error: '処理中にエラーが発生しました。' }, { status: 500 });
  }
}
