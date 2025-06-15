'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatter } from '@/Utility/NumFormat';
import axios from 'axios';
import { URL } from '@/Utility/URL';

export function UpdateHistory({ data }: { data: ChartItem[] }) {
  const [list, setList] = useState<ChartItem[]>(data);

  const handleAllDel = async () => {
    try {
      if (window.confirm('履歴をすべて削除します。')) {
        await axios.post(URL.AIP.DEL_CHART, { data: list });
        setList([]);
      }
    } catch {
      console.error('削除中にエラーが発生しました:');
    }
  };

  return (
    <div>
      <div className="ml-4 font-mono text-lg md:hidden">資産額履歴</div>
      {data.length > 0 ? (
        <div className="flex">
          <div className="w-2/3">
            <AnimatePresence>
              {list.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="glassListGreen mb-4 flex items-center justify-center gap-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    {new Date(item.Historydate).toLocaleString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  <div>{formatter.format(item.Asset)}円</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex w-1/3 flex-col items-end justify-start space-y-4 p-4">
            <button
              onClick={handleAllDel}
              className="glassButton ml-auto flex h-10 items-start justify-end bg-red-400/40"
            >
              削除
            </button>
          </div>
        </div>
      ) : (
        <div>履歴がありません</div>
      )}
    </div>
  );
}
