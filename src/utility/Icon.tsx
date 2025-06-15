import { BiChart } from 'react-icons/bi';
import { FaBitcoin } from 'react-icons/fa';
import { FaGithub, FaGoogle, FaUser } from 'react-icons/fa';
import { MdHome, MdSettings, MdHistory, MdAccountBalance, MdCurrencyExchange } from 'react-icons/md';

export const Icon = (icon: string) => {
  switch (icon) {
    case 'overview':
      return <MdHome className="text-4xl" />;
    case 'crypto':
      return <FaBitcoin className="text-4xl" />;
    case 'chart':
      return <BiChart className="text-4xl" />;
    case 'setting':
      return <MdSettings className="text-4xl" />;
    case 'amount':
      return <MdAccountBalance className="text-4xl" />;
    case 'holdings':
      return <MdCurrencyExchange className="text-4xl" />;
    case 'history':
      return <MdHistory className="text-4xl" />;
    case 'main':
      return <MdHome className="text-4xl" />;
    case 'github':
      return <FaGithub className="mr-2" />;
    case 'google':
      return <FaGoogle className="mr-2" />;
    case 'guest':
      return <FaUser className="mr-2" />;
    default:
      return null;
  }
};
