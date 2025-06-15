import { URL } from '@/Utility/URL';
import Link from 'next/link';
import { MdHome, MdSettings, MdHistory, MdAccountBalance, MdCurrencyExchange } from 'react-icons/md';
import { BiChart } from 'react-icons/bi';
import { FaBitcoin } from 'react-icons/fa';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="grid grid-cols-1 gap-6">
        {/* ボタンセクション */}
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
          <Link
            href={URL.LOGIN}
            className="group relative m-5 flex h-16 w-64 items-center justify-center overflow-hidden rounded-xl border border-gray-900 bg-white text-lg font-bold text-gray-900 shadow-lg backdrop-blur-md transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-900 before:via-blue-900 before:to-gray-900 before:opacity-0 hover:scale-105 hover:bg-gray-100 hover:shadow-xl dark:border-blue-200/30 dark:bg-gradient-to-r dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 dark:text-white dark:before:opacity-0 dark:hover:before:animate-gradient-x dark:hover:before:opacity-100 md:m-10"
          >
            <span className="relative z-10">{session ? 'メインページへ' : 'サインイン'}</span>
          </Link>
          <Link
            href={URL.PRICE}
            className="group relative m-5 flex h-16 w-64 items-center justify-center overflow-hidden rounded-xl border border-gray-900 bg-white text-lg font-bold text-gray-900 shadow-lg backdrop-blur-md transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-900 before:via-blue-900 before:to-gray-900 before:opacity-0 hover:scale-105 hover:bg-gray-100 hover:shadow-xl dark:border-blue-200/30 dark:bg-gradient-to-r dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 dark:text-white dark:before:opacity-0 dark:hover:before:animate-gradient-x dark:hover:before:opacity-100 md:m-10"
          >
            <span className="relative z-10">現在価格一覧</span>
          </Link>
        </div>

        {/* 概要セクション */}
        <div className="rounded-xl bg-gray-100 p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">概要</h2>
          <p className="text-gray-700 dark:text-gray-300">
            暗号資産の資産管理アプリです。
            <br />
            自分の資産と投資金額から、現在の損益が分かるシステムを作成しました。
            <br />
            auth.js v5を使用して認証機能を実装したため、ユーザーごとに資産の管理ができます。
            <br />
            （ゲストログインも作成しているのでデモで確認もできます。）
            <br />
            ライトモードとダークモードにも対応しており、お好みに合わせてthemeを変えることもできます。
            <br />
            （ダークモードがお気に入りです）
            <br />
            現在の価格一覧はログインなしで参照可能です。
          </p>
        </div>

        {/* 使用環境セクション */}
        <div className="rounded-xl bg-gray-100 p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">使用環境</h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>next.js15</li>
            <li>tailwind css</li>
            <li>auth.js v5</li>
            <li>prisma(postgreSQL)</li>
            <li>amchats5</li>
            <li>framer motion</li>
            <li>bittbankAPI</li>
            <li>github actions</li>
          </ul>
        </div>

        {/* 機能説明セクション */}
        <div className="rounded-xl bg-gray-100 p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">機能説明</h2>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">認証機能</h3>
              <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                <li>GitHub・Google・ゲスト</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">損益確認画面</h3>
                <MdHome className="mb-2 text-4xl" />
              </div>
              <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                <li>投資額の登録と管理</li>
                <li>保有コインの枚数管理</li>
                <li>現在価格の自動取得（bitbankAPI連携）</li>
                <li>損益計算機能</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">保有資産確認画面</h3>
                <FaBitcoin className="mb-2 text-4xl" />
              </div>
              <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                <li>資産推移のグラフ表示</li>
                <li>履歴データの管理</li>
                <li>チャート履歴の確認・削除機能</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">チャート機能</h3>
                <BiChart className="mb-2 text-4xl" />
              </div>
              <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
                <li>資産推移のグラフ表示</li>
                <li>履歴データの管理</li>
                <li>チャート履歴の確認・削除機能</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">設定機能</h3>
                <MdSettings className="mb-2 text-4xl" />
              </div>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <MdAccountBalance className="text-2xl" />
                  投資金額の登録
                </li>

                <li className="flex items-center gap-2">
                  <MdCurrencyExchange className="text-2xl" />
                  保有通貨の登録
                </li>
                <li className="flex items-center gap-2">
                  <MdHistory className="text-2xl" />
                  資産履歴(チャート履歴)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 今後の機能追加セクション */}
        <div className="rounded-xl bg-gray-100 p-6 shadow-lg dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">今後の追加したい機能</h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              ビットバンクのAPIキーを登録することで、自分の資産を設定画面で登録しなくても表示できるようにする。
              <br />
              シークレットキーが絡むのでセキュリティ面で今回は不採用
            </li>
            <li>AIに情報を取得させ、投資のアドバイスをしてくれるようなシステムの導入</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
