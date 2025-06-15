'use client';
import { Line } from 'react-chartjs-2';
import { useTheme } from 'next-themes';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export function ReceiveChart({ data }: { data: ChartItem[] }) {
  // テーマの状態を取得
  const { theme } = useTheme();
  const labelColor = theme === 'dark' ? '#fff' : '#333';

  const dataForChart = {
    labels: data.map((item) =>
      new Date(item.Historydate).toLocaleDateString('ja-JP', {
        month: '2-digit',
        day: '2-digit',
      })
    ),
    datasets: [
      {
        label: '資産額',
        data: data.map((item) => item.Asset),
        borderColor: 'rgba(54, 162, 235, 1)', // 線の色
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // オプション
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: { display: true, text: '資産推移' },
    },
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: { color: 'rgba(54, 162, 235, 0.5)' },
      },
      y: {
        ticks: { color: labelColor },
        grid: { color: 'rgba(54, 162, 235, 0.5)' },
      },
    },
  };

  return (
    <div>
      {data.length > 0 ? (
        <Line data={dataForChart} options={options} style={{ height: '350px' }} />
      ) : (
        <div>データがありません</div>
      )}
    </div>
  );
}
