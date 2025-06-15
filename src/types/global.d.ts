declare global {
  type UserData = {
    totalAmt: number;
  };

  type CryptoData = {
    coinName: string;
    coinAmount: number;
    lastPrice: number;
    CryptoJpy: number;
  };

  type AmountData = {
    label: string;
    value: number;
    color?: string;
  };

  type CryptoList = { id: number; coin: string; amount: string };

  type ChartItem = {
    id: string;
    Asset: number;
    Historydate: string;
  };

  type ButtonMode = 'github' | 'google' | 'guest' | 'signIn' | 'signOut' | 'Home';

  type Tab = 'main' | 'overview' | 'crypto' | 'chart' | 'setting' | 'amount' | 'holdings' | 'history';

  type Pair = {
    pair: string;
    last: number;
  };

  interface Pairlist {
    success: number;
    data: {
      pair: string;
      sell: number;
      buy: number;
      open: number;
      high: number;
      low: number;
      last: number;
      vol: number;
      timestamp: number;
    }[];
  }
}

export {};
