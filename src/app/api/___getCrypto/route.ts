// import { auth } from '@/auth';
// import { URL } from '@/Utility/URL';
// import { NextResponse } from 'next/server';
// import axios from 'axios';
// import crypto from 'crypto';
// import { prisma } from '@/prisma/prisma';

// // 仮想通貨の保有量を取得するAPIにしたい

// //ビットバンクAPIをenvから取得
// const API_URL = URL.BITBANK.API;
// const API_KEY = process.env.BITBANK_API_KEY || '';
// const API_SECRET = process.env.BITBANK_API_SECRET || '';

// //通貨の保有量を取得 ヘッダーをつけてAPI認証
// export async function GET() {
//   const session = await auth();

//   try {
//     //🌟🌟🌟bitbankから取得（管理者のみ）🌟🌟🌟
//     if (session?.user.id === process.env.ADMIN_ID) {
//       const path = '/v1/user/assets';
//       const nonce = Date.now().toString();
//       const message = nonce + path;
//       const signature = crypto
//         .createHmac('sha256', API_SECRET)
//         .update(message)
//         .digest('hex');

//       const response = await axios.get(`${API_URL}${path}`, {
//         headers: {
//           'ACCESS-KEY': API_KEY,
//           'ACCESS-NONCE': nonce,
//           'ACCESS-SIGNATURE': signature,
//         },
//       });

//       const assets = response.data?.data?.assets;
//       const coinAssets = assets?.filter(
//         (asset: { onhand_amount: number }) => asset.onhand_amount > 0
//       );
//       coinAssets?.forEach((asset: any) => {
//         console.log(`Asset: ${asset.asset}, Amount: ${asset.onhand_amount}`);
//       });

//       //管理者はbitbankからコイン枚数と日本円を取得
//       return NextResponse.json({ coinAssets });
//     } else {
//       //管理者以外はDBから各コインの最新データを取得する
//       const DBcoinAssets = await prisma.cryptoAssets.findMany({
//         distinct: ['coinName'],
//         orderBy: {
//           updatedAt: 'desc',
//         },
//       });
//       return NextResponse.json({ DBcoinAssets });
//     }
//   } catch {
//     return NextResponse.json({
//       error: 'API取得に失敗しました。',
//     });
//   }
// }
