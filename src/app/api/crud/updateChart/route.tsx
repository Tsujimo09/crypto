import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';
import { Decimal } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    //  クライアント側から登録するデータを受け取る
    const { updChart } = await req.json();

    // データチェック
    if (!updChart || !userId) {
      return NextResponse.json({
        error: 'データの取得に失敗しました。',
        status: 400,
      });
    }

    // DBに登録
    await prisma.assetHistory.create({
      data: {
        userId: userId,
        Asset: new Decimal(updChart),
      },
    });

    return NextResponse.json({ user: updChart, status: 200 });
  } catch {
    return NextResponse.json({ error: 'エラー', status: 500 });
  }
}
