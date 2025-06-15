import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma';
import { auth } from '@/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user.id;

    // クライアントから送られたデータを取得
    const { data } = await req.json();

    // データのチェック
    if (!userId || !data || !Array.isArray(data)) {
      return NextResponse.json({
        error: 'データの取得に失敗しました。',
        status: 400,
      });
    }

    // idの配列を作成
    const ids = data.map((item) => item.id);

    // データベースから指定されたidのレコードを削除
    const deleteResult = await prisma.assetHistory.deleteMany({
      where: {
        AND: [{ userId: userId }, { id: { in: ids } }],
      },
    });

    return NextResponse.json({ result: deleteResult, status: 200 });
  } catch {
    return NextResponse.json({ error: 'サーバーエラー', status: 500 });
  }
}
