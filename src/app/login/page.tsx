import { auth } from '@/auth';
import { URL } from '@/Utility/URL';
import { redirect } from 'next/navigation';
import { SessionButton } from '@/components/SessionButton';
import { TypingText } from '@/components/TypingText';

export default async function Login() {
  const session = await auth();

  // メインページへ
  if (session) {
    redirect(URL.MAIN);
  }
  //ログインしていない場合
  else {
    return (
      <div className="flex min-h-screen items-center justify-center backdrop-blur-lg">
        <div className="glass-card relative flex min-h-96 w-96 flex-col justify-center rounded-lg border bg-slate-400 p-8 shadow-2xl backdrop-blur-2xl transition-all before:pointer-events-none before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-lg before:bg-gradient-to-br before:from-white/20 before:to-transparent hover:shadow-white/80 dark:border-white/30 dark:bg-white/10">
          <TypingText text="LOGIN" className="h-[72px] text-center text-2xl font-bold text-white" />
          <div className="space-y-4">
            <SessionButton mode={'github'} />
            <SessionButton mode={'google'} />
            <SessionButton mode={'guest'} />
            <SessionButton mode={'Home'} />
          </div>
        </div>
      </div>
    );
  }
}
