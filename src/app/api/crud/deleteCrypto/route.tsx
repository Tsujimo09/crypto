import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    // クライアントから送られたデータを取得
    const { delCoin } = await req.json();

    // データのチェック
    if (!userId || !delCoin || !Array.isArray(delCoin)) {
      return NextResponse.json({
        error: 'データの取得に失敗しました。',
        status: 400,
      });
    }

    // データベースに新しいレコードを一度に作成
    const delteCrypto = await prisma.cryptoAssets.deleteMany({
      where: {
        AND: [{ userId: session?.user.id }, { coinName: { in: delCoin } }],
      },
    });

    return NextResponse.json({ user: delteCrypto, status: 200 });
  } catch {
    return NextResponse.json({ error: 'サーバーエラー', status: 500 });
  }
}
