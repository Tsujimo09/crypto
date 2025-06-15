'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatter } from '@/Utility/NumFormat';

export function ReceiveCrypto({ data }: { data: CryptoData[] }) {
  return (
    <div className="space-y-4">
      {data.length > 0 ? (
        data.map((item, index) => (
          <motion.div
            key={index}
            className="rounded-lg border p-4 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex">
              <Image src={`/crypto/${item.coinName}.svg`} alt="crypto" width={32} height={32} />
              <h3 className="ml-5 flex items-center justify-center text-lg font-semibold">{item.coinName}</h3>
              <div className="ml-8 flex flex-col">
                <p>現在価格 : ¥{formatter.format(item.lastPrice)}</p>
                <p>コイン保有量 : {formatter.format(item.coinAmount)}</p>
                <p>日本円換算額 : ¥{formatter.format(item.CryptoJpy)}</p>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="">現在登録されていません。</div>
      )}
    </div>
  );
}
