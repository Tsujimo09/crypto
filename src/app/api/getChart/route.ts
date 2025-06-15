import { auth } from '@/auth';
import { prisma } from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  try {
    const DBchart = await prisma.assetHistory.findMany({
      where: { userId: session?.user.id },
      select: { id: true, Asset: true, Historydate: true },
    });
    return NextResponse.json({ DBchart });
  } catch {
    return NextResponse.json({ error: 'Chartの取得に失敗しました。' });
  }
}
