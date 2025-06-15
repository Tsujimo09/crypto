'use client';
import { motion } from 'framer-motion';
import { formatter } from '@/Utility/NumFormat';

export function ReceiveOverView({ data }: { data: AmountData[] }) {
  return (
    <div>
      {data[0].value > 0 ? (
        <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { staggerChildren: 0.2 } }}>
          {data.map((item, index) => (
            <motion.li
              key={index}
              className={`glassListBlue mx-8 p-5 ${item.color ?? ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-lg font-semibold">{item.label}:</p>
              <p className="text-xl font-bold">{`¥${formatter.format(item.value)}`}</p>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <div>データがありません</div>
      )}
    </div>
  );
}
