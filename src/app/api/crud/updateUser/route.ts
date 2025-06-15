import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    //  クライアント側から登録するデータを受け取る
    const { amtVal, jpyVal, flgCheck } = await req.json();

    if (
      amtVal === undefined ||
      amtVal === null ||
      jpyVal === undefined ||
      jpyVal === null ||
      flgCheck === undefined ||
      flgCheck === null
    ) {
      return NextResponse.json({
        error: 'データの取得に失敗しました。',
        status: 400,
      });
    }

    // DBに登録(セッションのIDを検索して受け取ったデータで登録)
    const updUser = await prisma.user.update({
      where: { id: session?.user.id },
      data: {
        totalAmount: amtVal,
        jpyAmount: jpyVal,
        hisFlg: flgCheck,
      },
    });

    return NextResponse.json({ user: updUser, status: 200 });
  } catch {
    return NextResponse.json({ error: 'エラー', status: 500 });
  }
}
