import { auth } from '@/auth';
import { SessionButton } from './SessionButton';
import { ThemeButton } from './ThemeButton';
import Image from 'next/image';

export async function Headeer() {
  const session = await auth();
  return (
    <div className="flex w-full items-center justify-between p-5 max-md:justify-evenly">
      <h1 className="text-2xl max-sm:hidden">資産管理アプリ</h1>
      <div className="flex items-center gap-5">
        {session?.user.image ? (
          <Image src={session.user.image} width={36} height={36} className="rounded-lg" alt="image" />
        ) : (
          ''
        )}
        {session ? <SessionButton mode="signOut" /> : ''}
        <SessionButton mode="Home" />
        <ThemeButton />
      </div>
    </div>
  );
}
