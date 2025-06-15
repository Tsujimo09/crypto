'use client';
import axios from 'axios';
import { URL } from '@/Utility/URL';
import { motion, AnimatePresence } from 'framer-motion';
import { crypto } from '@/Utility/CryptoList';
import { useEffect, useState } from 'react';

export function UpdateCrypto({ data }: { data: CryptoData[] }) {
  const [list, setList] = useState<CryptoList[]>([{ id: 1, coin: '', amount: '' }]);
  const [delCoin, setDelCoin] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<string>('');

  // 初期データ取得
  useEffect(() => {
    const updatedList: CryptoList[] = data.map((item: CryptoData, index: number) => ({
      id: index + 1,
      coin: item.coinName,
      amount: String(item.coinAmount),
    }));
    if (updatedList.length > 0) {
      setList(updatedList);
    }
  }, [data]);

  // リストを追加（デフォルト値は空）
  const addList = () => {
    setList((prevList) => [...prevList, { id: prevList.length + 1, coin: '', amount: '' }]);
  };

  // リストを削除
  const delList = async (id: number, coin: string) => {
    if (isDeleting) return; // 二重クリック防止
    setIsDeleting(true);
    try {
      setList((prevList) => prevList.filter((item) => item.id !== id));
      if (coin) setDelCoin((prev) => [...prev, coin]);
    } finally {
      setTimeout(() => {
        setIsDeleting(false);
      }, 300);
    }
  };

  // コインの重複をチェック
  const hasDuplicateCoins = (list: CryptoList[]) => {
    const coins = list.map((item) => item.coin).filter(Boolean);
    return new Set(coins).size !== coins.length;
  };

  // 入力のバリデーション
  const isListValid = (list: CryptoList[]) => {
    return (
      list.every((item) => item.coin.trim() && item.amount.trim() && !isNaN(Number(item.amount))) &&
      !hasDuplicateCoins(list)
    );
  };

  // 値の更新（重複チェック含む）
  const handleChange = (id: number, field: keyof CryptoList, value: string) => {
    if (field === 'coin') {
      const exists = list.some((item) => item.coin === value && item.id !== id);
      if (exists) {
        setMessage('同じ通貨は選べません');
        setTimeout(() => setMessage(''), 2000);
        return;
      }
    }

    setList((prevList) => prevList.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  // 送信処理
  const handleSubmit = async () => {
    try {
      if (isListValid(list)) {
        const response = await axios.post(URL.AIP.INS_CRYPTO, { list });
        setMessage(response.status === 200 ? 'OK' : 'NG');
        setTimeout(() => setMessage(''), 2000);
      }

      if (delCoin.length > 0) {
        const response = await axios.post(URL.AIP.DEL_CRYPTO, { delCoin });
        setMessage(response.status === 200 ? 'OK' : 'NG');
        setTimeout(() => setMessage(''), 2000);
        setDelCoin([]);
      }
    } catch (err) {
      console.error('送信エラー:', err);
      setMessage('NG');
    }
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="ml-4 font-mono text-lg md:hidden">保有通貨登録</div>
      {/* 左カラム：通貨リスト */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full md:w-2/3"
      >
        <AnimatePresence>
          {list.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="mb-4 flex flex-col rounded-lg border border-gray-500 p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <select
                className={`glassListGreen flex w-32 rounded border p-2 text-sm`}
                value={item.coin}
                onChange={(e) => handleChange(item.id, 'coin', e.target.value)}
              >
                <option value="" disabled>
                  コインを選択
                </option>
                {crypto.map((coinName) => {
                  const isSelected = list.some((l) => l.coin === coinName && l.id !== item.id);
                  return (
                    <option key={coinName} value={coinName} disabled={isSelected} className="dark:bg-black">
                      {coinName}
                    </option>
                  );
                })}
              </select>

              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="数量"
                  value={item.amount}
                  id={item.coin}
                  className={`glassInput w-48 md:flex-1`}
                  onChange={(e) => handleChange(item.id, 'amount', e.target.value)}
                />
                <label htmlFor={item.coin} className="mt-4">
                  枚
                </label>

                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => delList(item.id, item.coin)}
                  className={'glassButton w-18 h-10 bg-red-400/40'}
                >
                  削除
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </form>

      {/* 右カラム：ボタンとメッセージ */}
      <div className="sticky top-4 flex w-full flex-col items-center justify-start space-y-4 p-4 sm:items-end md:w-1/3">
        <div className="sticky top-4 flex w-1/2 flex-col gap-4 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={addList}
            className={`glassButton w-full sm:w-auto ${
              isListValid(list)
                ? 'bg-blue-400/20 hover:bg-blue-400/40'
                : 'cursor-not-allowed bg-gray-500/40 hover:bg-gray-500/60'
            }`}
            disabled={!isListValid(list)}
          >
            追加
          </button>
          <button type="submit" onClick={handleSubmit} className="glassButton w-full sm:w-auto">
            登録
          </button>
        </div>

        {message === 'OK' && (
          <div className="sticky top-16 w-full rounded p-4 text-center text-green-700 sm:text-right">
            登録完了しました。
          </div>
        )}
        {message === 'NG' && (
          <div className="sticky top-16 w-full rounded p-4 text-center text-red-700 sm:text-right">
            登録失敗しました。
          </div>
        )}
        {message && message !== 'OK' && message !== 'NG' && (
          <div className="sticky top-16 w-full rounded p-4 text-center text-yellow-600 sm:text-right">{message}</div>
        )}
      </div>
    </div>
  );
}
