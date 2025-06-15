'use client';
import axios from 'axios';
import { URL } from '@/Utility/URL';
import { useState, useEffect } from 'react';
import { Loading } from '@/components/Loading';
import { UpdateUser } from '@/components/main/UpdateUser';
import { UpdateCrypto } from '@/components/main/UpdateCrypto';
import { UpdateHistory } from '@/components/main/UpdateHistory';
import { ReceiveCrypto } from '@/components/main/ReceiveCrypto';
import { ReceiveOverView } from '@/components/main/ReceiveOverView';
import { ReceiveChart } from '@/components/main/ReceiveChart';
import { Icon } from '@/Utility/Icon';

export default function Main() {
  const mainTabs: Tab[] = ['overview', 'crypto', 'chart', 'setting'];
  const settingTabs: Tab[] = ['amount', 'holdings', 'history', 'main'];
  const [selTab, setSelTab] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [amountData, setAmountData] = useState<AmountData[]>([]);
  const [jpyData, setJpyData] = useState<number>(0);
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const cryptoResponse = await axios.get(URL.AIP.GET_CRYPTO);
      const { cryptoInfo, amount, jpyAmt } = cryptoResponse.data;
      const chartResponse = await axios.get(URL.AIP.GET_CHART);
      const chartData = chartResponse.data.DBchart;

      setCryptoData(cryptoInfo);
      setAmountData(amount);
      setJpyData(jpyAmt);
      setChartData(chartData);
      setLoading(false);
    } catch (error) {
      console.error('APIの取得に失敗しました。:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'setting') {
      setSelTab(false);
      setActiveTab('amount');
    } else if (activeTab === 'main') {
      setSelTab(true);
      setActiveTab('overview');
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  return (
    <div className="flex items-start justify-center py-12">
      <div
        className={`w-full max-w-4xl rounded-3xl p-6 shadow-lg dark:to-40% dark:shadow-white ${selTab ? 'bg-gradient-to-br from-blue-500/70 to-90%' : 'bg-gradient-to-br from-teal-400/30 to-90%'}`}
      >
        {/* タブヘッダー */}
        <div className="mb-4 flex justify-normal border-b-2 border-gray-400 text-xl dark:border-white">
          {(selTab ? mainTabs : settingTabs).map((tab) => (
            <button
              key={tab}
              className={`flex items-center gap-2 px-4 py-2 text-3xl font-bold hover:text-gray-700 dark:hover:text-teal-300 ${
                activeTab === tab ? 'border-b-4 border-blue-700 text-black dark:text-white' : 'text-gray-500'
              } ${tab === (selTab ? 'setting' : 'main') ? 'ml-auto' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className="block">{Icon(tab)}</span>
              <span className="hidden md:block">{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="min-h-[300px]">
            {activeTab === 'overview' && <ReceiveOverView data={amountData} />}
            {activeTab === 'crypto' && <ReceiveCrypto data={cryptoData} />}
            {activeTab === 'chart' && <ReceiveChart data={chartData} />}
            {activeTab === 'amount' && <UpdateUser data={amountData} jpy={jpyData} />}
            {activeTab === 'holdings' && <UpdateCrypto data={cryptoData} />}
            {activeTab === 'history' && <UpdateHistory data={chartData} />}
          </div>
        )}
      </div>
    </div>
  );
}
