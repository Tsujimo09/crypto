'use client';
import axios from 'axios';
import { URL } from '@/Utility/URL';
import { useState } from 'react';

export function UpdateUser({ data, jpy }: { data: AmountData[]; jpy: number }) {
  const [message, setMessage] = useState<string>('');
  const [amtVal, setAmtVal] = useState<number | null>(data[0].value);
  const [jpyVal, setJpyVal] = useState<number | null>(jpy);
  const [flgCheck, setFlgCheck] = useState<boolean>(false);

  const handleUpdate = async () => {
    if (amtVal === null || jpyVal === null || isNaN(amtVal) || isNaN(jpyVal)) {
      setMessage('NG');
      return;
    }

    try {
      const UserRes = await axios.post(URL.AIP.UPD_USER, { amtVal, jpyVal, flgCheck });

      if (UserRes.data.status === 200) {
        setMessage('OK');
      } else {
        setMessage('NG');
      }

      setTimeout(() => setMessage(''), 2000);
    } catch (err) {
      console.error('更新に失敗しました。', err);
      setMessage('NG');
    }
  };

  return (
    <div className="flex flex-col justify-between md:flex-row">
      <div className="ml-4 font-mono text-lg md:hidden">ユーザー情報登録</div>

      {/* 左側フォーム */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        className="w-full space-y-4 p-4 md:w-2/3"
      >
        <label htmlFor="upAmt" className="block font-semibold">
          投資金額を入力してください
        </label>
        <input
          type="number"
          placeholder="数量"
          id="upAmt"
          value={amtVal === null ? '' : amtVal}
          onChange={({ target: { value } }) => setAmtVal(value === '' ? null : Number(value))}
          className="glassInput"
        />

        <label htmlFor="upJpy" className="block font-semibold">
          日本円を入力してください
        </label>
        <input
          type="number"
          placeholder="数量"
          id="upJpy"
          value={jpyVal === null ? '' : jpyVal}
          onChange={({ target: { value } }) => setJpyVal(value === '' ? null : Number(value))}
          className="glassInput"
        />

        <label htmlFor="saveAmt" className="block pt-5 text-sm font-semibold">
          資産の履歴を記録する（毎日０時に資産額を記録します。）
        </label>
        <input
          type="checkbox"
          id="saveAmt"
          checked={flgCheck}
          className="mr-5"
          onChange={({ target: { checked } }) => setFlgCheck(checked)}
        />
      </form>

      {/* 右側：登録ボタンとメッセージ */}
      <div className="flex w-full flex-col items-center justify-start space-y-4 p-4 md:w-1/3 md:items-end">
        <button type="button" className="glassButton w-1/2 md:w-auto" onClick={handleUpdate}>
          登録
        </button>

        {message === 'OK' && (
          <div className="w-full rounded p-4 text-center text-green-700 md:text-right">登録完了しました。</div>
        )}
        {message === 'NG' && (
          <div className="w-full rounded p-4 text-center text-red-700 md:text-right">登録失敗しました。</div>
        )}
      </div>
    </div>
  );
}
