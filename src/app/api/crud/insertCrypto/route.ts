import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    // クライアントから送られたデータを取得
    const { list } = await req.json();

    // データのチェック
    if (!userId || !list || !Array.isArray(list)) {
      return NextResponse.json({
        error: 'データの取得に失敗しました。',
        status: 400,
      });
    }

    // データベースに新しいレコードを一度に作成
    const createCrypto = await prisma.cryptoAssets.createMany({
      data: list.map((item: { coin: string; amount: number }) => ({
        userId: userId,
        coinName: item.coin,
        coinAmount: item.amount,
      })),
      skipDuplicates: true, // 重複をスキップ
    });

    return NextResponse.json({ user: createCrypto, status: 200 });
  } catch {
    return NextResponse.json({ error: 'サーバーエラー', status: 500 });
  }
}
